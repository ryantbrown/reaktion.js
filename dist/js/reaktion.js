/**
 * Reaktion.js
 * Version: 1.0
 * URL: https://github.com/ryantbrown/reaktion.js
 * Description: A lightweight responsive, nested navigation plugin for jQuery
 * Author: Ryan Brown (http://me@ryantbrown.io) (http://ryantbrown.io)
 * Demo URL: http://ryantbrown.io/code/reaktionjs
 * License: MIT
 */

;(function($, document, window, undefined) {

    var reaktion, nav, menu, defaults = {
        mobileOnly: false,
        breakPoint: 768,
        navIcon: '<i class="fa fa-bars"></i>',
        arrows: true,
        arrowIcon: '<i class="fa fa-chevron-down"></i>',
        arrowsToggleOnly: true,
        animate: true,
        effect: 'slide',
        speed: 300,
        animateSubNav: true,
        subNavEffect: 'slide',
        subNavSpeed: 300,
        onOpen: function(){},
        onClose: function(){}
    };

    function Reaktion(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;

        this._init();
    }

    Reaktion.prototype = {

        _init: function() {

            nav = $(this.element);
            reaktion = this;
            menu = $(this.element).find('ul:first');


            if (this.options.mobileOnly) {
                nav.addClass('mobile').addClass('mobile-only');
            } else {
                nav.append('<div class="nav-bars">'+this.options.navIcon+'</div>');
                $('.nav-bars').click(function() {
                    menu.is(':visible') ? reaktion.close() : reaktion.open();
                });
            }

            if(this.options.arrows) {
                nav.find('ul > li').not('ul > li > ul li').has('ul')
                      .prepend('<span class="arrow">'+this.options.arrowIcon+'</span>');
                menu.on('click', 'span.arrow', function() {
                    reaktion._toggleSubNav($(this));
                });
            } else {
                nav.find('ul > li').not('ul > li > ul li').has('ul')
                      .prepend('<span class="arrow" style="padding:0;"></span>');
            }

            if(!this.options.arrows || !this.options.arrowsToggleOnly) {
                nav.find('ul > li').not('ul > li > ul li').has('ul').find('a').on('click', function(){
                    reaktion._toggleSubNav($(this));
                });
            }


            /**
             * Resize functionality, really only worth it if we actually
             * care about responsiveness.
             */
            if (!this.options.mobileOnly) {
                reaktion._resize();

                $(window).resize(function(){
                    reaktion._resize();
                });
            }

        },

        _resize: function() {
            if($(window).width() > this.options.breakPoint) {
                nav.removeClass('mobile');
                nav.find('ul:first').show().find('.arrow').removeClass('arrow-rotate')
                .parent().find('ul').hide();

                nav.find('ul:first > li').hover(function() {
                    if(!nav.hasClass('mobile')) {
                        $(this).find('ul').show();
                    }
                }, function(){
                    if(!nav.hasClass('mobile')) {
                        $(this).find('ul').hide();
                    }
                });

            } else {
                if(!$(this.element).hasClass('mobile')) {
                    $(this.element).addClass('mobile');
                }
                $(this.element).unbind('mouseenter mouseleave');
            }
        },

        _toggleSubNav: function(arrow) {
            if($('.nav-bars').is(':visible') || this.options.mobileOnly) {
                if(this.options.animateSubNav) {
                    this.options.subNavEffect == 'slide' ?
                        arrow.siblings('ul').slideToggle(this.options.subNavSpeed) :
                        arrow.siblings('ul').fadeToggle(this.options.subNavSpeed);
                } else {
                    arrow.siblings('ul').toggle();
                }
                if(this.options.arrows) {
                    arrow.toggleClass('arrow-rotate');
                }
            }
        },

        open: function() {
            if(!menu.is(':visible')) {
                if(this.options.animate) {
                    this.options.effect == 'slide' ?
                        menu.slideDown(this.options.speed, function(){
                            if(typeof reaktion.options.onOpen === 'function'){
                                reaktion.options.onOpen.call(this);
                            }
                        }) :
                        menu.fadeIn(this.options.speed, function(){
                           if(typeof reaktion.options.onOpen === 'function'){
                                reaktion.options.onOpen.call(this);
                            }
                        });
                } else {
                    menu.show(function(){
                        if(typeof reaktion.options.onOpen === 'function'){
                            reaktion.options.onOpen.call(this);
                        }
                    });
                }
            }
        },

        close: function() {
            if(menu.is(':visible')) {
                if(this.options.animate) {
                   this.options.effect == 'slide' ?
                        menu.slideUp(this.options.speed, function(){
                            if(typeof reaktion.options.onClose === 'function'){
                                reaktion.options.onClose.call(this);
                            }
                        }) :
                        menu.fadeOut(this.options.speed, function(){
                            if(typeof reaktion.options.onClose === 'function'){
                                reaktion.options.onClose.call(this);
                            }
                        });
                } else {
                    menu.hide(function(){
                        if(typeof reaktion.options.onClose === 'function'){
                            reaktion.options.onClose.call(this);
                        }
                    });
                }
            }
        },

        toggle: function(){
            menu.is(':visible') ? this.close() : this.open();
        }

    };

    $.fn['reaktion'] = function(args) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data('reaktion');

        if(instance && instance[args]  && args.indexOf('_') != 0 && typeof instance[args] === 'function') {
            return instance[args].apply(instance, Array.prototype.slice.call(arguments, 1));
        } else if(typeof args === 'object' || !args) {
            instance = new Reaktion($(this), args);
            $(this).data('reaktion', instance);
            return this;
        } else if(args.indexOf('_') == 0) {
            $.error('The ' + args + ' method is private and cannot be called publicly');
        } else {
            $.error('Method ' + args + ' does not exist in reaktion');
        }
    };

})(jQuery, document, window);