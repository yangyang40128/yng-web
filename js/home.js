;(function(window){
	function Slider ( elem ,options) {
		this.sliderController = elem;
		this.options = options;
		this._init();
	}
	Slider.prototype = {
		_init : function () {
			var check = (this.slider = this.sliderController.querySelector("."+this.options.slider)) && (this.sliderItem = this.slider.querySelectorAll("."+this.options.sliderItem)) && (this.sliderFullNav = this.sliderController.querySelectorAll("."+this.options.sliderFullNav));

			if ( check ) {
				this.itemCount = this.sliderItem.length;
				this._config();
			}
		},
		_initEvent : function () {
			var self = this;
			this.old = this.current = 0;
			// next click;
			this.next.onclick = function ( ev ) {
				// chang current and old;
				self.old = self.current;
				self.current = self.current + 1;
				// slide slider;
				self._slide();
			}
			// prev click;
			this.prev.onclick = function ( ev ) {
				// change current and old;
				self.old = self.current;
				self.current = self.current - 1;
				// slide slider;
				self._slide();
			}
			// full nav click;
			Array.prototype.slice.call(this.sliderFullNav).forEach(function(elem,index,array){
				elem.onclick = function ( ev ) {
					self.old = self.current;
					self.current = index;
					console.log(index);
					self._jump();
				}
			});
		},
		_config:function () {
			// parse nav;
			this._parseNav();
			// initEvent;
			this._initEvent();
		},
		_slide:function () {
			// toggle nav ;
			this._toggleNav();
			// slide slider;
			var translate = -1*this.current*100/this.itemCount;

			this.slider.style.cssText = "-webkit-transform:translate("+translate+"%)";
		},
		_jump : function () {
			console.log(this.current+"jump");
			this._toggleNav();
			this._slide();
		},
		_parseNav: function () {

			if ( this.itemCount > 0 ) {

				var nav = document.createElement("div");
				this.next = document.createElement("a");
				this.prev = document.createElement("a");
				this.next.href = this.prev.href = "#";

				this.prev.innerHTML = "&lt;";
				this.next.innerHTML = "&gt;";
				classie.add(this.prev,"slider-left");
				classie.add(this.next,"slider-right");


				this.prev.style.cssText = "display:none";

				nav.appendChild(this.next);
				nav.appendChild(this.prev);
				classie.add(nav,"slider-nav");
				this.sliderController.appendChild(nav);
			}
		},
		_toggleNav:function () {
			// show or hide the nav
			console.log(this.itemCount);
			switch ( this.current ) {
				case 0: 
					this.prev.style.cssText = "display:none;";
					this.next.style.cssText = "display:block;";
					break;
				case this.itemCount - 1:
					this.next.style.cssText = "display:none";
					this.prev.style.cssText = "display:block;";
					break;
				default:
					this.prev.style.cssText = "display:block;";
					this.next.style.cssText = "display:block";
			}
			// active home -nav;
			classie.remove(this.sliderFullNav[this.old],"active");
			classie.add(this.sliderFullNav[this.current],"active");
		}
	}
	window.Slider = Slider;
})(window);
onDomReady(function(){
	new Slider (document.querySelector(".slider-controller"),{
		"slider" : "slider",
		"sliderItem" : "slider-item",
		"sliderFullNav" : "slider-full-nav li"
	});
});