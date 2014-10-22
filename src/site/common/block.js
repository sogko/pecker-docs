'use strict';

var PATH_SEP = '/';
var log = require('loglevel');
var $ = require('jquery');

function Block($block) {
  if (!$block instanceof $) {
    $block = $($block);
  }
  this.$block = $block;
  this.name = $block.data('block-name') || '';
  this.type = $block.data('block-type') || '';
}

function executeRunnableBlock(ctx) {
  var runnable;

  // `require` strategy
  // - try to load [namespace/]name/index first
  // - if fails, try [namespace/]name/name
  // - else, fails
  try {
    log.trace('try 1', [ctx.name].join(PATH_SEP));
    runnable = require([ctx.name].join(PATH_SEP));
  } catch (e) {
    try {
      log.trace('try 2', [ctx.name, 'index'].join(PATH_SEP));
      runnable = require([ctx.name, 'index'].join(PATH_SEP));
    } catch (e) {
      try {
        var name =  ctx.name.split(PATH_SEP)[ctx.name.split(PATH_SEP).length - 1];
        log.trace('try 3', [ctx.name, name].join(PATH_SEP));
        runnable = require([ctx.name, name].join(PATH_SEP));
      } catch (e) {
        log.error('Unable to load script for block "' + ctx.name + '"');
      }
    }
  }

  // `this` would point to `window` in browser environment, else undefined
  // first arg would be $block context
  runnable.call(window, ctx.$block);
}

Block.prototype.init = function () {
  switch (this.type) {
    case 'runnable':
      // automatically execute export function with current block context
      executeRunnableBlock.call(this, this);
      break;
    case 'component':
      // do nothing. component will be required in a runnable block or another component
      break;
  }
};

module.exports = Block;
