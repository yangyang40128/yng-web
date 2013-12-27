// 根据trigger的data-modal找到modal
;(function(window){
	function Modal ( elem ,options ) {
		this.ModalTrigger = elem;
		this.options = options;
		this._init();
	}
	Modal.prototype = {
		_init :function () {
			this.modalId = this.ModalTrigger.getAttribute("data-modal");
			this.Modal = document.getElementById(this.modalId);
			this.close = this.Modal.querySelector(".md-close");
			this._config();
			this._initEvent();
		},
		_config: function () {
			// create overlay;
			this.overlay = document.querySelector(".md-overlay");
			if ( !this.overlay ) {
				this.overlay = document.createElement("div");
				classie.add(this.overlay,"md-overlay");
				document.body.appendChild(this.overlay);
			}
		},
		_initEvent: function() {
			var self = this;
			this.ModalTrigger.onclick = function ( ev ) {
				self._openModal();
			}
			this.overlay.onclick = function ( ev ) {
				self._closeModal();

			}
			this.close.onclick = function ( ev ) {
				self._closeModal();
			}

		},
		_openModal : function () {
			classie.add(this.Modal,"open");
			classie.add(this.overlay,"show");
		},
		_closeModal :function () {
			classie.remove(this.Modal,"open");
			classie.remove(this.overlay,"show");
		}
	}
	window.Modal = Modal;
})(window);
onDomReady(function(){
	Array.prototype.slice.call(document.querySelectorAll(".md-trigger")).forEach(function(elem,index,array){
		new Modal(elem);
	})
})