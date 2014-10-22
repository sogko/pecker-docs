/**
 * Entry point for site browserified scripts
 */
'use strict';

/*jshint -W079 */
var $ = require('jquery');
var log = require('loglevel');
var Block = require('common/block');

function SiteEngine(options) {

  if (SiteEngine.prototype.__singletonInstance) {
    return SiteEngine.prototype.__singletonInstance;
  }
  SiteEngine.prototype.__singletonInstance = this;

  this.options = options || {};

  this.options.mode = 'development';
  if (this.options.mode === 'development') {
    log.setLevel('debug');
    log.warn('Site in development mode');
  }

}

SiteEngine.prototype.bootstrap = function () {

  // bootstrap jquery to window
  if (typeof window !== 'undefined') {
    window.$ = $;
  }

  // initialize blocks when ready
  $(document).ready(function () {

    log.debug('ready! 33');


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

