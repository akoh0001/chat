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
  engines   : {
    hbs: require("handlebars")
  },
  path      : path.join(__dirname, "views"),
  layoutPath: path.join(__dirname, "views/layouts"),
  layout    : "default",
  isCached  : false
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
var authentication = require("./models/authentication");
server.register(cookie, authentication.cookieOptions);

//add routes
var routes = require("./routes");
server.route(routes);