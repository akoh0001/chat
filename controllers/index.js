var index = function(request, reply) {
  //var username = " " || request.auth.credentials.username;
  var username;

  if (request.auth.credentials.username){
    username = request.auth.credentials.username;
  }
  else {
    username = "";
  }

  reply.view("index", {
    title   : "Welcome",
    username: username
  });
};

module.exports = {
  index: index,
};