var CronJob = require('cron').CronJob;



///////////////////////////////////////////
//  watch dog task

function run_job(tick_action) {

    //every two hour
    var job = new CronJob('0 */2 * * *', function () {
        /*
         * Runs every weekday (Monday through Friday)
         * at 11:30:00 AM. It does not run on Saturday
         * or Sunday.
         */

        tick_action();

        console.log("tick");

    }, function () {
        /* This function is executed when the job stops */
    },
        true /* Start the job right now */
        /*timeZone*/ /* Time zone of this job. */
    );
}


///////////////////////////////////////////
// Controller reset func

var app_name = "Automato_controller.exe";
var app_path = "\\app\\Automato_controller\\";
var app_full = __dirname + app_path.concat(app_name);

function app_reset() {
    try {

        cmd("cmd /k taskkill /im " + app_name + " /f");
        console.log("kill");
        setTimeout(function () {
            cmd("cmd /k " + app_full);
            console.log("start");
        }, 1000);

        
    } catch (ex) {
        console.log(ex);
    }
}

///////////////////////////////////////////
//cmd exec

function cmd(_cmd) {
    var exec = require('child_process').exec;
    //var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';

    exec(_cmd, function (error, stdout, stderr) {
        // command output is in stdout
        console.log(stdout);
    });
}

///////////////////////////////////////////
// Init 

// add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

console.log('///////////////////////////////////////////');
console.log('watch-dog start!');
console.log(app_full);
console.log('///////////////////////////////////////////');

run_job(function () {
    app_reset();
});