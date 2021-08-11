import cookieBanner from './core/cookieBanner';
import manageCookies from './core/manageCookies';
import cookiePolicyLogic from './core/cookiePolicyLogic';

// Wait until everything is loaded
const tfwmCookieLogic = () => {
  cookiePolicyLogic();
  cookieBanner();
  manageCookies();
};

export default tfwmCookieLogic;
