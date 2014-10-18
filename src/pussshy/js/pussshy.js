/**
 * Pussshy - v0.0.1 - 2014-10-17
 * Pussshy is a forked version of Christopher Yee's Pushy, a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/sogko/pussshy/
 * by Hafiz Ismail (@sogko)
 *
 * ---------------------------
 *
 * Pushy - v0.9.2 - 2014-9-13
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee
 */

'use strict';
var Pussshy = (function () {
  /*jshint validthis:true */

  //checks if 3d transforms are supported removing the modernizr dependency
  var cssTransforms3d = (function csstransforms3d() {
    var el = document.createElement('p'),
      supported = false,
      transforms = {
        'webkitTransform': '-webkit-transform',
        'OTransform': '-o-transform',
        'msTransform': '-ms-transform',
        'MozTransform': '-moz-transform',
        'transform': 'transform'
      };

    // Add it to the body to get the computed style
    document.body.insertBefore(el, null);

    for (var t in transforms) {
      if (el.style[t] !== undefined) {
        el.style[t] = 'translate3d(1px,1px,1px)';
        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
      }
    }

    document.body.removeChild(el);

    return (supported !== undefined && supported.length > 0 && supported !== 'none');
  })();

  function Pussshy(options) {
    this.options = options;

    this.$body = $('body');
    this.$menu = $('.pussshy__menu--left'); //menu css class
    this.$container = $('.pussshy__container'); //container css class
    this.$siteOverlay = $('.pussshy__site-overlay'); //site overlay

    this.menuOpenClass = 'pussshy__menu--left-open'; //menu position & menu open class
    this.siteOverlayActiveClass = 'pussshy__site-overlay--active'; //css class to toggle site overlay
    this.containerPushClass = 'pussshy__container--push'; //container open class

    this.$menuBtn = $('.pussshy__menu-button, .pussshy__menu a'); //css classes to toggle the menu
    this.menuSpeed = 200; //jQuery fallback menu speed
    this.menuWidth = this.$menu.width() + 'px'; //jQuery fallback menu width
    this.state = true; //jQuery fallback menu state

    // init click/touch events
    //toggle menu
    this.$menuBtn.click(function () {
      this.toggle();
    }.bind(this));
    //close menu when clicking site overlay
    this.$siteOverlay.click(function () {
      this.toggle();
    }.bind(this));

    if (!cssTransforms3d) {
      //jQuery fallback
      this.$menu.css({left: '0px'}); //hide menu by default
      this.$container.css({'overflow-x': 'hidden'}); //fixes IE scrollbar issue
    }
  }

  function togglePushy() {
    this.$body.toggleClass(this.siteOverlayActiveClass); //toggle site overlay
    this.$menu.toggleClass(this.menuOpenClass);
    this.$container.toggleClass(this.containerPushClass);
  }

  function openPushyFallback() {
    this.$body.addClass(this.siteOverlayActiveClass);
    this.$menu.animate({left: this.menuWidth }, this.menuSpeed);
    this.$container.animate({left:  this.menuWidth}, this.menuSpeed);
  }

  function closePushyFallback() {
    this.$body.removeClass(this.siteOverlayActiveClass);
    this.$menu.animate({left: '0px'}, this.menuSpeed);
    this.$container.animate({left: '0px'}, this.menuSpeed);
  }

  Pussshy.prototype.toggle = function toggle() {
    if (cssTransforms3d) {
      togglePushy.call(this);
    } else {
      //jQuery fallback
      if (this.state) {
        openPushyFallback.call(this);
        this.state = false;
      } else {
        closePushyFallback.call(this);
        this.state = true;
      }
    }
  };

  return Pussshy;

})();
