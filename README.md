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

### `cookieBanner` methhod

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

# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
