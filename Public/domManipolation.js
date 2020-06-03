'use strict';

const domContainer = document.getElementById('container');
let h2, p, div;

var downloadTimer, old_time, new_time, seconds_passed;

const workerFor = new Worker("worker.js");
if (window.Worker) {

	// listen to message event of worker
	workerFor.onmessage = function(event){

		//clearInterval(downloadTimer);
		
		domContainer.innerHTML = event.data;
		
		new_time = (new Date).getTime(); // OR performance.now();
		seconds_passed = (new_time - old_time)/1000; //in sec
		console.log('seconds_passed:' + seconds_passed);
		
		document.getElementById("progressBarVal").innerText  = seconds_passed;
	};
	// listen to error event of worker
	workerFor.onerror = function(event) {
		domContainer.innerHTML = 'Error!';
	};
	
} else {
	console.log('Your browser doesn\'t support web workers.')
}


// load results from web worker
function loadResult() {
	
	// add loading text until `message` event listener replaces it
	domContainer.innerHTML = "";
    domContainer.innerHTML = "loading...";
	document.getElementById("progressBarVal").innerText = "";


// **** Backrount Frame - emit message event to worker ****
	//result - seconds_passed:227.373 139.166 -> ~3.77 min
	old_time = (new Date).getTime();
	console.log('Start calculation - JS Backround Frame (web worker)....');
    workerFor.postMessage(null); // we don't need payload here

// **** JS Main Frame ****
	//result - seconds_passed:230.978 -> ~3.85 min
 /*
	setTimeout(()=>{
		old_time = (new Date).getTime();
		console.log('Start calculation - JS Main Frame....');
		
		calc();
		
		new_time = (new Date).getTime();
		seconds_passed = (new_time - old_time)/1000; //in sec
		console.log('seconds_passed:' + seconds_passed);
		document.getElementById("progressBarVal").innerText  = seconds_passed;
	},0);
*/

};

function calc(){
	var x = 0;
	var modulo = 2;
    for (var i = 0; i < 20000000000; i++) {
		if(i%modulo === 0) {
			modulo = modulo * 10;
			console.log('counter:' + i + " seconds_passed: " + ((new Date).getTime() - old_time)/1000);
		}
        x = x + i;
    }
	
	domContainer.innerHTML = x;
}

function creatList(){
	var html = "";
	const domContainer = document.getElementById('container');
	for(let i=0; i<300000; i++){
		//calc = (Math.random()) + (i*2) - i*3 + 8 + (Math.random())*(Math.random());
		//console.log("**** " + calc);
		
		
		h2 = document.createElement("h2");
		p = document.createElement("p");
		div = document.createElement("div");

		h2.innerText = "Add JS Vanilla h2 i=" + i;
		//h2.className = "classA-" + i;
		p.innerText = "Add JS Vanilla p i=" + i;
		div.innerText = "Add JS Vanilla div i=" + i;

		html += h2;
		html += p;
		html += div;
		
		domContainer.appendChild(h2);
		domContainer.appendChild(p);
		domContainer.appendChild(div);
	}
	return html;
}

function timmer(){
	var timeleft = 60;
	downloadTimer = setInterval(function(){
	  
	  if(timeleft <= 0) {
		  clearInterval(downloadTimer);
	  }
	  document.getElementById("progressBar").value = 60 - timeleft;
	  document.getElementById("progressBarVal").innerText = 60 - timeleft;
	  timeleft -= 1;
	}, 1000);
}

let start, myReq;
const boxElement = document.getElementById('animateBox'); 
function animateBox() {
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

//loadResult();

