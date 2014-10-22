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

  // important targets:
  // menu button
  // menu
  // canvas

  // direction can be specified

  // site overlay can be added automatically
  function Pussshy(options) {
    this.options = options || {};

    // direction of menu
    this.direction = this.options.direction || 'left';

    // target classes
    this.contextTarget = this.options.contextTarget || 'body';
    this.siteOverlayTarget = this.options.siteOverlayTarget || '.pussshy__site-overlay';
    this.canvasTarget = this.options.canvasTarget || '.pussshy__canvas';
    this.menuTarget = this.options.menuTarget || '.pussshy__menu';
    this.menuItemsTarget = this.options.menuItemsTarget || '.pussshy__menu-items';
    this.menuButtonTarget = this.options.menuButtonTarget || '.pussshy__menu-button';

    // internal state/appearance classes
    this.menuItemsClass = 'pussshy__menu-items';
    this.leftMenuClass = 'pussshy__left-menu';
    this.leftMenuCloseClass = 'pussshy__left-menu--close';
    this.leftMenuOpenClass = 'pussshy__left-menu--open';
    this.leftMenuButtonClass = 'pussshy__left-menu-button';
    
    this.rightMenuClass = 'pussshy__right-menu';
    this.rightMenuCloseClass = 'pussshy__right-menu--close';
    this.rightMenuOpenClass = 'pussshy__right-menu--open';
    this.rightMenuButtonClass = 'pussshy__right-menu-button';
    
    this.canvasClass = 'pussshy__canvas';
    this.canvasPushLeftClass = 'pussshy__canvas--push-left';
    this.canvasPushRightClass = 'pussshy__canvas--push-right';
    this.siteOverlayClass = 'pussshy__site-overlay';
    this.siteOverlayActiveClass = 'pussshy__site-overlay--active';

    this.$body = $('body');
    this.$siteOverlay = $(this.siteOverlayTarget, this.$body);
    this.$context = $(this.contextTarget);
    this.$canvas = $(this.canvasTarget, this.$context);
    this.$menu = $(this.menuTarget, this.$context);
    this.$menuBtn = $(this.menuButtonTarget, this.$context);
    this.$menuItems = $(this.menuItemsTarget, this.$context);

    if (!this.$siteOverlay.length) {
      // automatically add overlay if not found
      this.$body.prepend('<div data-pussshy-generated class="' + this.siteOverlayTarget.substr(1) + '"></div>');
      this.$siteOverlay = $(this.siteOverlayTarget, this.$body);
    }

    // style menu items;
    this.$menuItems.addClass(this.menuItemsClass);
    this.$siteOverlay.addClass(this.siteOverlayClass);
    this.$canvas.addClass(this.canvasClass);

    // depending on the direction, apply classes on targets
    if (this.direction === 'right') {
      this.$menu.addClass(this.rightMenuClass);
      this.$menu.addClass(this.rightMenuCloseClass); // default close
      this.$menuBtn.addClass(this.rightMenuButtonClass);

    } else {
      // default: left
      this.$menu.addClass(this.leftMenuClass);
      this.$menu.addClass(this.leftMenuCloseClass); // default close
      this.$menuBtn.addClass(this.leftMenuButtonClass);
    }

    this.menuSpeed = 200; //jQuery fallback menu speed
    this.menuWidth = this.$menu.width() + 'px'; //jQuery fallback menu width
    this.menuState = 'closed'; //jQuery fallback menu state

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

      if (this.direction === 'right') {
        // default: left
        this.$menu.css({right: '-' + this.menuWidth, opacity: 1}); //hide menu by default
        this.$canvas.css({'overflow-x': 'hidden'}); //fixes IE scrollbar issue

      } else {
        // default: left
        this.$menu.css({left: '-' + this.menuWidth, opacity: 1}); //hide menu by default
        this.$canvas.css({'overflow-x': 'hidden'}); //fixes IE scrollbar issue
      }

    }
  }

  function togglePushy() {
    this.$body.toggleClass(this.siteOverlayActiveClass); //toggle site overlay

    if (this.direction === 'right') {
      this.$menu.toggleClass(this.rightMenuOpenClass);
      this.$menu.toggleClass(this.rightMenuCloseClass);
      this.$canvas.toggleClass(this.canvasPushRightClass);
    } else {
      this.$menu.toggleClass(this.leftMenuOpenClass);
      this.$menu.toggleClass(this.leftMenuCloseClass);
      this.$canvas.toggleClass(this.canvasPushLeftClass);
    }
  }

  function openPushyFallback() {
    this.$body.addClass(this.siteOverlayActiveClass);
    if (this.direction === 'right') {
      this.$menu.animate({right: '0px' }, this.menuSpeed);
      this.$canvas.animate({right: this.menuWidth}, this.menuSpeed);
    } else {
      this.$menu.animate({left: '0px' }, this.menuSpeed);
      this.$canvas.animate({left: this.menuWidth}, this.menuSpeed);
    }

  }

  function closePushyFallback() {
    this.$body.removeClass(this.siteOverlayActiveClass);
    if (this.direction === 'right') {
      this.$menu.animate({right: '-' + this.menuWidth}, this.menuSpeed);
      this.$canvas.animate({right: '0px'}, this.menuSpeed);
    } else {
      this.$menu.animate({left: '-' + this.menuWidth}, this.menuSpeed);
      this.$canvas.animate({left: '0px'}, this.menuSpeed);
    }
  }

  Pussshy.prototype.toggle = function toggle() {

    if (cssTransforms3d) {
      togglePushy.call(this);
    } else {
      //jQuery fallback
      if (this.menuState === 'closed') {
        this.menuState = 'opened';
        openPushyFallback.call(this);
      } else {
        this.menuState = 'closed';
        closePushyFallback.call(this);
      }
    }
  };

  return Pussshy;

})();

// export Pussshy to window global
if (typeof window !== 'undefined') { window.Pussshy = Pussshy; }

// export Pussshy for nodejs / browserify
if (typeof module !== 'undefined') { module.exports = Pussshy; }