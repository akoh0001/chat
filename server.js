var hapi = require("hapi");
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

server.register(cookie, function(err) {
  server.auth.strategy('session', 'cookie', {
    password  : 'secret',
    cookie    : 'cookie.sid',
    redirectTo: false, //handle redirections
    isSecure  : false, //required for non-https applications
    ttl: 24* 60 * 60 * 1000 //set session to 1 day
  });
});

//require controllers
var chat     = require("./controllers/chat");
var login    = require("./controllers/login");
var register = require("./controllers/register");

//add routes
server.route([
  { method: "GET", path: "/{username*}", handler: chat.chat },
  { method: "POST", path: "/", handler: chat.chatPost },
  { method: "GET", path: "/login", handler: login.login },
  { method: ["GET", "POST"], path: "/loginFormPost", config: {
      auth      : { mode: 'try', strategy: 'session' },
      plugins   : { 'hapi-auth-cookie': { redirectTo: false } },
      handler: login.loginFormPost } },
  { method: "GET", path: "/logout", config: {
      auth   : 'session',
      handler: login.logout } },
  { method: "GET", path: "/register", handler: register.register },
  { method: "POST", path: "/registerFormPost", handler: register.registerFormPost }
]);