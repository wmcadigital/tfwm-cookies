import cookieBannerLogic from './cookie-banner/cookieBannerLogic';
import manageCookies from './manageCookies/manageCookies';
import cookiePolicyLogic from './cookie-policy-logic';

// Wait until everything is loaded
window.addEventListener('load', () => {
  cookiePolicyLogic();
  cookieBannerLogic();
  manageCookies();
});
