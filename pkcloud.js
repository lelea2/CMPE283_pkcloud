/**
 * Module dependencies
 */

var express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  csrfCrypto = require('csrf-crypto'),
  expressHbs = require('express-handlebars'),
  routes = require('./routes'),
  middleware = require('./routes/middlewares/setupOpenStack'),
  http = require('http'),
  https = require('https'),
  path = require('path');

var app = module.exports = express();

/**
 * Middleware for JSON-ify MessageBodyReader
 */
app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json())
app.use(methodOverride());

/** Middleware interceptor enforce CSRF on every request */
app.use(cookieParser('keycatboard'));
app.use(csrfCrypto({ key: 'cmpe283project' }));
app.use(csrfCrypto.enforcer());

app.use(function(req, res, next) {
    if(res.getFormToken !== undefined) {
        res.locals._csrf = res.getFormToken();
    }
    next();
});

//Setting default port to run node client
app.set('port', process.env.PORT || 8000);

//Using handlebar helper on both client and server side
//http://codyrushing.com/using-handlebars-helpers-on-both-client-and-server/
app.engine('hbs', expressHbs({
    extname:'.hbs',
    defaultLayout:'main.hbs',
    helpers: require("./public/js/handlebar-helpers/helpers.js").helpers, // same file that gets used on our client
    partialsDir: "views/partials/", // same as default, I just like to be explicit
    layoutsDir: "views/layouts/" // same as default, I just like to be explicit
}));
app.set('view engine', 'hbs');

/***************************************************/
/***************** Handle Routing ******************/
/***************************************************/

app.get('/signin', middleware.authenticateOSClient(), routes.signin);
app.get('/dashboard', middleware.authenticateOSClient(), routes.dashboard);
app.get('/createInstance', middleware.authenticateOSClient(), routes.instances);

app.post('/createImage', routes.createImage);
app.post('/createServer', routes.createServer);


/**** Handle static files loaded, include caching, gzip ****/
var oneWeek = 7 * 24 * 3600 * 1000; //caching time in miliseconds
// New call to compress content
app.use(compression());
app.get('*', express.static(path.join(__dirname, 'public'), { maxAge: oneWeek }));

/**
 * Start Server on port given or default port
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//https.createServer(options, app).listen(443);


