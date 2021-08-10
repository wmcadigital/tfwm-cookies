// Set cookie based on name, value and expiry date supplied
export const setCookie = (
  cname: string,
  cvalue: string | boolean,
  exdays: number,
): void => {
  const env = import.meta.env.NODE_ENV || 'developement';
  const cookieDomain = 'tfwm.org.uk';
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const domain =
    env === 'development' ? 'domain=localhost' : `domain=.${cookieDomain}`;
  document.cookie = `${cname}=${cvalue};${expires};${domain};path=/`;
};

// Get cookie based on name supplied
export const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};
