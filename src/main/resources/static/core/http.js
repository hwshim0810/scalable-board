(function() {
  class Http {
    constructor(url) {
      this.url = url;
    }

    get(args) {
      return Http.send('GET', this.url, args);
    }

    post(args) {
      return Http.send('POST', this.url, args);
    }

    put(args) {
      return Http.send('PUT', this.url, args);
    }

    delete(args) {
      return Http.send('DELETE', this.url, args);
    }

    static send(method, url, args = {}) {
      return new Promise((resolve, reject) => {
        let httpRequest = Http.getRequest();
        if (httpRequest !== undefined) {
          httpRequest.onload = () => {
            if (httpRequest.status >= 200 && httpRequest.status < 300)
              resolve(httpRequest.response);
            else
              reject(httpRequest.statusText, httpRequest.status);
          };
          httpRequest.onerror = () => reject(httpRequest.statusText);
          httpRequest.open(method, url, args.async !== undefined ? args.async : true);
          httpRequest.send(args.data);
        } else {
          reject('[Http.send] XMLHttpRequest not supported.');
        }
      });
    }

    static getRequest() {
      let httpRequest;
      // Try to get XMLHTTP instance
      if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
          try {
            httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
          } catch (e) { /* Nothing to do */ }
        }
      }
      return httpRequest;
    }
  }

  this.Ajax = url => new Http(url);
})();
