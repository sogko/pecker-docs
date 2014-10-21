'use strict';

var helper = require('pages/blocks/helper');
var blocks = require('pages/blocks/blocks');

module.exports = function ($ctx) {
  console.log('index.js');
  console.log('index.js helper', helper());
  console.log('index.js blocks', blocks());

  // fix off-canvas menus
  var tocMenu = $ctx.find('.toc__menu');
  tocMenu.css('position', 'relative');

  var navMenu = $ctx.find('.nav__menu');
  navMenu.css('position', 'relative');
};