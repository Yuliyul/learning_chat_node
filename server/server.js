const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIo(server);
io.on('connection', (socket)=>{
	console.log('new connection');
	socket.emit('newMessage', {
		from:"Admin",
		text:"Welcome to chat"
	});
	socket.broadcast.emit("newMessage", {
		from:"Admin",
		text:"New user join"
	})
	socket.on('disconnect', ()=>{
		console.log('client disconnected');
	});
	socket.on('createMessage', (message)=>{
		console.log('client create message', message);
		io.emit('newMessage', {
			from:message.from,
			text:message.text,
			createdAt:(new Date).getTime()
		});
	});
});
app.use(express.static(publicPath));
app.get('/', (req, resp)=>{
	resp.render('index.html');
});
server.listen(port,()=>{console.log(`Server start on port ${port}`)});
