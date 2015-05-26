var bcrypt = require("bcrypt");
var query  = require("../models/query");

//encrypt plain text password, callback encrypted password
var encryptPassword = function(plainTextPassword, callback) {
  //generate salt with 10 rounds
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { console.log(err); }

    //encrypt plain text password, then hash the password with the salt
    bcrypt.hash(plainTextPassword, salt, function(err, hash) {
      if (err) { console.log(err); }

      var encryptedPassword = hash.toString("hex");
      callback(null, encryptedPassword);
    });
  });
};

//validate existing users password with login form password
var validatePasswords = function(email, password, callback) {

  //select user from database that match email entered in login form
  query.selectUser(email, function(err, user) {
    if (err) { console.log(err); }

    //if no user in database, callback false
    if (!user[0]) {
      console.log("authentication: " + false);
      return callback(null, false);
    }
    //if user in database and passwords match,
    //callback true and user, otherwise false
    else {
      var encryptedPassword = user[0].password;

      //compare plain text password with encrypted password in database
      bcrypt.compare(password, encryptedPassword, function(err, isValid) {
        if (err) { console.log(err); }

        console.log("authentications: " + isValid);
        callback(null, isValid, user);
      });
    }
  });
};

module.exports = {
  encryptPassword  : encryptPassword,
  validatePasswords: validatePasswords
};