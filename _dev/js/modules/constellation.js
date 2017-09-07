'use strict';

const $ = require('jquery');

class Constellation {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('.constellation-header').length ) {
			this.intro();
        } else {
            return;
        }
	}

	intro() {
		$(document).ready(function(){
            animateDiv();
        });

        function makeNewPosition(){
            // Get viewport dimensions (remove the dimension of the div)
            var h = $('.constellation-header').height() - 50,
            	w = $('.constellation-header').width() - 50,
            	nh = Math.floor(Math.random() * h),
            	nw = Math.floor(Math.random() * w);
            return [nh,nw];
        }

        function animateDiv(){
            var newq = makeNewPosition(),
            	oldq = $('.light').offset(),
            	speed = calcSpeed([oldq.top, oldq.left], newq);

            $('.light').animate({ top: newq[0], left: newq[1] }, speed, function(){
              animateDiv();
            });
        };

        function calcSpeed(prev, next) {

            var x = Math.abs(prev[1] - next[1]),
            	y = Math.abs(prev[0] - next[0]),
            	greatest = x > y ? x : y,
            	speedModifier = 0.075,
            	speed = Math.ceil(greatest/speedModifier);

            return speed;

        }
	}

}

module.exports = Constellation;
