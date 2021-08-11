import { getCookiePolicy } from '../helpers';
import googleTagManager from '../third-parties/googleTagManager';
// Types
import type { CookiecategoryType } from '../types';

const cookiePolicyLogic = () => {
  const cookiesPolicy = getCookiePolicy();

  if (!cookiesPolicy) return;

  const plainTextScripts = document.querySelectorAll<HTMLScriptElement>(
    'script[data-cookiescript="accepted"][type="plain/text"]',
  ); // Get all scripts on the page using that want to use this logic

  if (cookiesPolicy.performance) googleTagManager(); // Run Google Tag Manager (includes analytics and hotjar) if user has enabled performance cookies

  if (!cookiesPolicy || !plainTextScripts.length) return; // No cookies policy set/found or script tags found on page...break out and avoid running logic below

  plainTextScripts.forEach((plainTextScript) => {
    const { cookiecategory }: CookiecategoryType = plainTextScript.dataset;

    // Do a check to see if the cookieCategory on our plain/text script is a cookie the user has accepted via the cookiePolicy cookie (is it true? If so, we can run that script tag as the user has consented).
    if (cookiecategory && cookiesPolicy[cookiecategory]) {
      // Start of logic to convert plain/text script into a executable script tag
      const newScriptTag = document.createElement('script'); // Create a new script tag
      if (plainTextScript.src) newScriptTag.src = plainTextScript.src; // If our scripTag has a src then we want to copy it
      newScriptTag.innerHTML = plainTextScript.innerHTML; // Get all code within our plain/text script and copy it

      // Create a DocumentFrag and append our new script tag(above) to it, this converts it into something we can inject in the DOM.
      const frag = new DocumentFragment();
      frag.appendChild(newScriptTag);

      // Inject our new working script right before our text/plain script tag (when this code runs, the javascript in the tag will then run).
      plainTextScript.parentNode?.insertBefore(frag, plainTextScript);
      plainTextScript.remove(); // As we don'tneed the plain/text script anymore we can destroy it.
    }

    return plainTextScript;
  });
};

export default cookiePolicyLogic;
