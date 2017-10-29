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
    }
});

var doShotWhenError = true;

var login = casper.cli.get(0);
var pass = casper.cli.get(1);
var user = casper.cli.get(2);

var pCount = casper.cli.get(3) || 1;

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
E.insta.start(login, pass, liking, f_error, false, user);


var xx = require('casper').selectXPath;

var lang = E.lang();

var followersCount = 1;



function liking() {
    
    try {
        this.echo(">liking");

        if (!E.insta.checkPrivate()) return;

        var div = "main > article > div > div";
        var rolebutton = "a[role = 'button']";
        var likespan = rolebutton + " > span";

        var coreSpriteHeartFull = "coreSpriteHeartFull";

        var LikeText = "Like";

        var sdata = E.info();

        var media = sdata.entry_data.ProfilePage[0].user.media;

        if (media.nodes === undefined || !media.nodes || media.nodes.length===0) {
            f_error("posts not found!");
            return;
        }

        //BQfOFO5jGkSppoCz0qCg5rOJJ-z_7z0LjTWVQE0/

        var mcount = (pCount > media.count) ? media.count : pCount

        function plike(code, cindex, needLike) {
            casper.thenOpen("https://www.instagram.com/p/" + code + "/", function () {
                casper.waitForSelector(likespan, (function () {

                    try {
                        var e = this.getElementsInfo(likespan);
                        var isLiked = e[0].text == ((lang == "ru") ?"Не нравится":"Unlike");
                        if (needLike != isLiked) {
                            this.thenClick(rolebutton).then(function () {
                                this.echo(code + " - liked");
                            });
                        }
                        else {
                            this.echo(E.progress((cindex / (mcount * 1) * 100) | 0))
                                .echo(code + " - like is not require");
                        }
                    } catch (ex) {

                    }
                    var pr = (cindex / (mcount * 1) * 100);
                    if (pr > 1)
                        this.echo(E.progress(pr | 0));

                }), f_error);
            });
        }

        for (var i = 0; i < mcount; i++) {
            var p1 = media.nodes[i].code;
            plike(p1, i, true);
        }

        casper.then(function () { casper.echo(E.progress(100)).echo("--OK"); });
    } catch (ex) {
        f_error(ex)
    }
}

casper.run();
