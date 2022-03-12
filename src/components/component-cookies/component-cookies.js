
import Component from '@scripts/Component';
import Cookies from 'js-cookie';
import global from '@scripts/global';
import { hasLocalStorage } from '@scripts/helpers';
import { publish, subscribe } from '@scripts/pubsub';
import './component-cookies.scss';

const useLocalStorage = hasLocalStorage();
const keyFunctional = 'COOKIE_CONSENT_FUNCTIONAL';
const cookieSettings = {
  expires: 30,
  SameSite: 'Lax'
};

export default Component('component-cookies', {
  onLoad () {

    if (!global.state.cookiesAcceptedFunctional) {

      this.init();

    }

    subscribe('component-cookies.edit', () => {

      this.init();

    });

  },

  template () {
    return `
      <section class="component-cookies">
        <div class="component-cookies__inner global__max-container">
          <div class="component-cookies__inner-text">
            <h2 class="global__h2 component-cookies__headline">Cookies</h2>
            <p>Cookies</p>
          </div>
          <div class="component-cookies__inner-cta">
            <button type="button" class="global__button component-cookies__button component-cookies__cta--decline-all">Decline cookies and localStorage</button>
            <button type="button" class="global__button component-cookies__button component-cookies__cta--accept-functional">Accept functional cookies and localStorage</button>
          </div>
        </div>
      </section>
    `;
  },

  init () {

    const output = document.querySelector('main');

    if (!output) {

      return false;

    }

    output.insertAdjacentHTML('afterbegin', this.template());

    const acceptFunctional = document.querySelector('.component-cookies__cta--accept-functional');

    if (acceptFunctional) {

      acceptFunctional.addEventListener('click', event => {

        const moduleCookies = event.currentTarget.closest('.component-cookies');

        // Save state in cookie
        Cookies.set(keyFunctional, '1', cookieSettings);

        // Save state in global state
        global.state.cookiesAcceptedFunctional = true;

        if (moduleCookies) {

          moduleCookies.parentNode.removeChild(moduleCookies);

          publish('component-cookies.update', global.state.cookiesAcceptedFunctional);

        }

      }, false);

    }

    const declineAll = document.querySelector('.component-cookies__cta--decline-all');

    if (declineAll) {

      declineAll.addEventListener('click', event => {

        const moduleCookies = event.currentTarget.closest('.component-cookies');

        // remove state from cookies
        Cookies.remove(keyFunctional, cookieSettings);

        // Update state in global state
        global.state.cookiesAcceptedFunctional = false;

        if (useLocalStorage) {

          // Clear local storage
          localStorage.clear();

        }

        if (moduleCookies) {

          moduleCookies.parentNode.removeChild(moduleCookies);

          publish('component-cookies.update', global.state.cookiesAcceptedFunctional);

        }

      }, false);

    }

  }
});

