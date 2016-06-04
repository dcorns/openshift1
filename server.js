'use strict';
var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs'),
    corngoose   = require('corngoose');

var config      = cc(),
    app         = restify.createServer();

corngoose.startDB('drc');

app.use(restify.queryParser());
app.use(restify.CORS());
app.use(restify.fullResponse());
app.use(restify.bodyParser());

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// Routes
require('./api/routes/routes')(app);
console.log(process.argv);
let webRoot = process.argv[2] || './static/';
app.get(/\/(css|js|img|icon|small-slides)\/?.*/, restify.serveStatic({directory: webRoot}));

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.setHeader('Content-Security-Policy', "script-src 'self';" +
    "style-src 'self'");
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port);
});

//Add this line for testing with superTest
module.exports = app;