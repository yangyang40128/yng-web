var ModalEffects = (function(){
	function init() {
		var overlay = document.querySelector(".md-overlay");
		[].slice.call(document.querySelectorAll(".md-trigger")).forEach(function(elem,index,array){
			var modal = document.querySelector("#"+elem.getAttribute("data-modal")),
				close = modal.querySelector(".md-close");

			function removeModal (hasPerspective) {
				classie.remove(modal , "md-show");
				if (hasPerspective) {
					classie.remove(document.documentElement,"md-perspective");
				}
			}
			function removeModalHandler () {
				removeModal(classie.has(elem,"md-setperspective"));
			}
			elem.addEventListener("click",function(ev){

				overlay.removeEventListener("click",removeModalHandler);
				overlay.addEventListener("click",removeModalHandler);
				if (classie.has(elem,"md-setperspective")) {
					setTimeout(function(){
						classie.add(document.documentElement,"md-setperspective");
					},25);
				}
			});
			close.addEventListener("click",function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			})
		})
	}
})();