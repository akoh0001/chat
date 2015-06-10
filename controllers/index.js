var index = function(request, reply) {
  var username;
  var message;
  var isAuthenticated;

  //if authenticated set variables
  if (request.auth.isAuthenticated === true) {
    isAuthenticated = true;
    message         = request.auth.credentials.username + " you're logged in. You can chat!!!";
    username        = request.auth.credentials.username;
  }
  else {
    message = "Please login to chat. Password only for registered users";
  }

  reply.view("index", {
    isAuthenticated: isAuthenticated,
    message        : message,
    title          : "Welcome",
    username       : username
  });
};

module.exports = {
  index: index
};