var mysql = require('mysql');
//https://github.com/mysqljs/mysql
//sql driver https://habrahabr.ru/post/198738/

//table type data https://stackoverflow.com/questions/1215368/how-to-get-the-mysql-table-columns-data-type

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "predicate"
});

// var connect = function(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
// }

var users = function(){
  
  
    var sql = "SELECT * FROM users";

    var res;
  
    res = con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log("Result: " + result);
      // console.log(JSON.stringify(result[0]))
      // res = result;
    });
    // return res;
    return res;
}

/////////////////////////////////////////
// EXPORT

module.exports = {
  connect: function(){},
  users: users,
}