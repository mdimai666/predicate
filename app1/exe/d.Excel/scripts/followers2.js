/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

var E = require('E');
//примерно затрачивается на получение смиска из 760 чел 3мин 30 сек и 180Мб ОЗУ

var casper = require("casper").create({
    waitTimeout: 9000,
    viewportSize: {
        width: 320,
        height: 568
    },
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.98 Safari/537.36 Vivaldi/1.6.689.40"
    },
    clientScripts: ['jquery-3.1.1.slim.min.js']
});

var doShotWhenError = true;

var login = casper.cli.get(0);
var pass = casper.cli.get(1);
var user = casper.cli.get(2);

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
E.insta.start(login, pass, followers, f_error, false, user);

var xx = require('casper').selectXPath;

var followersCount = 1;

function followers() {
    casper.page.injectJs('jquery-3.1.1.slim.min.js');

    casper.waitForSelector("#react-root", (function () {
        var q = "a[href='/" + user + "/followers/']";

        this.echo(">search followers...")
            .echo(E.progress(10));

        var sdata = E.info();

        var media = sdata.entry_data.ProfilePage[0].user.followed_by.count;

        var id = sdata.entry_data.ProfilePage[0].user.id;

        //this is a test onlu file
        casper.echo(">>>id:" + id);

        followersCount = media * 1;

        this.echo("Followers count : " + followersCount);

        var url = this.getCurrentUrl();

        var nameCount = this.evaluate(function () {
            var names = $('link ').eq(1);
            return names.attr('hreflang');
        });
        this.echo(nameCount);

        //this.thenClick(q).then(function () {
        //    this.waitFor(function () {
        //        return url !== this.getCurrentUrl();
        //    }, followers_list, f_error);
        //});

    }), f_error);
}

function followers_list() {
    try {
        var div = "main";
        var divli = div + " li";
        var divlia = divli + " > div > div > a";
        casper.echo(">followers_list");

        var getLiLength = function () {
            return casper.getElementsInfo(divli).length;
        };

        function getLiArray() {
            var ss = "";
            try {

                var nodes = casper.getElementsInfo(divlia);
                for (var i = 0; i < nodes.length; i++)
                    ss += (nodes[i].attributes.href.slice(1, -1)) + ',';//.slice(1, -1);
                //require('utils').dump(nodes[0].attributes.href.slice(1,-1));
            } catch (e) {
                casper.echo(e);
            }

            return ss;
        }

        var list2 = function () {
            casper.echo(">list2");
            //this.scrollToBottom();
            //casper.echo("LL = " + getLiLength());

            //var nodes = casper.getElementsInfo(divlia);
            //require('utils').dump(nodes);

            scroll();

            //scrollEnd();
        };

        var scrolledCount = 0;

        function scroll() {
            scrolledCount = getLiLength() * 1;
            casper.echo("tick... " + scrolledCount + "..");

            try {
                var p = scrolledCount * 1;
                p = (scrolledCount / followersCount * 100) | 0;//целое от деления
                casper.echo(E.progress(p));
            } catch (ex) {
                casper.echo(ex.msg);
            }

            if (scrolledCount < followersCount) {
                casper.scrollToBottom();
                casper.waitFor(function () { return getLiLength() > scrolledCount }, scroll, scrollEnd);
            } else scrollEnd();
        };

        function scrollEnd() {
            casper.echo(">scrollEnd");
            casper.echo("End count: " + getLiLength())
                .echo(E.progress(100))
                .echo("result:" + getLiArray())
                .echo("--OK");
        }

        casper.waitForSelector(div, (function () {
            casper.echo("followers_list...");
            //var nodes = casper.getElementsInfo(div + " li");
            //casper.echo("li counts = " + nodes.length);

            //var startLength = this.getElementsInfo(divli).length;

            this.waitFor(function () { return getLiLength() > 1 }, list2, f_error);

        }), f_error);
    } catch (ex) {

    };
};


casper.run();