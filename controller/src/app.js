const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const subprocess = require('./subprocess');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const pubDir = path.join(__dirname, '../public');

app.use(express.static(pubDir));

io.on('connection', (socket) => {
	subprocess.createProcess(socket);
});

server.listen(port, () => {
	console.log(`Open your browser and access localhost:${port}`);
});
