'use strict';

const $ = require('jquery');

class App {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		App.Features = App.Features || {};
		this.userAgent = navigator.userAgent.toLowerCase();
        this.$html = $('html');
		this.setup();
		this.noTouch();
		this.isTouch();
		this.isNewIE();
        this.isIE();
	}

	setup() {
		//any general setup code (ex. getting window width) can go here.
		// console.log('App functions working');
		$(document).ready(function() {
			$('body').addClass('page-loaded');

			// Bg Image fallback
			if( $('.isIE .bg-image, .isEDGE .bg-image').length ){
				var img = $('.bg-image img');
				img.each(function(){
					var src = $(this).prop('src'),
						wrap = $(this).parents('.bg-image');
					wrap
                        .css('background', 'url(' + src + ') center / cover no-repeat')
                        .addClass('bg-image--fallback');
				});
			}

			if($('[data-theme-color]').length) {
				var color = $('[data-theme-color]').attr('data-theme-color'),
					colorClass = "event-theme--" + color;
				$('body').addClass(colorClass);
			}
		});
	}

	noTouch() {
		if ( ! ('ontouchstart' in window) ) {
            App.Features.noTouch = false;
            this.$html.addClass('noTouch');
            return;
        }
        App.Features.noTouch = false;
	}

	isTouch() {
		if ( 'ontouchstart' in window ) {
            App.Features.isTouch = false;
            this.$html.addClass('isTouch');
            return;
        }
        App.Features.isTouch = false;
	}

	isNewIE() {
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            if(navigator.appVersion.indexOf('Trident') === -1) {
                this.$html.addClass('isEDGE');
            } else {
                this.$html.addClass('isIE isIE11');
            }
            return;
        }
        App.Features.isNewIE = false;
	}

	isIE() {
        if( navigator.appVersion.indexOf('MSIE') !== -1 ) {
            this.$html.addClass('isIE');
            App.Features.isIE = true;
            return;
        }
        App.Features.isIE = false;
    }

}

module.exports = App;
