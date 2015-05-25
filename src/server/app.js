/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
GLOBAL.topshelfGlobals = {};

var express = require('express'),
    debug   = require('debug')('app:' + process.pid),
    db      = require('./config/mongoose'),
    chalk   = require('chalk'),
    config  = require('./config/environment');

// Expose App
var app = express();
// Remove the next lines up until var server and then remove var https line.
var fs = require('fs');
var key         = fs.readFileSync('./server.key', 'utf8');
var cert        = fs.readFileSync('./server.crt', 'utf8');
var credentials = {
  key: key,
  cert: cert
};
var server = require('http').createServer(app);
var https = require('https').createServer(credentials, app); // ssl
require('./components/validators');
require('./init')(); // dummy data
//require('./components/index')();
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  debug(chalk.yellow('Express is running on love',
      config.port, app.get('env')));
});
https.listen('8443', config.ip, function() {
  debug(chalk.blue('Express is running in SSL'))
});
process.on('uncaughtException', function(err) {
  debug(err);
});

exports = module.exports = app;
