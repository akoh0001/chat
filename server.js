var hapi   = require("hapi");
var cookie = require("hapi-auth-cookie");
var path   = require("path");

//create new hapi server object
var server = module.exports = new hapi.Server();
server.connection({
  host: "localhost",
  port: 8080
});

//start server, log uri to console
server.start(function() {
  console.log("Server running at:", server.info.uri);
});

//register handlebars and view options
server.views({
  engines     : {
    hbs: require("handlebars")
  },
  path        : path.join(__dirname, "views"),
  layoutPath  : path.join(__dirname, "views/layouts"),
  layout      : "default",
  isCached    : false
});

//serve static files
var paths = {
  "/assets/{path*}"         : "public",
  "/foundation-apps/{path*}": "node_modules/foundation-apps"
};

for (var path in paths) {
  server.route({
    method : "GET",
    path   : path,
    handler: {
      directory: {
        path: paths[path]
      }
    }
  });
}

//register hapi cookie auth
server.register(cookie, function(err) {
  if (err) { console.log(err); }

  server.auth.strategy("session", "cookie", "try", {
    password  : "secret",
    cookie    : "sid", //cookie name
    redirectTo: false, //handle redirections
    isSecure  : false, //required for non-https applications
    ttl       : 24 * 60 * 60 * 1000, //set session to 1 day
  });
});

//require controllers
var chat     = require("./controllers/chat");
var index    = require("./controllers/index");
var login    = require("./controllers/login");
var register = require("./controllers/register");

//add routes
server.route([
  { method: "GET", path: "/chat",
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
]);