'use strict';

var log = require('loglevel');
var Pussshy = require('Pussshy');

module.exports = function ($ctx) {
  log.debug('documentation.js');

  // instantiate off-canvas menu
  $ctx.pussshy = new Pussshy({
    direction: 'left',
    canvasTarget: [
      '.documentation-layout .header',
      '.documentation-layout .content-column',
      '.documentation-layout__sticky-footer'
    ].join(', '),
    menuTarget: '.toc__menu',
    menuItemsTarget: '.toc__menu-items',
    menuButtonTarget: '.toc__menu-button'
  });
};

