const cookiesBanner = document.querySelector<HTMLElement>('header .wmnds-cookies-banner');

export const hideCookieBanner = () => {
  if (cookiesBanner) cookiesBanner.style.display = 'none';
};

export const showCookieBanner = () => {
  if (cookiesBanner) cookiesBanner.style.display = 'block';
};
