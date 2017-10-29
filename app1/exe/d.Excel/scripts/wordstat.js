/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

var E = require('E');
//�������� ������������� �� ��������� ������ �� 760 ��� 3��� 30 ��� � 180�� ���

var casper = require("casper").create({
    waitTimeout: 30000,
    viewportSize: {
        width: 1004,
        height: 768
    },
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.98 Safari/537.36 Vivaldi/1.6.689.40",
        loadImages: false,
    },
    // logLevel: "debug",
    logLevel: "error",
    verbose: true
});
// casper.options.waitTimeout = 1000;

var doShotWhenError = true;

var login = casper.cli.get(0);
var pass = casper.cli.get(1);
var user = casper.cli.get(2);

var followers_limit = casper.cli.get(3);

if (!login || !pass) {
    casper.echo("not param").exit(1);
}

var following = false;
var foll = following ? "following" : "followers";

var WORD = "www";

//////////////////////////////////////////////////////////////////////
////// START PARAM
//////////////////////////////////////////////////////////////////////
// var site_url = "https://wordstat.yandex.ru/#!/?words=sacred";
// var site_url = "http://vmir.su/";

// var fillform = {
//     selector: "form[action='http://vmir.su/']", 
//     values: { login_name: login, login_password: pass },
//     isChangeUrlAjax: false,
// }

// var checkAuthfunc = function(){
//     var v = casper.evaluate(function () {
//         var v = document.querySelectorAll("a[href='/?do=register']").length;
//         return v
//     });

//     return v === 0;
// }

//////////////////////////////////////////////////////////////////////
////// START PARAM YANDEX
//////////////////////////////////////////////////////////////////////
// var site_url = "https://wordstat.yandex.ru/#!/?words=sacred";
var site_url = "https://direct.yandex.ru/registered/main.pl?checkboxes=1&cmd=wordstat&from_forecast=1&tm=&geo=0";

var fillform = {
    // selector: '.b-wordstat-content.i-bem.b-wordstat-content_js_inited', 
    selector: 'form',
    values: {
        login: login,
        passwd: pass
    },
    isChangeUrlAjax: false,
}

var checkAuthfunc = function () {
    // var v = casper.evaluate(function () {
    //     var v = document.querySelectorAll(".b-head-userinfo .b-head-userinfo__entry .b-link__inner").length;
    //     return v
    // });

    // return v === 0;

    var url = casper.getCurrentUrl();
    url = E.tool.extractHostname(url);
    return url !== "passport.yandex.ru";

}

//////////////////////////////////////////////////////////////////////
////// SCRIPT
//////////////////////////////////////////////////////////////////////




var f_error = function (msg) {
    msg = msg || "timeout terminate";
    if (doShotWhenError)
        E.saveError();
    casper.die("error: " + msg).exit();
};

E.coo.load(login);
E.insta.start(login, pass, vmir_h1, f_error, false, site_url, fillform, checkAuthfunc);

// casper.start(site_url, vmir_h1);

var xx = require('casper').selectXPath;
// var lang = E.lang();

var followersCount = 1;
var toDoCount = 1;

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
    }, {
        divli: divli
    });

    E.saveError();

    casper.echo(">>>" + getLiLength());


}

function followers() {

    casper.echo('followers');
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

        //
        //from follower list item
        //var ww = casper.evaluate(function (q) {
        //    return window._sharedData.qe;// document.querySelectorAll(q);
        //}); //if have append param use = {obj:obj}

        //try {
        //    var fs = require('fs');
        //    var util = require('util');
        //    fs.write('./dump/data-init.json', util.inspect(ww), 'w');
        //} catch (e) { casper.echo(e); };
        //
        if (followers_limit === undefined)
            toDoCount = followersCount;
        else
            toDoCount = (followersCount < followers_limit) ? followersCount : followers_limit;

        this.echo(foll + " count: " + followersCount + ' limit count: ' + toDoCount);

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
                }, {
                    divli: divli,
                    L: L
                });
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
                p = (scrolledCount / toDoCount * 100) | 0; //����� �� �������
                casper.echo(E.progress(p));
            } catch (ex) {
                casper.echo(ex.msg);
            }
            //if it limit max
            if (scrolledCount < toDoCount) {
                casper.scrollToBottom();
                casper.waitFor(function () {
                    return (getLiLength() > scrolledCount)
                }, scroll, scrollEnd);
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

                if (nos.length >= toDoCount) {
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

            this.waitFor(function () {
                return getLiLength() > 1
            }, list2, f_error);

        }), f_error);
    } catch (ex) {
        E.saveError(ex.message);
    };
};

