var chat = require('../models/chat');

var chat = function(request, reply) {
  reply.view("chat", {
    title: "Chat"
  });
};

var chatPost = function(request, reply) {
  reply.view("chat", {
    title: "Chat"
  });
};

module.exports = {
  chat    : chat,
  chatPost: chatPost
};