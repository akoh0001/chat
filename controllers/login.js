//var query = require("../models/query");

var login = function(request, reply) {
  reply.view("login", {
    title: "Login"
  });
};

var loginFormPost = function(request, reply) {
  //var email = request.payload.email
  //userQuery.selectUser(email, function(err, user) {
  //  if (err) { console.log(err); }
  //  else { console.log(user); }
  //});

  var response              = reply("Logged Out");
  response.statusCode       = 302;
  response.headers.Location = "/";
};

var logout = function(request, reply) {
  var response              = reply("Logged Out");
  response.statusCode       = 401;
  response.statusCode       = 302;
  response.message          = "Logged Out";
  response.headers.Location = "/login";
};

module.exports = {
  login        : login,
  loginFormPost: loginFormPost,
  logout       : logout
};