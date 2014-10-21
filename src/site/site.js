/**
 * Entry point for site browserified scripts
 */
'use strict';

/*jshint -W079 */
var $ = require('jquery');

console.log('site.js');

var Block = (function () {
  var PATH_SEP = '/';
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
      runnable = require([ctx.name, 'index'].join(PATH_SEP));
    } catch (e) {
      try {
        var name =  ctx.name.split(PATH_SEP)[ctx.name.split(PATH_SEP).length - 1];
        runnable = require([ctx.name, name].join(PATH_SEP));
      } catch (e) {
        console.error('Unable to load script for block "' + ctx.name + '"');
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
  return Block;
})();

function SiteEngine(options) {

  if (SiteEngine.prototype.__singletonInstance) {
    return SiteEngine.prototype.__singletonInstance;
  }
  SiteEngine.prototype.__singletonInstance = this;

  this.options = options || {};
}

SiteEngine.prototype.bootstrap = function () {

  // bootstrap jquery to window
  if (typeof window !== 'undefined') {
    window.$ = $;
  }

  // initialize blocks when ready
  $(document).ready(function () {

    console.log('ready!');

    // initialize all tagged blocks
    var blocks = $('*[data-block-name]');
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i]) {
        var $block = new Block($(blocks[i]));
        $block.init();
      }
    }

  }.bind(this));
};

var instance = new SiteEngine();
// export SiteEngine instance to window global
if (typeof window !== 'undefined') {
  window.SiteEngine = instance;
}
// export SiteEngine instance for nodejs / browserify
module.exports = instance;

