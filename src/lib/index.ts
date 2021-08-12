import cookieBanner from './core/cookieBanner';
import manageCookies from './core/manageCookies';
import cookiePolicyLogic from './core/cookiePolicyLogic';
import { getCookie } from './helpers';

// Wait until everything is loaded
const tfwmCookieLogic = () => {
  cookiePolicyLogic();
  cookieBanner();
  manageCookies();
};

export { getCookie, tfwmCookieLogic };
