var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs'),
    corngoose   = require('./api/js/corngoose');

var config      = cc(),
    app         = restify.createServer();

corngoose.startDB(process.env.MONGOHQ_URL || '//localhost/drc');

app.use(restify.queryParser());
app.use(restify.CORS());
app.use(restify.fullResponse());

// Routes
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
  corngoose.getCollection('examples', function(err, data){
    console.dir(data);
  });
});

app.get(/\/(css|js|img|icon|small-slides)\/?.*/, restify.serveStatic({directory: './static/'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') );
});
