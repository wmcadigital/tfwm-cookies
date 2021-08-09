// Set cookie based on name, value and expiry date supplied
const setCookie = (
  cname: string,
  cvalue: string | boolean,
  exdays: number,
): void => {
  const env = process.env.NODE_ENV || 'developement';
  const cookieDomain = 'tfwm.org.uk';
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const domain =
    env === 'development' ? 'domain=localhost' : `domain=.${cookieDomain}`;
  document.cookie = `${cname}=${cvalue};${expires};${domain};path=/`;
};

export default setCookie;
