var Backbone = require("backbone");

var UserModel = Backbone.Model.extend({
  default: {
    id      : "",
    username: "",
    email   : ""
  }
});

var user = new UserModel({
  username: "",
  id      : "",
  email   : ""
});

//need to get credentials
var userCredentials = {
  id      : "",
  username: "",
  emai    : ""
};

user.save(userCredentials, {
  success: function(user) {
    console.log(user.toJSON());
  }
});

module.exports = {
  UserModel: UserModel
};