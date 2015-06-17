var Backbone = require("backbone");
var User = require("./user");

var UserList = Backbone.Collection.extend({
    model: User,
    initialize: function() {
      this.on("message", function() {
        this.each(function() {
          //send to user
        });
      });
      this.on("closed", function() {
        this.remove();
      });
    }
  });

module.exports = {
  UserList: UserList
};