var hapi  = require("hapi");
var basic = require("hapi-auth-basic");
var path  = require("path");

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
  partialsPath: path.join(__dirname, "views/partials"),
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

//register hapi auth basic
var authentication = require("./models/authentication");

server.register(basic, function(err) {
  if (err) { console.log(err); }
  server.auth.strategy("simple", "basic", { validateFunc: authentication.validatePasswords });
});

//require controllers
var chat     = require("./controllers/chat");
var login    = require("./controllers/login");
var register = require("./controllers/register");

//add routes
server.route([
  { method: "GET", path: "/", handler: chat.chat },
  { method: "POST", path: "/", handler: chat.chatPost },
  { method: "GET", path: "/login", handler: login.login },
  { method: "GET", path: "/loginFormPost", config: { auth: "simple", handler: login.loginFormPost } },
  { method: "GET", path: "/logout", handler: login.logout },
  { method: "GET", path: "/register", handler: register.register },
  { method: "POST", path: "/registerFormPost", handler: register.registerFormPost }
]);