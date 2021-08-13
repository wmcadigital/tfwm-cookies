import { cookieBanner, manageCookies, cookiePolicyLogic } from '@app/lib';

// Wait until everything is loaded
window.addEventListener('load', () => {
  cookieBanner();
  manageCookies();
  cookiePolicyLogic();
});
