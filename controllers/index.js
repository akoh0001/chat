var index = function(request, reply) {
  //var username = " " || request.auth.credentials.username;
  var username;
  var message;

  if (request.auth.isAuthenticated === true){
    username = request.auth.credentials.username;
    message = request.auth.credentials.username + " you're logged in. You can chat!!!";
  }
  else {
    message = "Please login to chat. Password only for registered users";
  }

  reply.view("index", {
    message : message,
    title   : "Welcome",
    username: username
  });
};

module.exports = {
  index: index,
};