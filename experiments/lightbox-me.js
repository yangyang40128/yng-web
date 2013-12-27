(function(window){
	function LightBox(options) {
		this.init(options);
	}
	LightBox.prototype = {
		init:function(options) {

			this.opts = extend({},this.defaults,options);
			this.iframe = document.createElement("iframe");
			var ie6 = ...;
			this.config();
		},
		config:function() {

			if ( this.opts.showOverlay ) {
				// check if there is exit overlay
				var this.currentOverlays = document.querySelector(".js-lb-overlay:visible");
				if (this.currentOverlays.length > 0 ) {

					this.overlay = document.createElement("div");
					classie.add(this.overlay,"lb-overlay-clear js-lb-overlay");
				}
				else {
					this.overlay = document.createElement("div");
					var tempClass = this.opts.classPrefix+"-overlay js-lb-overlay";
					classie.add(this.overlay,tempClass);
				}
			}
			document.body.appendChild(this.overlay);
			// set css;

			if ( opts.showOverlay ) {
				setOverlayHeight();
				this.overlay.style.cssText = "position:absolute;width:100%;right:0;left:0;top:0;bottom:0";
				if ( !classie.has(this.overlay,"lb-overlay-clear")) {
					classie.add(this.overlay,"lb-overlay-clear");
				}
			}
		}
	}
});