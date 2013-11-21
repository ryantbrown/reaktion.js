/**
 * Reaktion JS
 * Version: 1.0
 * URL: http://reaktionjs.com
 * Description: A lightweight responsive navigation plugin
 * Author: Ryan Brown (http://weareloring.com)
 * Copyright: © 2013 Loring, Inc.
 * License: MIT
 */

;(function($, document, window, undefined) {

    var defaults = {
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
        subNavSpeed: 300
    };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;

        this._init();
    }

    Plugin.prototype = {

        _init: function() {

            var target = $(this.element),
                reaktion = this,
                nav = $(this.element).find('ul:first');
 
            target.append('<div class="nav-bars">'+this.options.navIcon+'</div>');            

            $('.nav-bars').click(function() {
                nav.is(':visible') ? reaktion.close() : reaktion.open();
            });

            if(this.options.arrows) {
                target.find('ul > li').not('ul > li > ul li').has('ul')
                      .prepend('<span class="arrow">'+this.options.arrowIcon+'</span>');
                nav.on('click', 'span.arrow', function() {
                    reaktion._toggleSubNav($(this));
                });
            } else {
                target.find('ul > li').not('ul > li > ul li').has('ul')
                      .prepend('<span class="arrow" style="padding:0;"></span>');
            }

            if(!this.options.arrows || !this.options.arrowsToggleOnly) {
                target.find('ul > li').not('ul > li > ul li').has('ul').find('a').on('click', function(){
                    reaktion._toggleSubNav($(this));
                });
            }

            reaktion._resize();

            $(window).resize(function(){
                reaktion._resize();
            });
        },

        _resize: function() {
            var nav = $(this.element);

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

        open: function() {
            var nav = $(this.element).find('ul:first');

            if(this.options.animate) {
                this.options.effect == 'slide' ?
                    nav.slideDown(this.options.speed) :
                    nav.fadeIn(this.options.speed);
            } else {
                nav.show();
            }
        },

        close: function() {
            var nav = $(this.element).find('ul:first');

            if(this.options.animate) {
               this.options.effect == 'slide' ?
                    nav.slideUp(this.options.speed) :
                    nav.fadeOut(this.options.speed);
            } else {
                nav.hide();
            }
        },

        _toggleSubNav: function(arrow) {
            if($('.nav-bars').is(':visible')) {
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
        }
    };

    $.fn['reaktion'] = function(args) {
        if(!$.data(this, 'reaktion')) {
            $.data(this, 'reaktion', new Plugin(this, args));
        }

        var instance = $.data(this, 'reaktion');

        if(typeof args === 'undefined' || typeof args === 'object') {
            if (typeof instance['init'] === 'function') {
                instance.init(args);
            }
        } else if(typeof args === 'string' && args.indexOf('_') != 0 && typeof instance[args] === 'function') {
            return instance[args].apply(instance, Array.prototype.slice.call(arguments, 1));
        } else if(args.indexOf('_') == 0) {
            $.error('The ' + args + ' method is private and cannot be called publicly');
        } else {
            $.error('Method ' + args + ' does not exist in reaktion');
        }
    };

})(jQuery, document, window);