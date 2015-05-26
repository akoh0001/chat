var server = require('../server');
var io = require("socket.io")(server.listener);

//socket io listen on connection event for incoming sockets
io.on('connection', function(socket) {
  console.log("User connected");

  //listen on chat message event
  socket.on('chat message', function(msg) {
    //emit message to view for all users in room
    io.emit('chat message', msg);
  });
});

module.exports = {
  io: io
};