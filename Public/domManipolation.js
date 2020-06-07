'use strict';

const domJS = (function() {	
	const domContainer = document.getElementById('domContainer');
	const loader = document.querySelector('.loader');
	const loopLength = 3000;

	function resetList(){
		domContainer.innerHTML = null;
	}

	function showLoader(){
		if (loader.classList.contains("hidden")) {
			loader.classList.remove("hidden");
		}
	}

	function hideLoader(){
		loader.classList.add("hidden");
	}

	function showList() {
		showLoader();
		let h2, p, div;
		for(let i=0; i<loopLength; i++){

			h2 = document.createElement("h2");
			p = document.createElement("p");
			div = document.createElement("div");

			h2.innerText = "Add JS Vanilla h2 i=" + i;
			//h2.className = "className";

			p.innerText = "Add JS Vanilla p i=" + i;
			//p.classList.add('classList');

			div.innerText = "Add JS Vanilla div i=" + i;

			domContainer.appendChild(h2);
			domContainer.appendChild(p);
			domContainer.appendChild(div);
		}
		hideLoader();
	}

	function addOddClassName() {
		showLoader();
		let h2 = document.querySelectorAll("h2");
		for(let i=0; i< h2.length; i++){
			if((i % 2) === 0) {
				h2[i].className = "odd-name";
			}
		}
		hideLoader();
	}

	function addOddClassList() {
		showLoader();
		let h2 = document.querySelectorAll("h2");
		for(let i=0; i< h2.length; i++){
			if((i % 2) === 0) {
				h2[i].classList.add('odd-list');
			} else {
				h2[i].classList.remove('odd-list');
			}
		}
		hideLoader();
	}

	// public API
	return {
		resetList: resetList,
		showList: showList,
		addOddClassName: addOddClassName,
		addOddClassList: addOddClassList
	}

})();






