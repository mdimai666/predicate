/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

//follow mdimai000 ggxxrr shop false
var E = require('E');

var casper = require("casper").create({
    waitTimeout: 9000,
    viewportSize: {
        width: 320,
        height: 568
    },
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.98 Safari/537.36 Vivaldi/1.6.689.40"
    }
});

var doShotWhenError = true;

var login = casper.cli.get(0);
var pass = casper.cli.get(1);
var filename = casper.cli.get(2);

if (!login || !pass) {
    casper.echo("not param").exit(1);
}

var f_error = function (msg) {
    msg = msg || "timeout terminate";
    if (doShotWhenError)
        E.saveError();
    casper.die("error: " + msg).exit();
};


E.coo.load(login);
E.insta.start(login, pass, null, f_error, true);
casper.run();
