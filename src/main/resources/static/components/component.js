def([], function(exports) {
  exports.Component = class {
    constructor(node) {
      this.node = node;
      this._nodes = [];
    }

    static create(node) {
      return new this(node);
    }

    /**
     * Request data to url and try to update component if response is given.
     * @param  {string} url Data url
     */
    refresh(url) {
      Ajax(url)
        .get()
        .then(response => this.update(response))
        .catch((e, status) => {
          if (e instanceof Error)
            console.log(e.stack);
          else if (status !== undefined)
            console.error('[Component.refresh][' + status + '] ' + e);
          else
            console.error('[Component.refresh] ' + e);
        });
    }

    /**
     * Update component with response data.
     * @param  {string} response Response text
     */
    update(response) {
      try {
        let _newNodes = this.dataToVirtualDOMs(JSON.parse(response));
        for (let i = 0, n = _newNodes.length; i < n; ++i)
        updateElement(this.node, _newNodes[i], this._nodes[i], i);

        this._nodes = _newNodes;
      } catch (e) {
        console.error(this);
        console.error(e.stack);
      }
    }

    /**
     * Build new Virtual-DOM node from given data.
     * @param  {Object} data  Parsed json object
     * @return {Array}        Array of new Virtual-DOM nodes
     */
    dataToVirtualDOMs(data) {}
  }
});
