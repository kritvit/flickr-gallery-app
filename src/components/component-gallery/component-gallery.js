
import Component from '@scripts/Component';
import { searchPhotos } from '@scripts/api';
import { setCache, getCache, deleteCache } from '@scripts/cache';
import global from '@scripts/global';
import { helper } from '@scripts/helpers';
import { publish, subscribe } from '@scripts/pubsub';
import './component-gallery.scss';
import {
  galleryTmpl,
  gallerySavedTmpl,
  galleryHeaderTmpl,
  galleryErrorTmpl,
  listItemTmpl,
  paginationTmpl,
  loaderTmpl,
  itemErrorTmpl
} from './component-gallery.template';

export default Component('component-gallery', {

  // Component state
  state: {
    gallery: {}
  },

  onLoad() {

    // this.selector = '.component-gallery'
    const galleries = document.querySelectorAll(this.selector);

    if (galleries) {

      galleries.forEach((domNode, index) => {

        // If gallery DOM node already have id
        let id = domNode.id;

        if (!id) {

          // Create new id and add it to DOM node. this.name = 'component-gallery'
          id = `${this.name}-${index}`;
          domNode.id = id;

        }

        const query = domNode.getAttribute('data-query');

        if (helper.isNotEmptyString(query)) {

          // Create state for current gallery
          this.state.gallery[id] = { id, domNode, query, savedItems: [] };

          // Initialize current gallery
          this.initGallery(this.state.gallery[id]);

        }

      });

      // Set state in gallery if cache should be used or not.
      this.handleCacheAllowed();

      // Listener to cookie consent event
      subscribe('component-cookies.update', () => {

        this.handleCacheAllowed();

      });

    }
  },

  handleCacheAllowed () {

    Object.keys(this.state.gallery).forEach(key => {

      if (global.state.cookiesAcceptedFunctional) {

        this.state.gallery[key].domNode.classList.add('component-gallery--cache-allowed');

        // Save gallery to local storage
        setCache(`FGA__${this.state.gallery[key].id}`, this.state.gallery[key]);

      } else {

        this.state.gallery[key].domNode.classList.remove('component-gallery--cache-allowed');

        // Remove gallery from local storage
        deleteCache(`FGA__${this.state.gallery[key].id}`);

      }

    });

  },

  async search (query, gallery) {

    const list = gallery.domNode.querySelector('.component-gallery__list');
    const pagination = gallery.domNode.querySelector('.component-gallery__pagination');

    if (list) {

      list.remove();

    }

    if (pagination) {

      pagination.remove();

    }

    gallery.query = helper.checkIf('isNotEmptyString', query, gallery.domNode.getAttribute('data-query'));
    gallery.data = await searchPhotos(gallery.query);
    gallery.from = 'search';

    if (gallery.data) {

      setCache(`FGA__${gallery.id}`, gallery);

      this.displayGallery(gallery);

    }

  },

  async initGallery(gallery) {

    // Add gallery loader
    if (!document.querySelector('.component-gallery__loader')) {

      gallery.domNode.appendChild(loaderTmpl('Loading gallery..', 'component-gallery__loader--init'));

    }

    const cache = getCache(`FGA__${gallery.id}`);

    if (!gallery.data && cache && cache.data) {

      // Get data from cache
      gallery.data = cache.data;
      gallery.query = cache.query;
      gallery.from = 'cache';

    } else if (!gallery.data) {

      // Get data from API
      gallery.data = await searchPhotos(gallery.query);
      gallery.from = 'api';

    }

    if (gallery.data) {

      // Save data to cache
      setCache(`FGA__${gallery.id}`, gallery);

    }

    if (gallery.data && gallery.data.items) {

      this.displayGallery(gallery);

      // Add search feature
      const search = gallery.domNode.querySelector('.component-gallery__header-search');

      if (search) {

        search.addEventListener('keypress', event => {

          if (event.key === 'Enter') {

            this.search(event.currentTarget.value, gallery);

          }

        });

      }

    } else {

      // Something went wrong when fetching data. Display error.
      this.displayGalleryError(gallery);

    }

  },

  displayGalleryError(gallery) {

    const loader = gallery.domNode.querySelector('.component-gallery__loader');

    if (loader) {

      loader.remove();

    }

    if (!gallery.domNode.querySelector('.component-gallery__error')) {

      gallery.domNode.appendChild(galleryErrorTmpl());

    }

  },

  displayGallery(gallery, items = gallery.data.items) {

    if (!gallery.domNode.querySelector('.component-gallery__header')) {

      gallery.domNode.appendChild(galleryHeaderTmpl(gallery));

    }

    if (!gallery.domNode.querySelector('.component-gallery__list')) {

      gallery.domNode.appendChild(galleryTmpl());

    }

    const list = gallery.domNode.querySelector('.component-gallery__list');
    const search = gallery.domNode.querySelector('.component-gallery__header-search');

    if (search) {

      search.value = gallery.query;

    }

    // Add items to gallery
    items.forEach(item => {

      const listItem = listItemTmpl(item);
      const figure = listItem.querySelector('figure');

      // Add image to list item figure
      figure.appendChild(this.createLazyImage(item, listItem));

      // Add list item to DOM
      list.appendChild(listItem);

      // Add click to enlarge button
      const enlarge = listItem.querySelector('.component-gallery__figure-enlarge');

      if (enlarge) {

        enlarge.addEventListener('click', () => {

          // Send url to component-modal
          publish('component-modal.open', item);

        }, false);

      }

      // Add click to enlarge button
      const save = listItem.querySelector('.component-gallery__item-options-save');

      if (save) {

        save.addEventListener('click', event => {

          this.saveItem(event.currentTarget, item, gallery);

        }, false);

      }

    });

    // Update items / total in gallery header
    const amount = gallery.domNode.querySelector('.component-gallery__header-amount');

    if (amount) {

      amount.innerHTML = `${gallery.data.items.length}/${gallery.data.total}`;

    }

    // Remove gallery loader
    const loader = gallery.domNode.querySelector('.component-gallery__loader--init');

    if (loader) {

      loader.remove();

    }

    if (!gallery.domNode.querySelector('.component-gallery__pagination')) {

      this.pagination(gallery);

    }

    // Display list with saved items
    this.displaySaved(gallery);

  },

  displaySaved(gallery) {

    if (!gallery.domNode.querySelector('.component-gallery__saved')) {

      gallery.domNode.querySelector('.component-gallery__list').insertAdjacentElement('beforebegin', gallerySavedTmpl());

    }

    const list = gallery.domNode.querySelector('.component-gallery__saved');

    if (!gallery.savedItems.length) {

      list.remove();
      return false;

    }

    list.innerHTML = '';

    gallery.savedItems.forEach(item => {

      const listItem = listItemTmpl(item);
      const figure = listItem.querySelector('figure');

      // Add image to list item figure
      figure.appendChild(this.createLazyImage(item, listItem));

      // Add list item to DOM
      list.appendChild(listItem);

      // Add click to enlarge button
      const enlarge = listItem.querySelector('.component-gallery__figure-enlarge');

      if (enlarge) {

        enlarge.addEventListener('click', () => {

          // Send url to component-modal
          publish('component-modal.open', item);

        }, false);

      }

      // Add click to enlarge button
      const save = listItem.querySelector('.component-gallery__item-options-save');

      if (save) {

        save.addEventListener('click', event => {

          this.saveItem(event.currentTarget, item, gallery);

        }, false);

      }

    });

  },

  saveItem(domNode, item, gallery) {

    gallery.savedItems = gallery.savedItems || [];

    const saved = !!gallery.savedItems.filter(savedItem => savedItem.id === item.id).length;

    if (saved) {

      item.isSaved = false;
      gallery.savedItems = gallery.savedItems.filter(savedItem => savedItem.id !== item.id);
      domNode.classList.remove('component-gallery__item-options-save--saved');

      gallery.domNode.querySelectorAll('.component-gallery__list .component-gallery__item').forEach(target => {

        const image = target.querySelector('img');

        if (item.src.small === image.src) {

          target.querySelector('.component-gallery__item-options-save').classList.remove('component-gallery__item-options-save--saved');

        }

      });

    } else {

      item.isSaved = true;
      gallery.savedItems.push(item);
      domNode.classList.add('component-gallery__item-options-save--saved');

    }

    setCache(`FGA__${gallery.id}`, gallery);

    this.displaySaved(gallery);

  },

  createLazyImage(item, listItem) {

    const image = document.createElement('img');

    image.setAttribute('alt', '');

    const callback = (entries, observer) => {

      // Callback for when lazy image is in viewport

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          // Reference image
          const img = entry.target;

          // Set source to image
          img.setAttribute('src', item.src.small);

          // Hide loader, show image
          img.onload = () => {
            listItem.classList.add('component-gallery__item--loaded');
          };

          // Hide loader, show error template
          img.onerror = () => {
            listItem.classList.add('component-gallery__item--error');
            listItem.innerHTML = itemErrorTmpl();
          };

          // Stop observing lazy image.
          observer.disconnect();

        }

      });

    };

    // Observe lazy images and trigger callback when in viewport
    new IntersectionObserver(callback).observe(image);

    return image;

  },

  pagination (gallery) {

    if (gallery.data.page === gallery.data.pages) {

      return false;

    }

    // Append pagination template to gallery
    gallery.domNode.appendChild(paginationTmpl('Load More Photos'));

    const pagination = gallery.domNode.querySelector('.component-gallery__pagination');
    const cta = pagination.querySelector('button');

    let isOn = false;

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          if (!isOn) {

            // Stop auto pagination.
            observer.disconnect();

          } else if (gallery.data.page === gallery.data.pages) {

            // Pagination end.
            observer.disconnect();
            pagination.remove();

          } else {

            // Timeout to give user time to cancel auto pagination
            setTimeout(() => {

              this.paginate(gallery);

            }, 1666);

          }

        }
      });
    };

    cta.addEventListener('click', () => {

      if (pagination.classList.contains('component-gallery__pagination--auto-on')) {

        isOn = false;
        cta.innerHTML = 'Load More Photos';
        pagination.classList.remove('component-gallery__pagination--auto-on');
        pagination.querySelector('.component-gallery__loader').remove();

      } else {

        isOn = true;
        cta.innerHTML = 'Stop Auto Pagination';
        pagination.classList.add('component-gallery__pagination--auto-on');
        pagination.appendChild(loaderTmpl('Loading More Photos..'));
        new IntersectionObserver(callback).observe(pagination);

      }

    }, false);

  },

  async paginate(gallery) {

    if (gallery.isLoading) {
      return false;
    }

    gallery.isLoading = true;

    const page = gallery.data.page + 1;
    const data = await searchPhotos(gallery.query, page);

    if (data && data.items) {

      gallery.data.page = page;
      gallery.data.items = gallery.data.items.concat(data.items);

      setCache(`FGA__${gallery.id}`, gallery);

      this.displayGallery(gallery, data.items);

    } else {

      this.displayGalleryError(gallery);

    }

    gallery.isLoading = false;

  }

});
