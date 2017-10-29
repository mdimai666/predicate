/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

//
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
var users = casper.cli.get(2);
var doFollow = false;

var users = users.split(',');
var user1 = users[0];

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
E.insta.start(login, pass, unfollow, f_error, false, user1);

var xx = require('casper').selectXPath;

var lang;

var iteration = 0;

function unfollow_end() {
    casper.echo(E.progress(100)).echo("--OK");
}

function unfollow() {
    casper.echo("begin unfollow");
    lang = E.lang();
    casper.then(unfollow_next);
}

function unfollow_next() {

    if (iteration >= users.length) {
        unfollow_end();
        return;
    }

    var link = users[iteration];
    casper.echo("link -> " + link);
    var flink = "https://instagram.com/" + link;
    iteration++;
    if (link === user1)
        this.then(follow2);
    else
        //this.thenOpen(flink, follow2);
        this.open(flink,{headers: {'Accept-Language': 'en-US'}}).then(follow2);
    var p = (iteration / users.length * 100) | 0;
    casper.echo(E.progress(p))
}


function follow2() {
    casper.waitForSelector("#react-root", function () {
        try {
            var L = -1;
            var S = false;

            //status of follow
            S = E.insta.checkFollow();            
            //button num
            L = 1;
            
            casper.echo("status of follow = " + (S));
          
            if (doFollow != S) {
                casper.echo("try unfollow")
                casper.thenClick(xx("(//button)[" + (L + 1) + "]")).then(function () {
                    this.echo("...ok");
                });
                //return true;
            }
            else {
                casper.echo("action is not required");
                //return true;
            }
        }
        catch (ex) {

        }
        //call next
        this.then(unfollow_next);
    }, f_error);
};

casper.run();
