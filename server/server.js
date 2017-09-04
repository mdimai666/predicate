var connect = require('connect');
var serveStatic = require('serve-static');


var cfg = {
	port: 661,
	dir: __dirname + '\\..\\web',
}

connect().use(serveStatic(cfg.dir)).listen(cfg.port, function () {
	console.log(cfg.dir);
	console.log('Server running on {0}...'.format(cfg.port));
});


///PROTOTYPE

String.prototype.format = function () {
	var formatted = this;
	for (var i = 0; i < arguments.length; i++) {
		var regexp = new RegExp('\\{' + i + '\\}', 'gi');
		formatted = formatted.replace(regexp, arguments[i]);
	}
	return formatted;
};