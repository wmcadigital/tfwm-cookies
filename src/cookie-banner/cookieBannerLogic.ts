import { setCookie, setCookiePolicy, hideCookieBanner } from '../helpers';

const acceptAllCookies = () => {
  setCookiePolicy(true, true, true);
  setCookie('cookies-preference', true, 181);
  hideCookieBanner();
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key !== ' ' && event.key !== 'Enter' && event.key !== 'Spacebar')
    return;

  event.preventDefault();
  acceptAllCookies();
};

// START HERE
const cookieBannerLogic = () => {
  const isInIframe =
    window.frameElement && window.frameElement.nodeName === 'IFRAME'; // check if we are in an iframe

  // When Accept all cookies button is triggered
  const acceptAllCookiesBtn = document.querySelector<HTMLButtonElement>(
    '.wmnds-cookies-banner__accept-all-cookies',
  );

  if (isInIframe || acceptAllCookiesBtn === null) return; // If in an iframe or accept all btn isn't available, return out

  // Otherwise...
  acceptAllCookiesBtn.addEventListener('click', acceptAllCookies);
  acceptAllCookiesBtn.addEventListener('keydown', handleKeyDown);
};

export default cookieBannerLogic;
