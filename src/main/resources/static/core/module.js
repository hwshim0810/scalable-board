const def = (function() {
  class Module {
    constructor(url) {
      this.url = url;
      this.path = this.url.substring(0, url.length - 3);
      this.name = this.path.split('/').pop();
      this.exports = undefined;
    }
  }

  const TIMEOUT = 3000;
  const HEAD = document.getElementsByTagName('head')[0];
  const MODULES = new Map();
  const SCRIPTS = new Set();

  for (script of HEAD.getElementsByTagName('script'))
    SCRIPTS.add(script.getAttribute('src'));

  function loadScript(url) {
    if (!SCRIPTS.has(url)) {
      SCRIPTS.add(url);
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      HEAD.appendChild(script);
    }
  }

  function getModule(url) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(MODULES.get(url));
      }, 1);
    });
  }

  function getCurrentScriptURL() {
    let scripts = HEAD.getElementsByTagName('script');
    let lastScript = scripts[scripts.length - 1];
    return lastScript.getAttribute('src');
  }

  function isTimedout(start) {
    return (new Date().getMilliseconds() - start) > TIMEOUT;
  }

  function register(context, name, object) {
    if (context[name] === undefined)
      context[name] = object;
    else
      throw new Error('[Module.register] Name conflict: ' + name);
  }

  async function _def(_dependencies, _body) {
    let aliasList = {};
    let dependencyURLs = [];
    for (d of _dependencies) {
      let tmp = d.split(' as ');
      let path = tmp[0];
      let alias = tmp[1];
      if (alias !== undefined)
        aliasList[path] = alias;
      dependencyURLs.push(path + '.js');
    }

    // HACK: Load scripts synchronously forcibly
    for (url of dependencyURLs){
      loadScript(url);
      const start = new Date().getMilliseconds();
      let dependency;
      while (dependency === undefined && !isTimedout(start))
        dependency = await getModule(url);

      let alias = aliasList[dependency.path];
      if (alias !== undefined) {
        register(this, alias, dependency.exports);
      } else {
        for (_export in dependency.exports) {
          register(this, _export, dependency.exports[_export]);
        }
      }
    }

    let _module = new Module(getCurrentScriptURL());
    _module.exports = {}
    _body(_module.exports);
    MODULES.set(getCurrentScriptURL(), _module);
  }

  return _def;
})();