function log(txt) {
    casper.echo(txt);
}



function vmir_h1() {
    casper.echo(">script start!");
    // casper.waitForSelector("body", start, f_error, 1000);
    casper.waitForSelector("body", test2, f_error, 1000);

    function start() {
        try {

            E.f_shot("dima.jpg");

            var sel = "#dle-content > .base.shortstory > .dpad > .btl"; //vmir.su
            // var sel = ".b-wordstat-content__content .l-content__c .b-word-statistics__tr .b-link";
            var nodes = casper.getElementsInfo(sel);
            var L = nodes.length;

            log("FOUND: " + L);
            log('_________');

            var ss = [];
            for (var i = 0; i < L; i++) {
                ss[ss.length] = nodes[i].text; //.attributes.href.slice(1, -1);
                log(ss[i])
            }

        } catch (ex) {
            // casper.echo(ex);
            E.saveError(ex.message);
        };

        return false;
    }

    function test1() {
        var url = casper.getCurrentUrl();
        url = E.tool.extractHostname(url);
        log('>' + url);
        "passport.yandex.ru"
        E.f_shot("dima.jpg");

    }

    function test2() {
        // exit_ifCapcha();
        // doWait();

        casper.then(function(){
            doWait();
            // exit_ifCapcha();
        });


        casper.then(function () {
            E.f_shot("test2.jpg");
            // casper.fillform("form.b-wordstat-form", {
            //     text: 'sacred'
            // }, true);

            log('>fill-form');
            this.fillSelectors("form.b-wordstat-form", {
                'input[type="text"]': WORD,
            }, false);

            casper.thenClick("form.b-wordstat-form input[type=submit]:not([class])", function () {
                E.f_shot("test2.jpg");
            })

        });
        // exit_ifCapcha();
        // doWait();

        casper.then(function(){
            doWait();
            // exit_ifCapcha();
        });

        casper.then(function () {
            log('>do array');
            // casper.waitForSelector("body", sa11, f_error, 4000);
            E.f_shot("test2_1.jpg");
            var w = doList("#left-table .tlist td:nth-child(2) a");
            var c = doList("#left-table .tlist td:nth-child(3)");

            do_completley_save(w, c);

            //.pages > nobr a:last-child
        });


    }
}

function randomWait() {
    return E.math.random(1000, 2000);
}

function doWait() {
    casper.then(function () {
        var v = randomWait();
        log('-wait: ' + v + ' millis');
        casper.wait(v);
    })
    return this;
}

function do_SearchesCount() {
    var count = casper.getElementsInfo("table.campaign td:nth-child(1) .smaller");
    count = (count[0].text + "").replace(/\D+/g, '');
    return count;
}

function doList(sel) {
    try {
        var nodes = casper.getElementsInfo(sel);
        var L = nodes.length;

        log("FOUND: " + L);
        log('_________');



        var ss = [];
        for (var i = 0; i < L; i++) {
            ss[ss.length] = nodes[i].text; //.attributes.href.slice(1, -1);
            // log(ss[i])
        }

        return ss;



    } catch (ex) {
        // casper.echo(ex);
        E.saveError(ex.message);
    };
}

function do_saveJSON(filename, varibleObject) {
    var fs = require('fs');
    fs.write('save/' + filename, JSON.stringify(varibleObject, null, '  '), 'w');
}

function do_completley_save(arrWordsm, arrUsedCount) {

    var count = do_SearchesCount();

    var save = {
        word: WORD,
        count: count,
        data: {
            n: arrWordsm,
            c: arrUsedCount,
        },
    }

    do_saveJSON('output.json', save);
}

function id_detectCapcha() {
    var nodes = casper.getElementsInfo("div.p-captcha");
    log('!CAPCHA DETECTED!');
    return nodes.length > 0;

    /*

div.p-captcha
form.b-captcha-form
.input__control
document.querySelectorAll(".input__control")[0].value = "11";

*/
}

function exit_ifCapcha() {
    // casper.then(function () {
        if (id_detectCapcha())
            casper.exit(0);
    // });
    // return this;
}

casper.run();
//--output-encoding=cp866
//--output-encoding=cp866