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
				'WebkitAnimation' : 'webkitAnimationEnd',
		        'OAnimation' : 'oAnimationEnd',
		        'msAnimation' : 'MSAnimationEnd',
		        'animation' : 'animationend'
			}
			// get current browser support animEndEventName;
			this.animEndEventName = this.animEndEventNames[Modernizr.prefixed("animation")];
			// get browser support csstransition , csstransform;
			this.support = Modernizr.csstransforms && Modernizr.cssanimations;
			// cache current / old sliderItem;
			this.oldItem = this.currentItem = 0;
			// create dot nav ,prev / next nav;
			this._config();
			// event handle;
			this._initEvent();
		},
		_config : function () {
			// create prev / next nav;
			var div = document.createElement("div");
			
			this.prev = document.createElement("a");
			this.next = document.createElement("a");
			this.prev.href = this.next.href = "#";
			this.prev.innerHTML = "prev";
			this.next.innerHTML = "next";
			div.style.cssText = "position:absolute;"
			div.appendChild(this.prev);
			div.appendChild(this.next);
			this.slider.appendChild(div);
			// create dot nav;
			
			this.dotNav = document.createElement("div");
			this.dotNav.style.cssText = "position:absolute;left:300px;";
			for (var i = 0; i< this.sliderItem.length ;i++) {
				var a = document.createElement("a");
				a.href = "#";
				a.innerHTML = i+1;
				this.dotNav.appendChild(a);
			}
			this.slider.appendChild(this.dotNav);
		},
		_initEvent : function () {
			var self = this;
			// prev click ;
			this.prev.addEventListener("click",function ( ev ) {
				self.oldItem = self.currentItem;
				self.currentItem = self.currentItem - 1;
				if ( self.currentItem < 0) {
					self.currentItem = 0;
				}
				self._slide();
			},false);
			// next click;
			this.next.addEventListener("click",function( ev ){
				self.oldItem = self.currentItem;
				self.currentItem = self.currentItem + 1;
				if ( self.currentItem > self.sliderItem.length -1) {
					self.currentItem = self.sliderItem.length - 1;
				}
				self._slide();
			},false);
			// dot nav click;
			Array.prototype.slice.call(this.dotNav.querySelectorAll("a")).forEach(function (elem,index,array){
				elem.onclick = function ( ev ) {
					self.oldItem = self.currentItem;
					self.currentItem = index;
					self._slide();
				}
			});
		},
		_slide : function () {
			// toggle dot nav style;
			this._toggleNav();
			// get slide direction;
			var dir = this.currentItem > this.oldItem ? "right" : "left",
				toClass = dir == "right" ? "sl-moveToLeft" : "sl-moveToRight",
				fromClass = dir == "right" ? "sl-moveFromRight" : "sl-moveFromLeft";
			// get last enter to justify whether anmiation is end ;
			var length = this.sliderItem[this.oldItem].childNodes.length;
			var lastElem = dir == "right" ? this.sliderItem[this.currentItem].childNodes[length - 1] : this.sliderItem[this.currentItem].childNodes[0];
			var self = this;
			if ( this.support ) {
				// add animation to oldItem ;
				classie.empty(this.sliderItem[this.oldItem],"slider-item "+toClass);
				// set animation to currentItem after oldItem elem animation end;
				// set time up to length*90 ms;
				setTimeout(function(){

					// times up ,add animation to currentItem;
					classie.empty(self.sliderItem[self.currentItem],"slider-item " + fromClass);
					// set animation end;
					lastElem.addEventListener(this.animEndEventName,function ( ev ){

						// remove listener;
						this.removeEventListener(self.animEndEventName);
						// fix chrome bug;
						
						self.isAnimating = false;
					},false);
					
					
				},length*90);
				lastElem.addEventListener(this.animEndEventName,function ( ev ) {
					classie.empty(self.sliderItem[self.currentItem],self.fromClass);
				},false);

			}
			else {

			}
		},
		_toggleNav: function () {
			// change current dot style;
		}
	}
	window.SliderController = Slider;
})(window);
onDomReady(function (){
	new SliderController(document.querySelector(".slider"))
})