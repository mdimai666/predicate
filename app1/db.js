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
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
// }

// var query = function(sql, cb){
//   con.query(sql, function(err, result) {
//     if (err) throw(err); 
//     cb(err, result);
//   });
// };

var users = function (callback, res, req) {


  var sql = "SELECT * FROM users";

  var e = con.query(sql, function (err, result, fields) {
    if (err) throw err;

    // console.log(result);
    var ress = {
      'dima': 'makarov'
    };
    callback(err, ress, {}, res, req);
  });


  // res = query(sql, function(err,result){
  //   return result;
  //   // console.info(result);
  // })

  // return res;
  // res = JSON.stringify(res);
  // console.log(res);
  // return res;
}

/////////////////////////////////////////
// EXPORT

module.exports = {
  connect: function () {},
  users: users,
}