// Browser receiving data from the C++ process:
socket.on('data-from-process', (data) => {
	if (!cppInitialized) {
		cppInitialized = true;
	}
	runFrame(parseInt(data, 10));
});
