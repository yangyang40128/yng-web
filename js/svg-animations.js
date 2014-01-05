(function () {
	'use strict';
	var docElem = window.document.documentElement;
	// animation function ;
	// use setTimeout as fallback;
	window.requestAnimationFrame = function (){
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAninmationFrame || 
			window.oRequestAnimationFrame ||
			window.msRequestAninmationFrame ||
			function ( callback ) {
				window.setTimeout( callback , 1000/60 );
			}
		);
	}();
	window.cancelAnimationFrame = function () {
		return (
				window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimation ||
				window.oCancelAnimation ||
				window.msCancelAnimation || 
				function ( id ) {
					window.clearTimeout( id );
				}
			);
	}();
	// svg ;
	function SVG ( elem ,options ) {
		this.svg = elem;
		this.options = options;
		this._init();
	}
	SVG.prototype = {
		_init : function () {
			// cashed svg path;
			this._initEvent();
		},
		_initEvent : function () {

		},
		
	}
})();