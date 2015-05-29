var chat = require('../models/chat');

var chat = function(request, reply) {

  reply.view("chat", {
    title   : "Chat",
    username: request.auth.credentials.username
  });
};

module.exports = {
  chat: chat,
};