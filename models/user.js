var Backbone = require("backbone");

var UserModel = Backbone.Model.extend({
  initialize: function() {
    if (this.get("connection")) {
      this.setSocket(this.get("connection"));
    }
  },
  setSocket : function(connection) {
    this.set("connection", connection);
    var self = this;

    connection.on("chat message", function(message) {
      self.trigger("message", { text: message, user: self });
    });
    connection.on("close", function() {
      self.trigger("closed");
    });
  }
});

module.exports = {
  UserModel: UserModel
};