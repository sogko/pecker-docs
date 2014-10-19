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
    this.$canvas = $('.pussshy__canvas');
    this.$siteOverlay = $('.pussshy__site-overlay');

    this.$leftMenu = $('.pussshy__menu, .pussshy__left-menu');
    this.$leftMenuBtn = $('.pussshy__menu-button, .pussshy__left-menu-button');

    this.$rightMenu = $('.pussshy__right-menu');
    this.$rightMenuBtn = $('.pussshy__right-menu-button');

    // classes
    this.menuLeftOpenClass = 'pussshy__left-menu--open';
    this.menuRightOpenClass = 'pussshy__right-menu--open';
    this.canvasPushLeftClass = 'pussshy__canvas--push-left';
    this.canvasPushRightClass = 'pussshy__canvas--push-right';
    this.siteOverlayActiveClass = 'pussshy__site-overlay--active';

    this.directionState = 'left';
    this.menuSpeed = 200; //jQuery fallback menu speed
    this.menuWidth = this.$leftMenu.width() + 'px'; //jQuery fallback menu width
    this.menuState = 'closed'; //jQuery fallback menu state


    //toggle menu
    this.$leftMenuBtn.click(function () {
      this.directionState = 'left';
      this.toggle();
    }.bind(this));

    this.$rightMenuBtn.click(function () {
      this.directionState = 'right';
      this.toggle();
    }.bind(this));

    //close menu when clicking site overlay
    this.$siteOverlay.click(function () {
      this.toggle(this.directionState);
    }.bind(this));

    if (!cssTransforms3d) {
      //jQuery fallback
      this.$leftMenu.css({left: '0px'}); //hide menu by default
      this.$canvas.css({'overflow-x': 'hidden'}); //fixes IE scrollbar issue
    }
  }

  function togglePushy() {
    this.$body.toggleClass(this.siteOverlayActiveClass); //toggle site overlay

    if (this.directionState === 'right') {
      this.$rightMenu.toggleClass(this.menuRightOpenClass);
      this.$canvas.toggleClass(this.canvasPushRightClass);
    } else {
      this.$leftMenu.toggleClass(this.menuLeftOpenClass);
      this.$canvas.toggleClass(this.canvasPushLeftClass);
    }
  }

  function openPushyFallback() {
    this.$body.addClass(this.siteOverlayActiveClass);
    this.$leftMenu.animate({left: this.menuWidth }, this.menuSpeed);
    this.$canvas.animate({left: this.menuWidth}, this.menuSpeed);
  }

  function closePushyFallback() {
    this.$body.removeClass(this.siteOverlayActiveClass);
    this.$leftMenu.animate({left: '0px'}, this.menuSpeed);
    this.$canvas.animate({left: '0px'}, this.menuSpeed);
  }

  Pussshy.prototype.toggle = function toggle() {


    if (cssTransforms3d) {
      togglePushy.call(this);
    } else {
      //jQuery fallback
      if (this.menuState === 'closed') {
        openPushyFallback.call(this);
        this.menuState = 'opened';
      } else {
        closePushyFallback.call(this);
        this.menuState = 'closed';
      }
    }
  };


  return Pussshy;

})();
