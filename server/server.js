const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIo(server);
io.on('connection', (socket)=>{
	console.log('new connection');
	socket.emit('newMessage', generateMessage("Admin", "Welcome to chat"));
	socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));
	socket.on('disconnect', ()=>{
		console.log('client disconnected');
	});
	socket.on('createMessage', (message, callback)=>{
		console.log('client create message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('callback message from server');
	});
});
app.use(express.static(publicPath));
app.get('/', (req, resp)=>{
	resp.render('index.html');
});
server.listen(port,()=>{console.log(`Server start on port ${port}`)});
