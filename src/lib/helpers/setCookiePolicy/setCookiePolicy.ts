import type { CookiesPolicy } from './types';
import { hideCookieBanner } from '../showHideBanner';
import { getCookie, setCookie } from '../setGetCookie';

export const getCookiePolicy = (): CookiesPolicy => {
  if (!getCookie('cookies-policy')) return null;

  const cookiePolicy = getCookie('cookies-policy'); // Get the cookiesPolicy from our cookies otherwise return blank string
  return cookiePolicy ? JSON.parse(cookiePolicy) : null;
};

const updateManageCheckboxesInDOM = (cookieManageForm: HTMLElement) => {
  const cookiesOptions = cookieManageForm.querySelectorAll<HTMLFormElement>(
    '.wmnds-fe-checkboxes__input',
  );
  const currentOptions = [
    getCookiePolicy()?.essential,
    getCookiePolicy()?.functional,
    getCookiePolicy()?.performance,
  ];

  if (cookiesOptions)
    for (let i = 0; i < cookiesOptions.length; i += 1) {
      cookiesOptions[i].checked = currentOptions[i];
    }
};

export const updateCookiePreferences = () => {
  const cookieManageForm = document.querySelector<HTMLElement>(
    '.wmnds-cookies-manager__preferences',
  );

  if (!cookieManageForm) return;

  hideCookieBanner();
  updateManageCheckboxesInDOM(cookieManageForm);
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
