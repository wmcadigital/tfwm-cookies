# TfWM Cookies

Logic to assist with users cookie preferences on Transport for West Midlands website and services.

## Installation

Install tfwm-cookies with npm

```bash
  npm install tfwm-cookies
```

## Features

- Contains 3 core libraries `cookieBanner`, `manageCookies` and `cookiePolicyLogic`
- Contains 1 helper method `getCookiePolicy`
- Automatically injects TfWM's Google Tag Manager and Hotjar code if user has correct cookie preferences
- Allows for third-party libraries to be restricted unless a user has enabled a specific cookie preference

## Umbraco header and footer

If you are using the Umbraco header and footer script:

```html
<script src="//tfwm.org.uk/scripts/header-footer.min.js"></script>
```

Then you will not need to use this library for the `cookieBanner` and `getCookiePolicy` methods as it comes included.

## `cookieBanner` method

### Example

```javascript
import { cookieBanner } from 'tfwm-cookies';

window.addEventListener('load', () => {
  cookieBanner();
});
```

### About

You should use this method when you have TfWM's design system [Cookie banner](https://designsystem.tfwm.org.uk/patterns/cookies/#cookie-banner)
on your webpage or service.

- Will show/hide the [Cookie banner](https://designsystem.tfwm.org.uk/patterns/cookies/#cookie-banner) based on if the user has accepted cookies or not
- If the user clicks (or uses accepted keyboard methods such as pressing enter or space) the `Accept all cookies` button within the [Cookie banner](https://designsystem.tfwm.org.uk/patterns/cookies/#cookie-banner):
  - It will mark all cookie preferences (essential, functional, performance) within the cookie `cookie-policy` as `true`
  - Sets a new cookie called `cookies-preferences` to `true`
  - Will then re-run the `cookiePolicyLogic` method
  - Finally, hide the [Cookie banner](https://designsystem.tfwm.org.uk/patterns/cookies/#cookie-banner)

## `manageCookies` method

### Example

```javascript
import { manageCookies } from 'tfwm-cookies';

window.addEventListener('load', () => {
  manageCookies();
});
```

### About

This method should only be used on a page that has TfWM's design system [Manage cookies](https://designsystem.tfwm.org.uk/patterns/cookies/#manage-cookies) form within it, such as [TfWM's main manage cookie page](https://www.tfwm.org.uk/manage-cookies/).

- Tracks if a checkbox is checked within [Manage cookies](https://designsystem.tfwm.org.uk/patterns/cookies/#manage-cookies) form
- When a user presses/clicks the `Save preferences` button:
  - It will then update the cookie preferences (essential, functional, performance) based on the checkboxes checked
  - If a user has unchecked the `performance` checkbox and then presses the `Save preferences` button then all cookies that start with `_` (usually third party services such as Google Tag Manager and Hotjar) will be deleted
  - Will then re-run the `cookiePolicyLogic` method

## `cookiePolicyLogic` method

### Example

```javascript
import { cookiePolicyLogic } from 'tfwm-cookies';

window.addEventListener('load', () => {
  cookiePolicyLogic();
});
```

### About

This is the core cookie logic that assists with the `cookieBanner` and `manageCookies` methods. If you are not using TfWM's design system [Cookie banner](https://designsystem.tfwm.org.uk/patterns/cookies/#cookie-banner) and [Manage cookies](https://designsystem.tfwm.org.uk/patterns/cookies/#manage-cookies), then this method can be used on its own.

- Automatically injects TfWM's Google Tag Manager and Hotjar code if the `cookie-policy` cookie has the `performance` field set to `true`
- By calling this method, it enables you to add third party or custom code but restrict it from running unless a certain cookie has been set
  - To use this on custom or third party code, you need to:
    - Change the type so it is `plain/text` (this stops the code running on page load)
    - Add the attribute `data-cookiescript="accepted"` (this is what is used to find your restricted scripts on the page)
    - Add the attribute `data-cookiecategory` which can be of three values `"functional" | "essential" | "performance"`. This will map to the fields
  - An example of the API is...
  ```html
  <script type="plain/text" data-cookiescript="accepted" data-cookiecategory="functional">
    console.log('test');
  </script>
  ```

## Usage/Examples

```javascript
import { cookieBanner, manageCookies, cookiePolicyLogic } from 'tfwm-cookies';

// Wait until everything is loaded
window.addEventListener('load', () => {
  cookieBanner();
  manageCookies();
  cookiePolicyLogic();
});
```
