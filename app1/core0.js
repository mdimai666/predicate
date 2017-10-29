/*jshint esversion: 6 */
var exec = require('child_process').exec;
var stringify = require('json-stringify-safe');//stringify(core.get_req(), null, 2);

var core = {

    req: {},
    res: {},
    db: {},

    init: (req, res) => {
        this.req = req;
        this.res = res;
    },


    uri: (index) => {
        var path = this.req.path;
        var pp = path.trimSlash().split('/');
        if (index < pp.length)
            return pp[index];
        else
            return false;
    },
    exec:(_cmd)=> {
        var e = exec("cmd /c " + _cmd, function (error, stdout, stderr) {
            // console.log(stdout);
            // console.log(stderr);
        });
        e.stdout.on('data', function (data) {
            console.log(data);
        });
        e.stderr.on('data', function (data) {
            console.log(data);
        });
    },
    get_res:()=>this.res,
    get_req:()=>this.req,
    errorToString:(ex)=>'Error: ' + ex.name + ":" + ex.message + "\n" + ex.stack,
    // errorToObj:(exstr)=>stringify(exstr, null, 2),

};

// ================================================
// / PROTOTYPE
// ================================================

String.prototype.trimSlash = function () {
    return this.replace(/^\/|\/$/g, "");
};

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp("\\{" + i + "\\}", "gi");
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// //////////////////////////////////////////////////////////////////////

function def() {
    for (var i = 0; i < arguments.length; i++) {
        // tslint:disable-next-line:curly
        if ((arguments[i] === null) ||
            (typeof (arguments[i]) === "undefined"))
            return false;
    }
    return true;
}

function defkey(obj, k) {
    return obj.hasOwnProperty(k);
}

core.def = def;
core.defkey = defkey;

function proto(){

    // String.prototype.trimSlash = function () {
    //     return this.replace(/^\/|\/$/g, "");
    // };
    
    // String.prototype.format = function () {
    //     var formatted = this;
    //     for (var i = 0; i < arguments.length; i++) {
    //         var regexp = new RegExp("\\{" + i + "\\}", "gi");
    //         formatted = formatted.replace(regexp, arguments[i]);
    //     }
    //     return formatted;
    // };
    
    // Object.size = function (obj) {
    //     var size = 0,
    //         key;
    //     for (key in obj) {
    //         if (obj.hasOwnProperty(key)) size++;
    //     }
    //     return size;
    // };

}
core.proto = proto;

module.exports = core;