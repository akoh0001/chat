var authentication = require("../models/authentication");

var login = function(request, reply) {
  reply.view("login", {
    title: "Login",
    message: "Enter username to chat."
  });
};

var loginFormPost = function(request, reply) {
  var userLogin = {
    username: request.payload.username,
    password: request.payload.password
  };

  //if authenticated redirect to chat
  if (request.auth.isAuthenticated) {
    return reply.redirect("chat");
  }
  //if not authenticated then attempt login
  else {
    authentication.validatePasswords(userLogin.username, userLogin.password, function(err, isValid, user) {
      if (err) { console.log(err); }

      //if no user in db and login form password is empty, login as guest
      if (!user && !userLogin.password) {
        request.auth.session.set(userLogin);
        return reply.redirect("chat");
      }

      //if user is not valid return to login
      if (isValid === false) {
        return reply.view("login", {
          username: userLogin.username,
          message : "Invalid username or password."
        });
      }
      //if user is valid, set session, and send to chat
      else if (isValid === true) {
        //delete request.auth.artifacts.password;
        delete request.payload.password;
        request.auth.session.clear();
        request.auth.session.set(user[0]);

        console.log(reply);
        return reply.redirect("chat");
      }
    });
  }
};

var logout = function(request, reply) {
  request.auth.session.clear();
  return reply.view("login", {
    message: "You logged out."
  });
};

module.exports = {
  login        : login,
  loginFormPost: loginFormPost,
  logout       : logout
};