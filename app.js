
/**
 * Module dependencies
 */

var express = require('express'),
  api = require('./routes/api'),
  fs = require('fs'),
  spdy = require('spdy'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 1066);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://localhost:1065');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);


// JSON API
app.get('/api/name', api.name);

/**
 * Start Server
 */
var options = {
  key: fs.readFileSync('keys/spdy-key.pem'),
  cert: fs.readFileSync('keys/spdy-cert.pem')
};

/**
 * SPDY-wrapped server with express instance
 */
spdy.createServer(options, app).listen(app.get('port'), function(){
  console.log('SPDY Express server listening on port ' + app.get('port'));
});

