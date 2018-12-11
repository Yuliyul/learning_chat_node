var socket = io();
socket.on('connect', function(){
  console.log('FE connected');
});
socket.on('disconnect', function(){
  console.log('DISCONNECTED');
});

socket.on('newMessage', function(message){
  console.log('Client get new message', message);
  var FormattedTime = moment(message.createAt).format('H:mm A');
  var li = $('<li></li');
  li.text(`${message.from} ${FormattedTime}: ${message.text}`);
  $('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
  console.log(message);
  var FormattedTime = moment(message.createAt).format('H:mm A');
  var li = $('<li></li');
  var a = $('<a target="_blank">My current location</a>');
  a.attr('href', message.url);
  li.text(`${message.from} ${FormattedTime}: `);
  li.append(a);
  $('#messages').append(li);
});
var messageTextbox = $('[name=message]');
$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from : "User",
    text : messageTextbox.val()
  }, function(data){
    messageTextbox.val('');
  });
});
var locationButton = $('#send_location');
locationButton.on('click', function(e){
  e.preventDefault();
  if(!navigator.geolocation)
    return alert('Browser not support GEOlocation');
  locationButton.attr('disabled', 'disabled').text('Sending ...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
    });
  },
function(error){
  locationButton.removeAttr('disabled').text('Send location');
  alert('some error', error);
});
});
