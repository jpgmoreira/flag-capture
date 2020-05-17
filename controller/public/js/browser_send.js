const socket = io({ reconnection: false });

// Call this function to send data from the browser to the C++ process.
// Server will JSON.stringify data before sending.
const sendToProcess = (data) => {
	socket.emit('send-to-process', data);
}
