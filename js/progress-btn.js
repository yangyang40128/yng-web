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
			stateTime: 1500
		},
		_init : function () {
			this._validate();
			// create structure;
			this._create();
			// init event;
			this._initEvent();
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
			
		},
		_initEvent : function () {
			var self = this;

			this.button.addEventListener('click',function(){
				// disable button;
				self.button.setAttribute('disabled','');
				// addd class state-loading to button;
				classie.remove( self.progress, 'notransition' );
				classie.add(self,'state-loading');
				// progress button;
				setTimeout( function () {
					if ( typeof self.options.callback === 'function') {
						self.options.callback(self);
					}
					else {
						self._setProgress( 1 );
						// transition end handler
						var onEndTransFn = function ( ev ) {
							if ( support.transitions && ev.propertyName !== self.progressProp) {
								return
							}
							this.removeEventListener( transEndEventName , onEndTransFn );
							self._stop();
						}
						if ( support.transitions ) {
							self.progress.addEventListener( transEndEventName , onEndTransFn );
						}
						else {
							onEndTransFn.call();
						}
					}
				},
				self.button.getAttribute('data-style') === 'fill' ||
				self.button.getAttribute('data-style') === 'top-line' ||
				self.button.getAttribute('data-style') === 'lateral-lines' ? 0 : 200);
			},false);
		},
		_stop : function () {
			var self = this;
			setTimeout ( function () {
				self.progress.style.opacity = 0;
				var onEndTransFn = function ( ev ) {
					if ( support.transitions && ev.propertyName !== 'opacity') {
						return;
					}
					this.removeEventListener( transEndEventName ,onEndTransFn);
					classie.add( self.progress , 'notranstion');
					self.progress.style[self.progressProp] = '0%';
					self.progress.style.opacity = 1;
				};
				if ( support.transitions ) {
					self.progress.addEventListener( transEndEventName ,onEndTransFn);
				}
				else {
					onEndTransFn.call();
				}
				if ( typeof state === 'number') {
					var stateClass = state >= 0 ? 'state-sucess' : 'state-error';
					classie.add(self.button,stateClass);
					setTimeout ( function {
						classie.remove(self.button, stateClass);
						self._enable();
					},self.options.stateTime );
				}
				else {
					self._enable();
				}
				classie.remove(self.button,'state-loading')
			},100);
		},
		_enable : function () {
			this.button.removeAttribute('disabled');
		}
	}
	window.ProgressButton = ProgressButton;
})(window);