var ef = require('../linq');
//https://github.com/mihaifm/linq/blob/master/sample/tutorial.js
//g node.js entity framework




var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "predicate"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "SELECT * FROM users";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    console.log(JSON.stringify(result[0]))

  });

});