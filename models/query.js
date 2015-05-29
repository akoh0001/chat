var mysql = require("../config/config");

//select user in database
var selectUser = function(username, callback) {
  var selectUserQuery = "SELECT * FROM user WHERE username = ?";

  mysql.pool.getConnection(function(err, connection) {
    if (err) { console.log(err); }

    //use the connection to query db
    connection.query(selectUserQuery, username, function(err, user) {
      console.log("User Selected: " + user);
      //connection returned to pool
      connection.release(); //connection.destroy() doesnt go back to pool
      console.log("RELEASED connection");
      if (err) { console.log(err); }
      else { callback(null, user); }
    });
  });
};

//insert user into database
var insertUser = function(user, callback) {
  var insertUserQuery = "Insert INTO user SET ?";

  mysql.pool.getConnection(function(err, connection) {
    if (err) { console.log(err); }

    //use the connection to query db
    connection.query(insertUserQuery, user, function(err) {
      console.log("User Inserted");
      //connection returned to pool
      connection.release();
      console.log("RELEASED connection");
      if (err) { console.log(err); }
      else { callback(); }
    });
  });
};

module.exports = {
  selectUser: selectUser,
  insertUser: insertUser
};