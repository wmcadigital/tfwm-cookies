// Global helpers
import cookiePolicyLogic from '@app/lib/core/cookiePolicyLogic';
import {
  setCookie,
  getCookie,
  setCookiePolicy,
  showCookieBanner,
  updateCookiePreferences
} from '@app/lib/helpers';

import type { CookieTypes } from '@app/lib/types';

const removeThirdPartyCookies = () => {
  const cookies = document.cookie.split(';'); // Get all cookies and split to an array

  cookies.forEach(cookie => {
    const trimCookie = cookie.trim();
    if (!trimCookie.startsWith('_')) return; // If the cookie doesn't start with underscore, then it's most likely one of ours...so, return!
    document.cookie = `${trimCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // Otherwise set the cookie to blank value and expiry to a date in the past (this will delete that cookie)
  });
};
// Check if cookie(s) created or not
const checkCookie = (cname: string): boolean => {
  const isCookieCreated = getCookie(cname);
  return !!isCookieCreated;
};

const updateAndShowSuccessMessage = () => {
  const successMessage = document.querySelector<HTMLElement>(
    '.wmnds-cookies-manager__success-message'
  );

  if (!successMessage) return;

  const prevPageLink = successMessage.querySelector<HTMLLinkElement>(
    '.wmnds-cookies-manager__previous-page a'
  );
  // display the success message (updated)
  successMessage.style.display = 'block';

  // If there is no prev page link found, return.
  if (!prevPageLink) return;
  // Otherwise...
  const { referrer } = document;

  // Check if user came directly to the manage page...
  if ((referrer === '' || referrer === window.location.href) && prevPageLink.parentElement) {
    // If so, then hide the prev page link
    prevPageLink.parentElement.style.display = 'none';
  } else {
    // sends user to the previous page - the one opened before he/she open the cookies manager page
    prevPageLink.href = referrer;
  }
};

const savePreferences = (e: Event, cookieForm: Element) => {
  e.preventDefault(); // Prevent form default submit

  // Return boolean based on if the checkbox is checked for that cookie type
  const isCheckboxCheckedFor = (name: CookieTypes) =>
    cookieForm.querySelector<HTMLFormElement>(`.wmnds-fe-checkboxes__input[name="${name}-cookies"]`)
      ?.checked;

  // If the last box (performance) is not true, then remove all third party cookies
  if (!isCheckboxCheckedFor('performance')) removeThirdPartyCookies();

  // Update cookie polciy based on checked cookies
  setCookiePolicy(
    isCheckboxCheckedFor('essential'),
    isCheckboxCheckedFor('functional'),
    isCheckboxCheckedFor('performance')
  );
  setCookie('cookies-preference', true, 181);
  updateAndShowSuccessMessage(); // Show success message and prev link within it (if available)
  cookiePolicyLogic(); // Rerun cookie logic with new cookies
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

// START HERE
const manageCookies = () => {
  const isInIframe = window.frameElement && window.frameElement.nodeName === 'IFRAME'; // check if we are in an iframe

  // Creation of default Cookies permissions when the DOM is fully loaded
  if (!isInIframe) cookiesScan();

  // When Safe Preferences button is triggered
  const cookieForm = document.querySelector('.wmnds-cookies-manager__form');
  if (cookieForm) cookieForm.addEventListener('submit', e => savePreferences(e, cookieForm));
};

export default manageCookies;
