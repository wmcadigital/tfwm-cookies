import { hideCookieBanner } from './showHideBanner';
import { getCookie, setCookie } from './setGetCookie';

const getCookiePolicy = () => JSON.parse(getCookie('cookies-policy'));

export const updateCookiePreferences = () => {
  const cookieManageForm = document.querySelector<HTMLElement>(
    '.wmnds-cookies-manager__preferences',
  );

  if (!cookieManageForm) return;

  hideCookieBanner();
  const cookiesOptions = cookieManageForm.querySelectorAll<HTMLFormElement>(
    '.wmnds-fe-checkboxes__input',
  );
  const currentOptions = [
    getCookiePolicy().essential,
    getCookiePolicy().functional,
    getCookiePolicy().performance,
  ];

  if (cookiesOptions)
    for (let i = 0; i < cookiesOptions.length; i += 1) {
      cookiesOptions[i].checked = currentOptions[i];
    }
};

export const setCookiePolicy = (
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
