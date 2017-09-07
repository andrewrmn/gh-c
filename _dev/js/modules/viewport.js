'use strict';

const $ = require('jquery');

class Viewport {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		this.events();
	}

	events() {

		$.fn.isOnScreen = function(){
			var elementTop = $(this).offset().top,
				elementBottom = elementTop + $(this).outerHeight(),
				viewportTop = $(window).scrollTop(),
				viewportBottom = viewportTop + $(window).height();
			return elementBottom > viewportTop && elementTop < viewportBottom;
		};

		function detection() {
			for(var i = 0; i < items.length; i++) {
				var el = $( items[i] );

				console.log('scroll detect');
				if( el.isOnScreen() ){
					el.addClass('in-view');
				} else {
					el.removeClass('in-view');
				}
			}
		}

		var items = document.querySelectorAll('*[data-animate-in], *[data-detect-viewport]'),
            waiting = false;

		$(window).on("resize scroll", function(){
			if (waiting) {
		        return;
		    }
			waiting = true;
			detection();

			setTimeout(function () {
		        waiting = false;
		    }, 100);
		});

		$(document).ready(function(){
            setTimeout(function(){
                detection();
            }, 500);

			for(var i = 0; i < items.length; i++) {
				var d = 0,
					el = $( items[i] );
				if( items[i].getAttribute('data-animate-in-delay') ) {
					d = items[i].getAttribute('data-animate-in-delay') / 1000 + 's';
				} else {
					d = 0;
				}
				el.css('transition-delay', d);
			}
		});

	}

}

module.exports = Viewport;
