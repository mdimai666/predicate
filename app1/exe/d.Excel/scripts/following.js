/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

var E = require('E');
//примерно затрачивается на получение смиска из 760 чел 3мин 30 сек и 180Мб ОЗУ

var casper = require("casper").create({
    waitTimeout: 30000,
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
var user = casper.cli.get(2);

if (!login || !pass) {
    casper.echo("not param").exit(1);
}

var following = true;
var foll = following ? "following" : "followers";

var f_error = function (msg) {
    msg = msg || "timeout terminate";
    if (doShotWhenError)
        E.saveError();
    casper.die("error: " + msg).exit();
};

E.coo.load(login);
E.insta.start(login, pass, followers, f_error, false, user);

var xx = require('casper').selectXPath;
var lang = E.lang();

var followersCount = 1;

function followers2() {

    var div = "main";
    var divli = "a";

    function getLiLength() {
        return casper.getElementsInfo(divli).length;
    };

    //var sdata = casper.evaluate(function (divli) {
    //    var nodes = document.querySelectorAll(divlia);
    //    for (var i = 0; i < (nodes.length / 2); i++)
    //        nodes[i].remove();
    //});

    E.saveError();

    casper.evaluate(function (divli) {
        //var nodes = document.querySelectorAll(divli);
        //for (var i = 0; i < (nodes.length); i++)
        //    nodes[i].parentElement.removeChild(nodes[i]);

        var ee = document.querySelectorAll(divli);
        for (var i = 0; i < ee.length; i++)
            ee[i].parentNode.removeChild(ee[i]);
    }, { divli: divli });

    E.saveError();

    casper.echo(">>>" + getLiLength());


}

function followers() {


    if (!E.insta.checkPrivate()) return;

    casper.waitForSelector("#react-root", (function () {
        var q = "a[href='/" + user + "/" + foll + "/']";

        this.echo(">search " + foll + "...")
            .echo(E.progress(10));

        var sdata = E.info();

        var media;
        if (following)
            media = sdata.entry_data.ProfilePage[0].user.follows.count;
        else
            media = sdata.entry_data.ProfilePage[0].user.followed_by.count;

        followersCount = media * 1;

        this.echo(foll + " count : " + followersCount);

        var url = this.getCurrentUrl();

        this.thenClick(q).then(function () {
            this.waitFor(function () {
                return url !== this.getCurrentUrl();
            }, followers_list, f_error);
        });

    }), f_error);
}

function followers_list() {

    var nos = [];
    var nos_exportedCount = 0;
    var nos_exportPullCount = 20;

    try {
        var div = "main";
        var divli = div + " li";
        var divlia = divli + " > div > div > a";
        casper.echo(">" + foll + " list");

        function getLiLength() {
            var li = casper.getElementsInfo(divli) || 0;
            if (li == 0) return 0;
            if (li[li.length - 1].text != "") li = li.length;
            else li = li.length - 1;
            return li + nos.length;
        };

        function getLiArray2(nohalf) {
            nohalf = nohalf || false;
            var ss = [];
            try {
                var nodes = casper.getElementsInfo(divlia);
                var L = (!nohalf) ? (nodes.length / 2) : nodes.length;
                for (var i = 0; i < L; i++)
                    ss[ss.length] = nodes[i].attributes.href.slice(1, -1);
                nos = nos.concat(ss);
                var sdata = casper.evaluate(function (divli, L) {
                    var nodes = document.querySelectorAll(divli);
                    for (var i = 0; i < L; i++)
                        nodes[i].remove();
                }, { divli: divli, L: L });
            } catch (e) {
                casper.echo(e);
            }
            return ss;
        }

        function ex_nos() {
            var aa = getLiArray2();
            nos_exportedCount += aa.length;
            casper.echo("result:" + aa.join(','));
        }

        function ex_nos_end() {
            var aa = getLiArray2(true);
            nos_exportedCount += aa.length;
            casper.echo("result:" + aa.join(','));
        }

        //function getLiArray() {
        //    var ss = "";
        //    try {

        //        var nodes = casper.getElementsInfo(divlia);
        //        for (var i = 0; i < nodes.length; i++)
        //            ss += (nodes[i].attributes.href.slice(1, -1)) + ',';//.slice(1, -1);
        //        //require('utils').dump(nodes[0].attributes.href.slice(1,-1));
        //    } catch (e) {
        //        casper.echo(e);
        //    }

        //    return ss;
        //}


        var list2 = function () {
            casper.echo(">list2_2");
            casper.scrollToBottom();
            scroll();
            //scrollEnd();
        };

        var scrolledCount = 0;

        function scroll() {
            ex_nos();
            scrolledCount = getLiLength();
            casper.echo("tick... " + scrolledCount + "..");

            try {
                var p = scrolledCount;
                p = (scrolledCount / followersCount * 100) | 0;//целое от деления
                casper.echo(E.progress(p));
            } catch (ex) {
                casper.echo(ex.msg);
            }

            if (scrolledCount < (followersCount)) {
                casper.scrollToBottom();
                casper.waitFor(function () { return (getLiLength() > scrolledCount) }, scroll, scrollEnd);
            } else
                scrollEnd();
            //waitLastDom();

        };

        function waitLastDom() {
            casper.scrollToBottom();
            //casper.waitFor(function () { return getLiLength() > scrolledCount}, scrollEnd, scrollEnd);

            casper.wait(2000, scrollEnd);
        }

        function scrollEnd() {
            try {
                ex_nos_end();
                casper.echo(">scrollEnd")
                    .echo("End count: " + nos_exportedCount);

                if (nos.length === followersCount) {
                    casper.echo(E.progress(100))
                        .echo("--OK");
                } else {
                    casper.echo("--ERROR");
                }
            } catch (ex) {
                casper.echo(ex);
            }
        }

        casper.waitForSelector(div, (function () {
            casper.echo(foll + " list...");
            //var nodes = casper.getElementsInfo(div + " li");
            //casper.echo("li counts = " + nodes.length);

            //var startLength = this.getElementsInfo(divli).length;

            this.waitFor(function () { return getLiLength() > 1 }, list2, f_error);

        }), f_error);
    } catch (ex) {
        E.saveError(ex.message);
    };
};


casper.run();