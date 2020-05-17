// Browser receiving data from the C++ process:
socket.on('data-from-process', (data) => {
	if (!cppInitialized) {
		cppInitialized = true;
		document.getElementById('initializing').style.display = 'none';
	}
	else {
		runFrame(parseInt(data, 10));
	}
});
