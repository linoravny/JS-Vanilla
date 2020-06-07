'use strict';

const performance = (function() {
	const resultContainer = document.getElementById('result');
	const tatalTimeContainer = document.getElementById("totalTime");
	let old_time, new_time, seconds_passed;
	const workerFor = new Worker("worker.js");

	function initWebWorker(){
		if (window.Worker) {

			// listen to message event of worker
			workerFor.onmessage = function(event){

				resultContainer.innerHTML = event.data;
				
				new_time = (new Date).getTime(); // OR performance.now();
				seconds_passed = (new_time - old_time)/1000; //in sec
				console.log('seconds_passed:' + seconds_passed);
				
				tatalTimeContainer.innerText  = seconds_passed;
			};
			// listen to error event of worker
			workerFor.onerror = function(event) {
				resultContainer.innerHTML = 'Error!';
			};
			
		} else {
			console.log('Your browser doesn\'t support web workers.')
		}
	}

	function reset(){
		resultContainer.innerHTML = "";
		resultContainer.innerHTML = "loading...";
		tatalTimeContainer.innerText = "";
	}

	// load results from web worker
	function loadResultWithWebWorker() {
		reset();
		//result - seconds_passed:227.373 139.166 -> ~3.77 min
		old_time = (new Date).getTime();
		console.log('Start calculation - JS Backround Frame (web worker)....');
		workerFor.postMessage(null); // we don't need payload here

		alert("finish JS Main Frame - not wait for web worker background thread");

	};

	function loadResultWithMainThrade() {
		reset();
		// add loading text until `message` event listener replaces it
		resultContainer.innerHTML = "";
		resultContainer.innerHTML = "loading...";
		tatalTimeContainer.innerText = "";

		//result - seconds_passed:230.978 -> ~3.85 min
		setTimeout(()=>{
			old_time = (new Date).getTime();
			console.log('Start calculation - JS Main Frame....');
			
			calc();
			
			new_time = (new Date).getTime();
			seconds_passed = (new_time - old_time)/1000; //in sec
			console.log('seconds_passed:' + seconds_passed);
			tatalTimeContainer.innerText  = seconds_passed;

			alert("finish JS Main Frame - wait for finish calculation");
		},0);
	};

	function calc(){
		var x = 0;
		var modulo = 2;
		for (var i = 0; i < 200000000; i++) {
			if(i%modulo === 0) {
				modulo = modulo * 10;
				console.log('counter:' + i + " seconds_passed: " + ((new Date).getTime() - old_time)/1000);
			}
			x = x + i;
		}
		
		resultContainer.innerHTML = x;
	}

	initWebWorker();

	// public API
	return {
		loadResultWithWebWorker: loadResultWithWebWorker,
		loadResultWithMainThrade: loadResultWithMainThrade
	}

})();