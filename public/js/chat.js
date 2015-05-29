var socket = io();

$('form').submit(function() {
  socket.emit('chat message', $('.chat-message').val());
  $('.chat-message').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('.chat-messages').append($('<p>').text(msg));
});