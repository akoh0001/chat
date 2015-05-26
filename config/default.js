var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit   : 50,
  host              : "localhost",
  port              : 3306,
  user              : "",
  password          : "",
  database          : "",
  multipleStatements: true
});

pool.getConnection(function(err) {
  if (err) {
    console.error("Database ERROR connecting: " + err.stack);
    return;
  }

  console.log("Database connected");
});

module.exports = {
  pool: pool
};