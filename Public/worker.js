onmessage = function(e) {
	console.log('Worker: Message received from main script');
	var old_time = (new Date).getTime();
	var x = 0;
	var modulo = 2;
    for (var i = 0; i < 200000000; i++) {
		if(i%modulo === 0) {
			modulo = modulo * 10;
			console.log('counter:' + i + " seconds_passed: " + ((new Date).getTime() - old_time)/1000);
		}
        x = x + i;
    }
    self.postMessage(x);
	
}

