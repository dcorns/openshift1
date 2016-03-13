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

// Routes
require('./api/routes/routes')(app);

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});


app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') );
});
