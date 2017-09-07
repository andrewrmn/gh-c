'use strict';

const $ = require('jquery');
const App = require('./modules/app.js');
const Viewport = require('./modules/viewport.js');
const Header = require('./modules/header.js');
const ClickFunctions = require('./modules/clickFunction.js');
const ScrollTo = require('./modules/scrollTo.js');
const Constellation = require('./modules/constellation.js');

$(function(){
	//create the app.
	let app = new App();
	let header = new Header();
	let viewport = new Viewport();
	let clickFunctions = new ClickFunctions();
	let scrollTo = new ScrollTo();
	let constellation = new Constellation();

});
