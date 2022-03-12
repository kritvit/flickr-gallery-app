
import Component from '@scripts/Component';
import icons from '/src/assets/images/icons.svg';
import { subscribe } from '@scripts/pubsub';
import { createFocusTrap } from 'focus-trap';
import './component-modal.scss';

export default Component('component-modal', {
  onLoad() {

    // Listen to global "openn" event
    subscribe('component-modal.open', item => {

      // Open modal
      this.open(item);

    });

  },
  open(item) {

    // Add modal html to DOM
    document.body.insertAdjacentHTML('beforeend', this.template());

    // Add "open" classnames to body
    document.body.classList.add('component-modal--is-open');

    // Create and add image to modal
    this.createModalImage(item);

    // Create focus trap
    const focusTrap = createFocusTrap('.component-modal', {escapeDeactivates: false});

    // Activate focus trap
    focusTrap.activate();

    // Add click event on close button
    document.querySelector('.component-modal__cta-close').addEventListener('click', () => {

      // Remove modal html to DOM
      document.querySelector('.component-modal').remove();
      // Remove "open" classnames from body
      document.body.classList.remove('component-modal--is-open');
      // Deactivate focus trap
      focusTrap.deactivate();

    });

  },
  createModalImage (item) {

    const figure = document.querySelector('.component-modal__content-figure');
    const image = document.createElement('img');

    // Set classnames and attributes to image
    image.setAttribute('alt', item.title);
    image.setAttribute('src', item.src.large);
    image.classList.add('component-modal__content-image');

    // Add loader to figure after 666ms
    const loader = setTimeout(() => {

      figure.classList.add('component-modal__content-figure--loader');

    }, 666);

    // When image is loaded
    image.onload = () => {

      // Cancel loader
      clearTimeout(loader);

      // Add "loaded" classname to image
      image.classList.add('component-modal__content-image--loaded');

      // Remove loader
      figure.classList.remove('component-modal__content-figure--loader');

    };

    // Add image to figure
    figure.appendChild(image);

  },
  template () {
    return `
      <div class="component-modal">
        <div class="component-modal__content">
          <figure class="component-modal__content-figure">

          </figure
        </div>
        <button type="button" class="component-modal__cta-close">
          <svg><use xlink:href="${icons}#icon-plus"></use></svg>
          <span>Close modal</span>
        </button>
      </div>
    `;
  }
});

