var index = function(request, reply) {

  reply.view("index", {
    title   : "Welcome"
  });
};

module.exports = {
  index: index,
};