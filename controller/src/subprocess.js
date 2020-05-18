const path = require('path');
const { spawn } = require('child_process');

const activeConnections = {};

const register = (proc, socket) => {
	const pid = proc.pid;

	// Data from the browser to the process:
	socket.on('send-to-process', (data) => {
		proc.stdin.write(JSON.stringify(data) + '\r\n');  // '\r\n' just to flush.
	});

	// Process -> Node -> Browser:
	proc.stdout.on('data', (data) => {
		socket.emit('data-from-process', data.toString());
	});

	// Process error:
	proc.stderr.on('data', (data) => {
		console.error(`pid ${pid} stderr: ${data}`);
	});

	// Process finished:
	proc.on('exit', (code) => {
		delete activeConnections[pid];
		console.log(`child process of pid ${pid} exited with code ${code}`);
	});
}

const createProcess = (socket) => {
	const options = {
		windowsHide: true
	}
	const proc = spawn('./ai/main', [], options);
	const pid = proc.pid;

	activeConnections[pid] = { proc, socket	};

	socket.on('disconnect', () => {
		if (activeConnections.hasOwnProperty(pid)) {
			proc.kill('SIGTERM');
			delete activeConnections[pid];
		}
		else {
			console.log(`${pid} was already exited.`);
		}
		console.log(`${pid} disconnected.`);
	});

	register(proc, socket);

	console.log('>> New process pid:', pid);
}

module.exports = {
	createProcess
};
