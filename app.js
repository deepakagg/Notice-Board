var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var logger = require("./System/log");
var session = require('express-session');

var app = express();

app.use(bodyParser.json());
app.use(expressValidator([]));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secure_key',
  resave: true,
  saveUninitialized: false
}));

var user_router = require('./Application/User/router');
var comment_router = require('./Application/Comment/router');

app.use('/api/v1/user/', user_router.v1);
app.use('/api/v1/comment/', comment_router.v1);

module.exports = app;


if(require.main === module){
  var server = app.listen(3000, function(){
    logger.info('Listening on port %d', server.address().port);
  });
}
else{
  // for test env
  exports.app = app;
}