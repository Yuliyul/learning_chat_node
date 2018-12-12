var socket = io();
socket.on('connect', function(){
  console.log('FE connected');
});
socket.on('disconnect', function(){
  console.log('DISCONNECTED');
});

socket.on('newMessage', function(message){
  var template = $('#message-template').html();
  var FormattedTime = moment(message.createAt).format('H:mm A');
  var html = Mustache.render(template, {
    text:message.text,
    from:message.from,
    createAt:FormattedTime
  });
  $('#messages').append(html);
});
socket.on('newLocationMessage', function(message){
  var FormattedTime = moment(message.createAt).format('H:mm A');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    text:message.text,
    from:message.from,
    createAt:FormattedTime,
    url:message.url
  });
  $('#messages').append(html);
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
