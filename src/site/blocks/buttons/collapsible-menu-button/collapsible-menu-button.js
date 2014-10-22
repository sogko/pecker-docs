'use strict';

var log = require('loglevel');

log.debug('collapsible-menu-button.js');

function Button(name, opts) {
  this.name = name;
  this.opts = opts;
}
Button.prototype.click = function () {
  log.debug('button', this.name, 'clicked!', this);
};

module.exports = Button;

