'use strict';

const $ = require('jquery');

class ScrollTo {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('*[data-scroll-to]').length ) {
			this.setup();
			this.events();
        } else {
            return;
        }
	}

	setup() {
		//any general setup code (ex. getting window width) can go here.
		// console.log('Scroll To functions intialized');
	}

	events() {

		$('*[data-scroll-to]').on('click touchstart:not(touchmove)', function(e) {
			e.preventDefault();

            var trigger = $(this).attr('data-scroll-to'),
                target = $("#" + trigger),
                ss = 1000, //scroll speed
                o = 0; // offset

            if( $(this).attr('data-scroll-speed') ) {
                ss = $(this).attr('data-scroll-speed');
            }

            if( $(this).attr('data-scroll-offset') ) {
                o = $(this).attr('data-scroll-offset');
            }

            $('html, body').animate({
                scrollTop: target.offset().top - o
            }, ss);
        });

	}

}

module.exports = ScrollTo;
