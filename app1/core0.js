/*jshint esversion: 6 */

var core = {

    req: '',
    res: '',

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
    }
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

module.exports = core;