'use strict';

var log = require('loglevel');
var helper = require('pages/blocks/helper');
var blocks = require('pages/blocks/blocks');

module.exports = function ($ctx) {
  log.debug('index.js');
  log.warn('index.js helper', helper());
  log.error('index.js blocks', blocks());

  // fix off-canvas menus
  var tocMenu = $ctx.find('.toc__menu');
  tocMenu.css('position', 'relative');

  var navMenu = $ctx.find('.nav__menu');
  navMenu.css('position', 'relative');
};