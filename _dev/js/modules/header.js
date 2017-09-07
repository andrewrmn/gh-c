'use strict';

const $ = require('jquery');

class Header {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('.site-header').length ) {
			this.events();
			this.sections();
        } else {
            return;
        }
	}

	events() {
		var header = $('.site-header'),
			w = $(window),
			lastScrollTop = 0;

		function headerSize() {
			var st = w.scrollTop();

			if ( w.scrollTop() >= 180 ){
				header.addClass('is-scrolling-down');
			} else {
				header.removeClass('is-scrolling-down');
			}

			lastScrollTop = st;
        }

        w.on("load resize scroll",function(e){
			headerSize();
        });

		$(document).ready(function() {
			var burger = $('.mobile-menu-trigger'),
				mask = $('.screen');

			$('.mobile-menu-trigger, .screen').click(function(){
				if($(this).hasClass('is-active')) {
				  	burger.removeClass('is-active');
					mask.fadeOut(300);
				    $('body').removeClass('menu-is-active');
				  } else {
				  	mask.fadeIn(300);
					burger.addClass('is-active');
				    $('body').addClass('menu-is-active');
				  }
			});

            $('.site-navigation-list a').click(function(event){
                $('.site-navigation-list li').removeClass('is-active');
                event.preventDefault();
                var target = $(this).attr('href'),
                    parent = $(this).parents('li');
                    target = $(target);
                parent.addClass('is-active');
				$('.mobile-menu-trigger').removeClass('is-active');
				$('.screen').fadeOut(300);
				$('body').removeClass('menu-is-active');

                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            });
        });
	}

	sections() {
		var section = $('.page-section'),
            w = $(window);

        section.each(function(){
            var topPos = $(this).offset().top - 100,
                bottomPos = $(this).offset().top + $(this).innerHeight(),
                el = $(this),
                elId = '#' + $(this).attr('ID'),
                navLinks = $('.site-navigation a'),
                nav = $('.site-navigation li');

                function checkSection() {
                    if ( w.scrollTop() >= topPos && w.scrollTop() < (bottomPos - 100) ){
                        if( !el.hasClass('active-section') ){
                            el.addClass('active-section');
                            navLinks.each(function(){
                                if( $(this).attr('href') == elId ) {
                                    nav.removeClass('is-active');
                                    $(this).parent().addClass('is-active');
                                }
                            });

                        }
                    } else {
                        if( el.hasClass('active-section') ){
                            el.removeClass('active-section');
                        }
                    }
                }

            w.scroll(function() {
                checkSection();
            });

            $(document).ready(function() {
                checkSection();
            });

        });
	}

}

module.exports = Header;
