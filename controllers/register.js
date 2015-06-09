var authentication = require("../models/authentication");
var query          = require("../models/query");

var register = function(request, reply) {
  //var username = " " || request.auth.credentials.username;
  var username;

  if (request.auth.isAuthenticated === true){
    username = request.auth.credentials.username;
  }

  reply.view("register", {
    title: "Register",
    username: username
  });
};

//register form request
var registerFormPost = function(request, reply) {
  var userRegistering = {
    username: request.payload.username,
    email   : request.payload.email,
    password: request.payload.password
  };

  //select user from database that match email entered in login form
  query.selectUser(userRegistering.username, function(err, user) {
    if (err) { console.log(err); }

    //if no user in database, insert credentials into database
    if (!user[0]) {
      //ecrypt plain text password
      authentication.encryptPassword(userRegistering.password, function(err, encryptedPassword) {
        if (err) { console.log(err); }

        //set password to encrypted password
        userRegistering.password = encryptedPassword;

        //insert user into database, then redirect to login
        query.insertUser(userRegistering, function() {
          console.log(userRegistering);
          var response              = reply("Registered");
          response.message          = "You're registered!!!";
          response.statusCode       = 302;
          response.headers.Location = "login";
        });
      });
    }
    //if user in database, redirect to register screen and repopulate form
    else {
      console.log("User Exists");
      return reply.view("register", {
        username: user.username,
        email   : user.email,
        message : "User already exists, please try again."
      });
    }
  });
};

module.exports = {
  register        : register,
  registerFormPost: registerFormPost
};