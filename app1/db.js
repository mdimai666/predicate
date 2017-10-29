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
};

var table = function(callback, res, req) {

    var sql = "SELECT * FROM users";
    var e = con.query(sql, function (error, results) {
      // if (error) {
      //   res.status(400).send('Error in database operation');
      // } else {
      //   // res.send(results);
      //   var db1 = results;
      //   var data1 = {
      //     u: db1
      //   };
      //   var data2 = stringify(db1, null, 2);
      //   // res.render('index', { title: req.path, data1: data1, data2: data2 });

      //   buf.data1 = data1;
      //   buf.data2 = data2;

      //   return next(step3, buf);
      // }

    });
};

/////////////////////////////////////////
// EXPORT

module.exports = {
  connect: function () {},
  users: users,
  table: table,
};