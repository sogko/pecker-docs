'use strict';

console.log('collapsible-menu-button.js');
function Button(name, opts) {
  this.name = name;
  this.opts = opts;
}
Button.prototype.click = function () {
  console.log('button', this.name, 'clicked!', this);
};

module.exports = Button;

