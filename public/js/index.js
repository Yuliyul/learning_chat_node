var socket = io();
socket.on('connect', function(){
  console.log('FE connected');
});
socket.on('disconnect', function(){
  console.log('DISCONNECTED');
});

socket.on('newMessage', function(message){
  console.log('Client get new message', message);
  var li = $('<li></li');
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li);
});
$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from : "User",
    text : $('[name=message]').val()
  }, function(data){

  });
});
