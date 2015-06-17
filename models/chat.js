var server = require("../server");
var io     = require("socket.io")(server.listener);

//var userlist = require("./userlist");
//var User     = require("./user");

//socket io listen on connection event for incoming sockets
io.on("connection", function(socket) {
  console.log("Chat: User connected");

  //listen on chat message event
  socket.on("message", function(msg) {
    //emit message to view for all users in room
    io.emit("message", msg);
  });

  //var user = new User({
  //  socket: socket
  //});
  //userlist.add(user);

});

module.exports = {
  io: io
};