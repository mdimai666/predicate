/*jshint esversion: 6 */
// require('./core0').proto();
var stringify = require('json-stringify-safe');//stringify(core.get_req(), null, 2);
var core;
var req, res;

var api = {  
  default(){
    var name = core.uri(1);
    return {
      result: 'no api',
      api_name: name,
      // uri: core.res.uri,
    };
  },
  test: ()=>this.controller('test'),

  exec(){
    // return stringify(core.get_req(), null, 2);
    return controller.ok({message:'okk'});// core.exec('cmd tree');
    // return controller.error(req.query['cmd']);

    // return req.query['cmd'];
  },
  db(){
    
    try {
      var a = core.db.query(sql, function (error, results){
        if (error) {
          // res.status(400).send('Error in database operation');
          controller.error('Error in database operation');
        } else {
          var data1 = stringify(results, null, 2);
          controller.ok({
            records: data1,
          });
        }
      });

      
      return controller.ok('smile!');
    } catch (err) {
      return controller.error({ex: core.errorToString(err)});
    }

  }
};

var controller = {  
  do(_core){    
    core = _core;
    var send = {
      data: {
        result:'error',
      },
    };
    var name = core.uri(1) || 'default';
    
    if(core.defkey(api,name))
      try{
        send.data = api[name]();
      } catch(ex){
        send.result = 'error';
        send.message ='api func error';
        send.ex=core.errorToString(ex);
        
      }
    else send.data = api.default();

    return send;
  },
  ok(q){
    q.result='ok';
    return q;
  },
  error(q){
    q.result='error';
    return q;
  }  
};


var call = (_core)=>{
  // core.proto();
  req = _core.get_req();
  res = _core.get_res();
  return controller.do(_core);
};

/////////////////////////////////////////
// EXPORT

module.exports = call;