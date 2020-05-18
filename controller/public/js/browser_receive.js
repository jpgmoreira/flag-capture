// Browser receiving data from the C++ process:
socket.on('data-from-process', (data) => {
	// The first time we receive data is to indicate that the process
	// finished to create the Q-Table.
	if (!cppInitialized) {
		cppInitialized = true;
		document.getElementById('initializing').classList.add('hidden');
		document.getElementById('game').classList.remove('hidden');
		generateObstacles();
		runFrame(1);
	}
	else {
		const actionIndex = parseInt(data, 10);
		const frameDelay = $frameDelayRange.value;
		if (mustUpdateScreen) {
			setTimeout(runFrame, frameDelay, actionIndex);
		}
		else {
			runFrame(actionIndex);
		}
	}
});
