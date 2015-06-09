var server = require('../server');
var io = require("socket.io")(server.listener);

//socket io listen on connection event for incoming sockets
io.on('connection', function(socket) {
  console.log("Chat: User connected");

  //listen on chat message event
  socket.on('chat message', function(msg) {
    //emit message to view for all users in room
    io.emit('chat message', msg);
  });
});



var server = new Hapi.Server();
server.connection({ port: 80 });

var io = SocketIO.listen(server.listener);

});*/


module.exports = {
  io: io
};