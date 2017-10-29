var fs = require('fs');

function saveError() {
    function byteToHex(byte) {
        return ('0' + byte.toString(16)).slice(-2);
    }

    function generateId(len) {
        var arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return [].map.call(arr, byteToHex).join("");
    }

    var dt = moduleE_dateformat();

    var filename = dt + generateId(10) + ".jpg";

    //casper.echo(filename);
    moduleE_f_shot("E_" + filename);
}

function moduleE_f_shot(filename) {
    if (!!filename && /\.(png|jpg|pdf)$/i.test(filename)) {
        casper.captureSelector('Log\\' + filename, "html")
            //.echo("moduleE_f_shot");
            .echo(error_screenshotfile(filename));
    };
};

function moduleE_dateformat() {
    var d = new Date();

    return (("00" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("00" + d.getDate()).slice(-2) + "-" +
        d.getFullYear() + "-" +
        ("00" + d.getHours()).slice(-2) + "-" +
        ("00" + d.getMinutes()).slice(-2) + "-" +
        ("00" + d.getSeconds()).slice(-2) + "=");
};

var old_progress = 0;

function progress(p) {
    p = p * 1;
    p = p > 100 ? 100 : p;
    if (p > old_progress) {
        old_progress = p;
        return "progress:" + p + ";";
    } else {
        return "progress:" + old_progress + ";";
    }
}

function error_screenshotfile(fn) {
    return "error_screenshotfile:" + fn + ";";
}

//<p id="slfErrorAlert" aria-atomic="true" role="alert">��������� ���� ��� ������������ �� ����������� ��������. ��������� ���� ��� ������������ � ��������� �������.</p>

function get_info() {
    var sdata = casper.evaluate(function (q) {
        return links = window._sharedData; // document.querySelectorAll(q);
    }); //if have append param use = {obj:obj}
    return sdata;
    //var media = sdata.entry_data.ProfilePage[0].user.followed_by.count;
}


//coo

var cookieFolder = 'coo\\';
var cookieExt = '.coo';

var coo = {

    save: function (login) {
        var cookies = JSON.stringify(phantom.cookies);
        fs.write(cookieFolder + login + cookieExt, cookies, "w");
    },

    load: function (login) {
        var cookieFileName = cookieFolder + login + cookieExt;
        if (fs.exists(cookieFileName)) {
            var cookies = fs.read(cookieFileName);
            phantom.cookies = JSON.parse(cookies);
            casper.echo(">coo - load");
            return true;
        } else {
            casper.echo(">coo - not found");
            return false;
        }
    },
};

function isAuthorize() {
    var v = casper.evaluate(function () {
        var v = document.querySelectorAll("a[href='/?do=register']").length;
        return v
    });

    return v === 0;


    // return true;
    // var info = get_info();
    // var viewer = info.config.viewer;
    // if (!viewer)
    //     casper.echo(">viewer: none");
    // else
    //     casper.echo(">viewer ok: " + viewer.username);
    // return (!!viewer);
}

function lang() {
    var lang = casper.evaluate(function () {
        //var lang = document.querySelector("html").getAttribute("lang");
        //return lang;
        return document.documentElement.lang;
    });
    //var lang = get_info();
    //lang = lang.language_code;
    return lang;
}

function log(txt) {
    casper.echo(txt);
}

///////////////////////
//INSTA TOOLS

//wait selector


var insta = {
    start: function (login, pass, f_after, f_error, onlylogin, site_url, fillform, checkAuthFunc) {
        onlylogin = onlylogin || false;
        // site_url = site_url || login;
        var s_selector = "body";
        //casper.on("page.error", function (msg, trace) {
        //    this.echo("Error:    " + msg, "ERROR");
        //    this.echo("file:     " + trace[0].file, "WARNING");
        //    this.echo("line:     " + trace[0].line, "WARNING");
        //    this.echo("function: " + trace[0]["function"], "WARNING");
        //    errors.push(msg);
        //});

        try {
            casper.start(site_url, function () {
                casper.page.customHeaders = {
                    // 'Accept-Language': 'en-US',
                    'Accept-Language': 'ru-RU',
                };
                this.echo(">start").echo(progress(1));
                //wait whne load
                this.waitForSelector(s_selector, (function () {
                    //get json authorize state
                    var isAuthorize2 = checkAuthFunc();
                    // casper.echo("isAuthorize" + (isAuthorize2?'11+':'00+'));
                    //if use cookie
                    if (isAuthorize2) {
                        this.echo("logined from cookie");
                        if (onlylogin)
                            this.echo(progress(100)).echo("--OK");
                        else
                            this.then(f_after);
                    } else {
                        // this.thenOpen("https://instagram.com/accounts/login/?next=%2F" + site_url + "%2F", function () {
                        this.thenOpen(site_url, function () {
                            this.waitForSelector(s_selector, function () {
                                //try auth
                                this.echo("login..").
                                echo(progress(5));
                                

                                var url = this.getCurrentUrl();
                                //fill form
                                // this.fill('form', { login: login, passwd: pass }, true);
                                // this.fill("form[action='http://vmir.su/']", { login_name: login, login_password: pass }, true);
                                
                                // moduleE_f_shot("progress4.png");

                                this.fill(fillform.selector, fillform.values, true);
                                //input[name="login"]#b-domik_popup-username
                                //input[name="passwd"]#b-domik_popup-password
                                // this.fillSelectors(fillform.selector, {
                                //     'input[name="login"]#b-domik_popup-username':    login,
                                //     'input[name="passwd"]#b-domik_popup-password':    pass,
                                // }, true);


                                // moduleE_f_shot("progress5.png");

                                //check have button
                                var tryLogin = function () {
                                    this.echo(E.progress(6));
                                    this.waitForSelector(s_selector, function () {
                                        var isAuthorize2 = checkAuthFunc();

                                        //if we auth
                                        if (isAuthorize2) {
                                            coo.save(login); //save cookie
                                            this.echo(">authorized");

                                            if (onlylogin)
                                                this.echo(progress(100)).echo("--OK");
                                            else
                                                this.then(f_after); //do next func

                                        } else
                                            f_error("Can't login");

                                    }, checkVirifyAlert);
                                };

                                //check veryfi message
                                function checkVirifyAlert() {
                                    /*var lang = lang();
                                    var ee;
                                    if(lang==='ru')
                                      ee = casper.getElementsInfo("input[value='����������� �� ��. �����']");
                                     else
                                      ee = casper.getElementsInfo("input[value='Verify by Email']");
                                      */
                                    var ee = casper.getElementsInfo("input[name='sms']");

                                    if (ee.length > 0)
                                        casper.echo('--need_verify!').exit(1);
                                    else
                                        f_error();
                                };

                                // wait form action end
                                if (fillform.isChangeUrlAjax) {
                                    this.waitFor(function () {
                                        return url !== this.getCurrentUrl();
                                    }, tryLogin, f_error);
                                } else
                                    this.waitForSelector('body', tryLogin, f_error);


                            }, f_error);
                        }, f_error);
                    }

                }), f_error);
            });
            //start end
        } catch (e) {
            casper.echo(e);
        }

    },
    checkPrivate: function () { //if true we can continue liking
        var r = false; //we can follow if true
        var info = get_info().entry_data.ProfilePage[0].user;

        //"followed_by_viewer": false,
        //"has_blocked_viewer": false,
        //"follows_viewer": false,
        //"requested_by_viewer": false,
        //"blocked_by_viewer": false,
        //is_private
        var i = {
            f: info.followed_by_viewer,
            b: info.has_blocked_viewer,
            p: info.is_private,
            bv: info.blocked_by_viewer
        };

        if (i.b)
            casper.echo("WARNING: This user blocked you")
        else if (i.bv)
            casper.echo("WARNING: You blocked this user")
        else if (i.p && !i.f)
            casper.echo("WARNING: Account is private and you not followers")
        else
            r = true;

        return r;
    },
    checkFollow: function () {
        var r = false; //we can follow if true
        var info = get_info().entry_data.ProfilePage[0].user;

        return info.followed_by_viewer;
    }
}

///////////////extract
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }
    return domain;
}

/////////////////MAth
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


///////////////////////
//EXPORT

module.exports = {
    foo: function () {
        // whatever
    },
    bar: function () {
        // whatever
    },
    saveError: saveError,
    progress: progress,
    f_shot: moduleE_f_shot,
    info: get_info,
    coo: coo,
    isAuthorize: isAuthorize,
    insta: insta,
    dump: function (e) {
        utils.dump(e);
    },
    lang: lang,
    tool: {
        extractHostname: extractHostname,
        extractRootDomain: extractRootDomain,
    },
    math: {
        random: getRandomInt,
    }
};