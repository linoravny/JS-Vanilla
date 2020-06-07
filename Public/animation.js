'use strict';

const animation = (function() {	
	let start, myReq;
	const boxElement = document.getElementById('animateBox'); 
	const boxElementCss = document.getElementById('animateBoxWithCss');
	
	function animateBoxWithAnimationFrame() {
		myReq = window.requestAnimationFrame(boxMove);
	}

	function boxMove(timestamp) {

		if (start === undefined) {
			start = timestamp;
		}
		const elapsed = timestamp - start;

		boxElement.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

		if (elapsed < 2000) { // Stop the animation after 2 seconds
			myReq = window.requestAnimationFrame(boxMove);
		} else {
			window.cancelAnimationFrame(myReq);
		}
	}

	function animateBoxWithCss(){
		if (boxElementCss.classList.contains("animate")) {
			boxElementCss.classList.remove("animate");
		} else {
			boxElementCss.classList.add("animate");
		}
	}

	// public API
	return {
		animateBoxWithAnimationFrame: animateBoxWithAnimationFrame,
		animateBoxWithCss: animateBoxWithCss
	}

})();

