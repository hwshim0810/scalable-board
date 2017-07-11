const Http = class {
  constructor(args) {
    this.args = args;
    if (this.args.async === undefined)
      this.args.async = true;

    // Try to get XMLHTTP instance
    if (window.XMLHttpRequest) {
      this.httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        this.httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        try {
          this.httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) { /* Nothing to do */ }
      }
    }

    if (this.httpRequest) {
      if (this.args.async && typeof this.args.callBack === 'function') {
        this.httpRequest.onreadystatechange = function() {
          if (this.httpRequest.readyState == XMLHttpRequest.DONE) {
            this.args.callBack(this.httpRequest);
          }
        };
      }

      this.httpRequest.open(this.args.method, this.args.url, this.args.async);
      this.httpRequest.send(this.args.data);
    }
  }

  done(callBack) {
    if (this.args.async)
      this.args.callBack = callBack;
    else
      callBack(this.httpRequest);
  }

  getResponse() {
    if (!this.args.async && this.httpRequest && this.httpRequest.status === 200)
      return this.httpRequest.responseText;
    else
      return '';
  }
};

const Ajax = function(args) {
  return new Http(args);
};

const _modules = new Set();
const load = function(url) {
  if (!_modules.has(url)) {
    _modules.add(url);
    return Ajax({
      method: 'GET',
      url: url,
      async: false
    }).getResponse();
  }
  return '';
};
