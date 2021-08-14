var mysql = require('mysql2');

module.exports = function(host, user, password, database, port){
  let connection = mysql.createPool({
    host     : host,
    user     : user,
    password : password,
    database : database,
    port     : port
  });
  return connection
}