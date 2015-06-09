var chat = require("../models/chat");

var chat = function(request, reply) {
  //check isAuthenticated status from loginFormPost
  console.log(request.auth);

  reply.view("chat", {
    isAuthenticated: true,
    title          : "Chat",
    username       : request.auth.credentials.username,
    message        : request.auth.credentials.username + " logged in"
  });
};

module.exports = {
  chat: chat
};