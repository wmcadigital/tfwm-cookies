const cookieLogic = () => {
  const getCookie = name => {
    return JSON.parse(
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '')
    );
  };

  const cookiesPolicy = getCookie('cookies-policy');
  const cookieScripts = document.querySelectorAll('script[data-cookiescript="accepted"]');

  cookieScripts.forEach(cookieScript => {
    const currentElement = cookieScript;
    const { cookiecategory } = currentElement.dataset;

    if (cookiecategory && cookiesPolicy[cookiecategory]) {
      const createNewScript = document.createElement('script');
      // createNewScript.type = 'text/javascript';
      if (currentElement.src) createNewScript.src = currentElement.src;

      createNewScript.innerHTML = currentElement.innerHTML;

      const frag = new DocumentFragment();

      frag.appendChild(createNewScript);

      console.log({ a: document.createRange().createContextualFragment(createNewScript) });

      currentElement.parentNode.insertBefore(frag, currentElement);

      currentElement.remove();
    }

    return currentElement;
  });

  console.log({ cookiesPolicy, cookieScripts });
};

export default cookieLogic;
