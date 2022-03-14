
import icons from '/src/assets/images/icons.svg';
import { createElementFromHTML } from '@scripts/helpers';

export function listItemTmpl (item) {
  return createElementFromHTML(`
    <li class="component-gallery__item global__grid-item global__grid-item--small-12 global__grid-item--medium-6 global__grid-item--large-3">
      <figure class="component-gallery__figure">
        <button type="button" class="component-gallery__figure-enlarge" title="Enlarge Photo">
          <svg><use xlink:href="${icons}#icon-plus"></use></svg>
          <span>Enlarge Photo</span>
        </button>
        <figcaption class="component-gallery__figcaption global__font-caption">
          <div class="component-gallery__figcaption-inner">
            ${item.title}
          </div>
        </figcaption>
      </figure>
      <div class="component-gallery__item-options">
        <a href="${item.url.profile}" target="_blank" rel="noopener" title="View Profile" class="component-gallery__item-options-icon">
          <svg><use xlink:href="${icons}#icon-person"></use></svg>
          <span>View Profile</span>
        </a>
        <a href="${item.url.photo}" target="_blank" rel="noopener" title="View Photo at Flickr" class="component-gallery__item-options-icon">
          <svg><use xlink:href="${icons}#icon-photo"></use></svg>
          <span>View Photo at Flickr</span>
        </a>
        <button type="button" title="Save Photo" class="component-gallery__item-options-save ${item.isSaved ? 'component-gallery__item-options-save--saved' : ''} component-gallery__item-options-icon">
          <svg><use xlink:href="${icons}#icon-star"></use></svg>
          <svg><use xlink:href="${icons}#icon-star-filled"></use></svg>
          <span>Save Photo</span>
        </button>
      </div>
    </li>
  `);
}

export function itemErrorTmpl () {
  return `
    <figure class="component-gallery__figure component-gallery__figure--error">
      <svg><use xlink:href="/src/assets/images/icons.svg#icon-close"></use></svg>
    </figure>
  `;
}

export function galleryTmpl() {
  return createElementFromHTML(`
    <ul class="component-gallery__list global__grid-container">
    </ul>
  `);
}

export function gallerySavedTmpl() {
  return createElementFromHTML(`
    <ul class="component-gallery__saved global__grid-container">
    </ul>
  `);
}

export function galleryHeaderTmpl(gallery) {
  return createElementFromHTML(`
    <div class="component-gallery__header">
      <label for="${gallery.id}__header-search" class="component-gallery__header-label">Search</label>
      <input type="search" id="${gallery.id}__header-search" class="component-gallery__header-search" placeholder="Search Photos" value="${gallery.query}" />
      <div class="component-gallery__header-amount"></div>
    </div>
  `);
}

export function paginationTmpl(text) {
  return createElementFromHTML(`
    <div class="component-gallery__pagination">
      <button type="button" class="global__button">${text}</button>
    </div>
  `);
}

export function loaderTmpl(text, className) {
  return createElementFromHTML(`
    <div class="component-gallery__loader ${className ? className : ''}">
      <div class="component-gallery__loader-spinner"></div>
      ${text}
    </div>
  `);
}

export function galleryErrorTmpl(title, text) {
  return createElementFromHTML(`
    <div class="component-gallery__error global__grid-container">
      <div class="global__grid-item global__grid-item--small-12">
        <h2 class="global__h2">${title}</h2>
        <p>${text}</p>
      </div>
    </div>
  `);
}
