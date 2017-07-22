(function() {
  this.N = function(tag, attrs, ...children) {
    return new _Node(tag, attrs, children);
  }

  /**
   * Virtual-DOM node representation
   */
  class _Node {
    constructor(tag, attrs, children) {
      this.tag = tag;
      this.attrs = attrs;
      this.children = children;
    }
  }

  // Generate helper functions for elm-like representation
  const tags = [
    'a', 'b', 'p', 'span', 'div',
    'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'form', 'input', 'label', 'select', 'option'
  ];
  for (let tag of tags)
    if (this[tag] === undefined)
      this[tag] = (attrs, children) => new _Node(tag, attrs, children);

  /**
   * Create DOM node based on Virtual-DOM node and return it.
   * @param  {_Node|string} _node Virtual-DOM node
   * @return {Node}               Created DOM node
   */
  this.createElement = function(_node) {
    if (typeof _node === 'string')
      return document.createTextNode(_node);
    else if (_node instanceof _Node) {
      const elem = document.createElement(_node.tag);

      for (let p in _node.attrs)
        setAttribute(elem, p, _node.attrs[p]);

      for (let _childNode of _node.children)
        elem.appendChild(createElement(_childNode));

      return elem;
    } else {
      console.error(_node);
      throw new TypeError('_node Must be string or Node: ' + (typeof _node));
    }
  }

  /**
   * Update differences of DOM node recursively
   * @param  {Node} parentNode        Parent node of current DOM node
   * @param  {_Node|string} _newNode  New Virtual-DOM node of current DOM node
   * @param  {_Node|string} _oldNode  Old Virtual-DOM node of current DOM node
   * @param  {Number} [index=0]       Index of current DOM node
   */
  this.updateElement = function(parentNode, _newNode, _oldNode, index = 0) {
    const currentNode = parentNode.childNodes[index];
    if (_oldNode === undefined) {
      parentNode.appendChild(createElement(_newNode));
    } else if (_newNode === undefined) {
      parentNode.removeChild(currentNode);
    } else if (shallowDiff(_newNode, _oldNode)) {
      parentNode.replaceChild(createElement(_newNode), currentNode);
    } else if (_newNode instanceof _Node) {
      updateAttrs(currentNode, _newNode.attrs, _oldNode.attrs);
      const newLength = _newNode.children.length;
      const oldLength = _newNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; ++i)
        updateElement(currentNode, _newNode.children[i], _oldNode.children[i], i);
    } else {
      // Nothing to update
    }
  }

  /**
   * Check if types of two Virtual-DOM nodes are different
   * @param  {_Node|string} _node1  Virtual-DOM node
   * @param  {_Node|string} _node2  Virtual-DOM node
   * @return {boolean}              True if types of two Virtual-DOM nodes are diffrent
   */
  function shallowDiff(_node1, _node2) {
    return (typeof _node1 !== typeof _node2) ||
      (typeof _node1 === 'string' && _node1 !== _node2) ||
      (_node1.tag !== _node2.tag);
  }

  /**
   * Update attributs of DOM node
   * @param  {Node} node        DOM node to update
   * @param  {Object} newAttrs  New attributes of Virtual-DOM node
   * @param  {Object} oldAttrs  Old attributes of Virtual-DOM node
   */
  function updateAttrs(node, newAttrs, oldAttrs) {
    for (let p in newAttrs)
      if (newAttrs[p] === undefined)
        node.removeAttribute(p);

    for (let p in oldAttrs)
      if (newAttrs[p] !== oldAttrs[p])
        setAttribute(node, p, newAttrs[p]);
  }

  function setAttribute(node, key, value) {
    if (key === 'onclick')
      node.onclick = value;
    else
      node.setAttribute(key, value);
  }
})();
