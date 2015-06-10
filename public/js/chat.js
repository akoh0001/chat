var socket = io();

$("form").submit(function() {
  socket.emit("message", $(".user-message").val());
  $(".user-message").val("");

  return false;
});
socket.on("message", function(msg) {
  $(".group-messages").append($("<p>").text(msg));
});