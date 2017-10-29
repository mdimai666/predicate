var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stringify = require('json-stringify-safe');

var cfg_db = require('./app_cfg.json').cfg_db;


//
// var db = require('./db');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

var core = require('./core0');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//img,css...
app.use(express.static('public'));

// app.use('/', index);
// app.use('/users', users);

var mysql = require('mysql');


app.use(function (req, res) {

  core.init(req, res);
  //get data
  function step1(next, buf) {
    var conn = mysql.createConnection(cfg_db);

    conn.connect(function (err) {
      if (err) {
        console.log('MySQL connect error');
        throw err;
      }
      console.log("Connected!");
    });

    core.db = conn;

    conn.query('select * from users', function (error, results) {
      if (error) {
        res.status(400).send('Error in database operation');
      } else {
        // res.send(results);
        var db1 = results;
        var data1 = {
          u: db1
        };
        var data2 = stringify(db1, null, 2);
        // res.render('index', { title: req.path, data1: data1, data2: data2 });

        buf.data1 = data1;
        buf.data2 = data2;

        return next(step3, buf);
      }
    });

    // return next();
  }

  //do operations
  function step2(next, buf) {
    //so something
    return next(null, buf);
  }

  function step3(next, buf) {

    // var r = req.path;
    var _page = core.uri(0) || 'index';

    if(_page ==='api'){
      try{
        res.json(require('./api')(core));
      } catch(ex){
        var a = {
          result:'error api',
          ex: core.errorToString(ex)
        };
        res.json(a);
      }
      return;
    } 

    // res.send('Yummi!');
    res.render(_page, {
      // title: 'Predicate',
      title: _page,
      data1: buf.data1,
      data2: buf.data2
    });
  }

  var buf = {
    req: req,
    res: res,
  };

  step1(step2, buf);

  // // var db1 = db.users(callback);


  // // function callback(db1){
  // //   var data1 = {u: db1};
  // //   var data2 = stringify(db1, null, 2)
  // //   res.render('index', { title: req.path, data1: data1, data2: data2 });
  // // }

  // function step1(req, res, next){

  //   // db.connect();
  //   // db.users(function (err, result, next2, res, req) {
  //   //   var db1 = result;
  //   //   var data1 = {
  //   //     u: db1
  //   //   };
  //   //   var data2 = stringify(db1, null, 2)
  //   //   // res.render('index', {
  //   //   //   title: req.path,
  //   //   //   data1: data1,
  //   //   //   data2: data2
  //   //   // });

  //   //   // res.send('ff');
  //   //   console.log('d1');
  //   //   res.send('send');

  //   //   // step2();
  //   //   // next2(err, res, );
  //   // }, res, req);

  //   // res.send('yes');
  // }

  // function step2(res, next){
  //   res.send('hello');
  // }

  // // setTimeout(function() {
  //   step1(req, res, step2)
  // // }, 2000);


});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//MY
// app.use(express.static('public/img'));
// //app.use('/static', express.static('public'));
// //app.use('/static', express.static(__dirname + '/public'));

// function include(file_) {
//   with(global) {
//     eval(fs.readFileSync(file_) + '');
//   };
// };

module.exports = app;

console.log('app1 start!');