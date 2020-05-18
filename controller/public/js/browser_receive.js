// Browser receiving data from the C++ process:
socket.on('data-from-process', (data) => {
	if (!cppInitialized) {
		cppInitialized = true;
		document.getElementById('initializing').style.display = 'none';
		generateObstacles();
		runFrame(1);
	}
	else {
		const actionIndex = parseInt(data, 10);
		const frameDelay = document.getElementById('frame-delay-range').value;
		if (mustUpdateScreen) {
			setTimeout(runFrame, frameDelay, actionIndex);
		}
		else {
			runFrame(actionIndex);
		}
	}
});
