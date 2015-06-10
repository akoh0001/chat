var Backbone = require("backbone");
var User     = require("./user");

var userList = Backbone.Collection.extend({
  model: User,
  load : function(callback) {

    callback();
  }
});

module.exports = {
  userList: userList
};