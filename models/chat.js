var server = require("../server");
var io     = require("socket.io")(server.listener);

//socket io listen on connection event for incoming sockets
io.on("connection", function(socket) {
  console.log("Chat: User connected");

  //listen on chat message event
  socket.on("message", function(msg) {
    //emit message to view for all users in room
    io.emit("message", msg);
  });
});

/*var Hapi = require("hapi");
 var SocketIO = require("socket.io");

 var server = new Hapi.Server();
 server.connection({ port: 80 });

 var io = SocketIO.listen(server.listener);
 io.sockets.on("connection", function(socket) {

 socket.emit({ msg: "welcome" });
 });*/

module.exports = {
  io: io
};