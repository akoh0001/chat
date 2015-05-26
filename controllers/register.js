var query          = require("../models/query");
var authentication = require("../models/authentication");

var register = function(request, reply) {
  reply.view("register", {
    title: "Register"
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
  query.selectUser(userRegistering.email, function(err, user) {
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
          var response              = reply("worked?");
          response.statusCode       = 302;
          response.registered       = "hello";
          response.headers.Location = "/login";
        });
      });
    }
    //if user in database, redirect to register screen and repopulate form
    else {
      console.log("User Exists");
      return reply.view("register", {
        username: user.username,
        email   : user.email,
        message : "The user exists. Please try again."
      });
    }
  });
};

module.exports = {
  register        : register,
  registerFormPost: registerFormPost
};