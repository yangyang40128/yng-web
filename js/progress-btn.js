;(function(window){
	'use strict';
	Modernizr.addTest('csstransformspreserve3d',function(){
		var prop = Modernizr.prefixed('transformStyle');
		var val = 'preserve-3d';

		if ( !prop ) return false;
		// change WebkitTransformStyle to -webkit-transform-style
		prop = prop.replace(/[A-Z]/g,function(str,m1){
			return '-'+str.toLowerCase();
		}).replace(/^ms-/,'-ms-');

		Modernizr.testStyles('#modernizr{'+prop+':'+val+';}',function( el,rule){
			computedStyle = window.getComputedStyle ? getComputedStyle(el,null).getPropertyValue(prop):'';
		});
		return (computedStyle === val);
	});
	// helper extend
	function extend ( a,b ) {
		for ( var key in b ) {
			if ( b.hasOwnProperty( key ) && !a.hasOwnProperty( key )) {
				a[key] = b [key];
			}
		}
		return a;
	}
	// get support for transition ,transition end event
	var support = {transitions:Modernizr.csstransitions,transform3d: Modernizr.csstransforms3d && csstransformspreserve3d},
		transEndEventNames = {
			'WebkitTransition':'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition': 'MSTransitionEnd',
			'transition':'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

	// progress
	function ProgressButton ( elem ,options ) {
		this.button = elem;
		this.options = extend({},this.options);
		extend(this.options,options);
		this._init();

	}
	ProgressButton.prototype = {
		// default options
		options : {
			statusTime: 1500
		},
		_init : function () {
			this._validate();
			// create structure;
			// init event;
		},
		_validate : function () {
			if ( this.button.getAttribute('data-style') === null ) {
				this.button.setAttribute('data-style','fill');
			}
			if ( this.button.getAttribute('data-vertical') === null && this.button.getAttribute('data-hoziontal') === null ) {
				this.button.setAttribute( 'data-horizontal', '' );
			}
			if ( !support.transform3d && this.button.getAttribute( 'data-perspective' ) !== null ) {
				this.button.removeAttribute( 'data-perspective' );
                this.button.setAttribute( 'data-style', 'fill' );
                this.button.removeAttribute( 'data-vertical' );
                this.button.setAttribute( 'data-horizontal', '' );
			}
		},
		_create : function () {
			
		}
	}
})(window);