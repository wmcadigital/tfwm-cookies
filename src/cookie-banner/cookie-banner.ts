import getCookie from '../helpers/getCookie';
import setCookie from '../helpers/setCookie';

const cookiesJS = () => {
  const cookiesBanner = document.querySelector<HTMLElement>(
    'header .wmnds-cookies-banner',
  );

  const hideCookieBanner = () => {
    if (cookiesBanner) cookiesBanner.style.display = 'none';
  };
  const showCookieBanner = () => {
    if (cookiesBanner) cookiesBanner.style.display = 'block';
  };

  // Check if cookie(s) created or not
  const checkCookie = (cname: string) => {
    const isCookieCreated = getCookie(cname);
    if (isCookieCreated === '') {
      return false;
    }
    return true;
  };

  const getCookiePolicy = () => JSON.parse(getCookie('cookies-policy'));

  const updateCookiePreferences = () => {
    if (document.querySelector('.wmnds-cookies-manager__preferences')) {
      hideCookieBanner();
      const cookiesOptions = document
        .querySelector<HTMLElement>('.wmnds-cookies-manager__preferences')
        ?.querySelectorAll<HTMLFormElement>('.wmnds-fe-checkboxes__input');
      const currentOptions = [
        getCookiePolicy().essential,
        getCookiePolicy().functional,
        getCookiePolicy().performance,
      ];
      if (cookiesOptions)
        for (let i = 0; i < cookiesOptions.length; i += 1) {
          cookiesOptions[i].checked = currentOptions[i];
        }
    }
  };

  const setCookiePolicy = (
    essentialValue: boolean,
    functionalValue: boolean,
    performanceValue: boolean,
  ) => {
    const cookieValue = {
      essential: essentialValue,
      functional: functionalValue,
      performance: performanceValue,
    };
    setCookie('cookies-policy', JSON.stringify(cookieValue), 181);
    updateCookiePreferences();
  };

  const acceptAllCookies = () => {
    setCookiePolicy(true, true, true);
    setCookie('cookies-preference', true, 181);
    hideCookieBanner();
  };

  const updateAndShowSuccessMessage = () => {
    const message = document.querySelector<HTMLElement>(
      '.wmnds-cookies-manager__success-message',
    );
    if (message) {
      const link = message.querySelector<HTMLLinkElement>(
        '.wmnds-cookies-manager__previous-page a',
      );
      if (link) {
        if (
          (document.referrer === '' ||
            document.referrer === window.location.href) &&
          link.parentElement
        ) {
          link.parentElement.style.display = 'none';
        } else {
          // sends user to the previous page - the one opened before he/she open the cookies manager page
          link.href = document.referrer;
        }
      }
      // display the success message (updated)
      message.style.display = 'block';
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
      console.log(selectedOptions);

      setCookiePolicy(...(selectedOptions as [boolean, boolean, boolean]));
      setCookie('cookies-preference', true, 181);
      updateAndShowSuccessMessage();
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

  // When Accept all cookies button is triggered
  const acceptAllCookiesBtn = document.querySelector<HTMLButtonElement>(
    '.wmnds-cookies-banner__accept-all-cookies',
  );

  if (!isInIframe && acceptAllCookiesBtn) {
    acceptAllCookiesBtn.addEventListener('click', acceptAllCookies);
    acceptAllCookiesBtn.addEventListener('keydown', (event) => {
      if (
        event.key === ' ' ||
        event.key === 'Enter' ||
        event.key === 'Spacebar'
      ) {
        event.preventDefault();
        acceptAllCookies();
      }
    });
  }

  // When Safe Preferences button is triggered
  const cookieForm = document.querySelector('.wmnds-cookies-manager__form');
  if (cookieForm) cookieForm.addEventListener('submit', savePreferences);
};

export default cookiesJS;
