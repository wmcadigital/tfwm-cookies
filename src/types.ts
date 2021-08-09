export type CookieTypes = 'essential' | 'functional' | 'performance';

export type CookiecategoryType = {
  cookiecategory?: CookieTypes;
} & DOMStringMap;

export type CookiesPolicy = {
  essential: boolean;
  functional: boolean;
  performance: boolean;
};
