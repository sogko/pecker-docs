'use strict';

var log = require('loglevel');
var Pussshy = require('Pussshy');

module.exports = function ($ctx) {
  log.debug('page.js');

  // instantiate off-canvas menu
  $ctx.pussshy = new Pussshy({
    direction: 'left',
    canvasTarget: [
      '.page-layout .landing-header__menu-button',
      '.page-layout .content',
      '.page-layout__sticky-footer'
    ].join(', '),
    menuTarget: '.nav__menu',
    menuItemsTarget: '.nav__menu-items',
    menuButtonTarget: '.nav__menu-button'
  });

};

