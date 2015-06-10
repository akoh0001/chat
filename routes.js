//require controllers
var chat     = require("./controllers/chat");
var index    = require("./controllers/index");
var login    = require("./controllers/login");
var register = require("./controllers/register");

module.exports = [
  {
    method: "GET", path: "/chat",
    config: {
      auth   : { mode: "required", strategy: "session" },
      handler: chat.chat,
      plugins: { "hapi-auth-cookie": { redirectTo: "login" } }
    }
  },
  { method: "GET", path: "/", handler: index.index },
  { method: "GET", path: "/login", handler: login.login },
  { method: "POST", path: "/login", handler: login.loginFormPost },
  { method: "GET", path: "/logout", handler: login.logout },
  { method: "GET", path: "/register", handler: register.register },
  { method: "POST", path: "/register", handler: register.registerFormPost }
];