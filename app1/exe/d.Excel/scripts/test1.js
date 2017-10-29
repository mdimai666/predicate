/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

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

casper.echo('Test OK!').exit();

