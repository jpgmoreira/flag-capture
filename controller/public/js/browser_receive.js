// Browser receiving data from the C++ process:
socket.on('data-from-process', (data) => {
	if (!cppInitialized) {
		cppInitialized = true;
		document.getElementById('initializing').style.display = 'none';
		runFrame(1);
	}
	else {
		const delay = mustUpdateScreen ? frameDelay : 0;
		setTimeout(runFrame, delay, parseInt(data, 10));
	}
});
