var io = require("../models/chat");

var chat = function(request, reply) {
  //check isAuthenticated status from loginFormPost
  console.log(request.auth);

  reply.view("chat", {
    isAuthenticated: true,
    title          : "Chat",
    username       : request.auth.credentials.username,
    message        : "Logged in as " + request.auth.credentials.username
  });
};

module.exports = {
  chat: chat
};