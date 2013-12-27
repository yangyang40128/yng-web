;(function (window) {
	function Slider ( elem ,options ) {
		this.slider = elem;
		this.options = options;
		this._init();
	}
	Slider.prototype = {
		_init: function () {
			// cache sliderItem;
			this.sliderItem = this.slider.querySelectorAll(".n-slider-item");
			// cache animEndNames;
			this.animEndEventNames = {
				.....
			}
			// get current browser support animEndEventName;
			this.animEndEventName = this.animEndEventNames[Modernizr.prefixed("animation")];
			// get browser support csstransition , csstransform;
			this.support = Modernizr.csstransform && Modernizr.csstransition;
			// cache current / old sliderItem;
			this.oldItem = this.currentItem = 0;
			// create dot nav ,prev / next nav;
			this._config();
			// event handle;
			this._initEvent();
		},
		_config : function () {
			// create prev / next nav;
			// create dot nav;
		},
		_initEvent : function () {
			// prev click ;
			this.prev.addEventLister("click",function ( ev ) {
				self.oldItem = self.currentItem;
				self.currentItem = self.currentItem + 1;
				self._slide();
			},false);
			// next click;
			this.next.addEventLister("click",function( ev ){
				self.oldItem = self.currentItem;
				self.currentItem = self.currentItem - 1;
				self._slide();
			},false);
			// dot nav click;
		},
		_slide : function () {
			// toggle dot nav style;
			this._toggleNav();
			// get slide direction;
			var dir = this.currentItem > this.oldItem : "right" ? "left",
				toClass = dir == "right" : "sl-moveToLeft" ? "sl-moveToRight",
				fromClass = dir == "right" : "sl-moveFromRight" ? "sl-moveFromLeft";
			// get last enter / out elem ;
			var length = this.sliderItem[this.oldItem].childNodes.length;
			var lastElem = dir == "right" : this.sliderItem[this.oldItem].childNodes[length - 1] ? this.sliderItem[this.oldItem].childNodes[0];
			var self = this;
			if ( this.support ) {
				// add animation to oldItem ;
				classie.empty(this.sliderItem[this.oldItem],toClass);
				// set animation to currentItem after oldItem elem animation end;
				// set time up to length*90 ms;
				setTimeout(function(){

					// time up ,add animation to currentItem;
					classie.empty(self.sliderItem[self.currentItem],fromClass);
					
					// fix chrome bug;
					
				},length*90);
				lastElem.addEventLister(this.animEndEventName,function ( ev ) {
					classie.empty(self.sliderItem[self.currentItem],self.fromClass);
				},false);

			}
			else {

			}
		},
		_toggleNav: function () {
			// change current dot style
		}
	}
})(window);