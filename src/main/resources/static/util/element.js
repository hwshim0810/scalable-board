var elem = function(tagName) {
  return document.createElement(tagName);
};

Element.prototype.clear = function() {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
  return this;
}

Element.prototype.addClass = function(className) {
  this.classList.add(className);
  return this;
}

Element.prototype.addClassIf = function(className, condition) {
  if (condition)
    this.classList.add(className);
  return this;
}

Element.prototype.setText = function(text) {
  this.innerText = text;
  return this;
}

Element.prototype.setOnclick = function(onclick) {
  this.onclick = onclick;
  return this;
}

Element.prototype.appendTo = function(parent) {
  parent.appendChild(this);
  return this;
}
