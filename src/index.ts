import cookiePolicyLogic from './cookie-policy-logic';
import cookiesJS from './cookie-banner/cookie-banner';

// Wait until everything is loaded
window.addEventListener('load', () => {
  cookiePolicyLogic();
  cookiesJS();
});
