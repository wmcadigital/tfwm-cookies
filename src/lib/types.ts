export type CookieTypes = 'essential' | 'functional' | 'performance';

export type CookiecategoryType = {
  cookiecategory?: CookieTypes;
} & DOMStringMap;
