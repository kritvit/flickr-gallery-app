
import Cookies from 'js-cookie';

export default {
  state: {
    cookiesAcceptedFunctional: Cookies.get('COOKIE_CONSENT_FUNCTIONAL') === '1'
  },
  cookies: {
    keyFunctional: 'COOKIE_CONSENT_FUNCTIONAL'
  }
};