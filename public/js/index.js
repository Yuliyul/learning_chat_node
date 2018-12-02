var socket = io();
socket.on('connect', function(){
  console.log('FE connected');  
});
socket.on('disconnect', function(){
  console.log('DISCONNECTED');
});

socket.on('newMessage', function(message){
  console.log('Client get new message', message);
});
