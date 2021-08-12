// Global helpers
import cookiePolicyLogic from '@app/lib/core/cookiePolicyLogic';
import {
  setCookie,
  getCookie,
  setCookiePolicy,
  showCookieBanner,
  updateCookiePreferences,
} from '@app/lib/helpers';

function removeGoogleHotjarCookies() {
  const cookies = document.cookie.split(';');

  cookies.forEach((cookie) => {
    const trimCookie = cookie.trim();

    if (!trimCookie.startsWith('_')) return;

    console.log(getCookie(trimCookie));
    document.cookie = `${trimCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  });
}

const manageCookies = () => {
  // Check if cookie(s) created or not
  const checkCookie = (cname: string): boolean => {
    const isCookieCreated = getCookie(cname);
    return !!isCookieCreated;
  };

  const updateAndShowSuccessMessage = () => {
    const successMessage = document.querySelector<HTMLElement>(
      '.wmnds-cookies-manager__success-message',
    );

    if (!successMessage) return;

    const prevPageLink = successMessage.querySelector<HTMLLinkElement>(
      '.wmnds-cookies-manager__previous-page a',
    );

    // display the success message (updated)
    successMessage.style.display = 'block';

    if (!prevPageLink) return;

    const { referrer } = document;

    if (
      (referrer === '' || referrer === window.location.href) &&
      prevPageLink.parentElement
    ) {
      prevPageLink.parentElement.style.display = 'none';
    } else {
      // sends user to the previous page - the one opened before he/she open the cookies manager page
      prevPageLink.href = referrer;
    }
  };

  const savePreferences = () => {
    if (document.querySelector('.wmnds-cookies-manager__form')) {
      const elements = document
        .querySelector('.wmnds-cookies-manager__form')
        ?.querySelectorAll<HTMLFormElement>('.wmnds-fe-checkboxes__input');
      const selectedOptions: boolean[] = [];

      if (elements)
        for (let i = 0; i < elements.length; i += 1) {
          selectedOptions[i] = elements.item(i).checked;
        }

      if (!selectedOptions[2]) removeGoogleHotjarCookies();
      setCookiePolicy(...(selectedOptions as [boolean, boolean, boolean]));
      setCookie('cookies-preference', true, 181);
      // Goes here

      updateAndShowSuccessMessage();
      cookiePolicyLogic();
    }
  };

  const cookiesScan = () => {
    // if cookies-preference doesn't exist, show cookie banner
    if (!checkCookie('cookies-preference')) {
      showCookieBanner();
      setCookiePolicy(true, false, false);
    }

    // verify if we are at Cookies Manager page and update the selected options to match the already created cookie
    updateCookiePreferences();
  };

  const isInIframe =
    window.frameElement && window.frameElement.nodeName === 'IFRAME'; // check if we are in an iframe

  // Creation of default Cookies permissions when the DOM is fully loaded
  if (!isInIframe) cookiesScan();

  // When Safe Preferences button is triggered
  const cookieForm = document.querySelector('.wmnds-cookies-manager__form');
  if (cookieForm) cookieForm.addEventListener('submit', savePreferences);
};

export default manageCookies;
