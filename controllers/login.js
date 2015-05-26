var authentication = require("../models/authentication");

var login = function(request, reply) {
  reply.view("login", {
    title: "Login"
  });
};

var loginFormPost = function(request, reply) {
  var userLogin = {
    email   : request.payload.email,
    password: request.payload.password
  };

  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  //if email or password is missing
  if (!userLogin.email || !userLogin.password) {
    return reply.view("login", {
      email  : userLogin.email,
      message: "Missing email or password"
    });
  }
  else {
    //if email and password validate credentials
    authentication.validatePasswords(userLogin.email, userLogin.password, function(err, isValid, user) {
      if (err) { console.log(err); }

      //if user is not valid return to login
      if (isValid === false) {
        return reply.view("login", {
          email  : userLogin.email,
          message: "Invalid username or password"
        });
      }
      //if user is valid, set session, and send to chat
      else if (isValid === true) {
        console.log(user[0]);
        console.log(request.auth.credentials);
        request.auth.session.set(user[0]);
        return reply.redirect('/' + user[0].username);
        //return reply.view("/", {
        //  username  : user[0].username,
        //});
      }
    });
  }
};

var logout = function(request, reply) {
  request.auth.session.clear();
  return reply.view("login", {
    message: "You logged out"
  });
};

module.exports = {
  login        : login,
  loginFormPost: loginFormPost,
  logout       : logout
};