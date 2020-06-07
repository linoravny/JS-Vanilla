'use strict';

const domJS = (function() {	
	const domContainer = document.getElementById('domContainer');

	function resetList(){
		domContainer.innerHTML = null;
	}

	function showList() {
		let h2, p, div;
		
		for(let i=0; i<3000; i++){

			h2 = document.createElement("h2");
			p = document.createElement("p");
			div = document.createElement("div");

			h2.innerText = "Add JS Vanilla h2 i=" + i;
			//h2.className = "classA-" + i;
			p.innerText = "Add JS Vanilla p i=" + i;
			div.innerText = "Add JS Vanilla div i=" + i;
			
			domContainer.appendChild(h2);
			domContainer.appendChild(p);
			domContainer.appendChild(div);
		}
	}

	// public API
	return {
		resetList: resetList,
		showList: showList
	}

})();






