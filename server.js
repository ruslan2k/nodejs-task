var express = require('express')
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var shorturls = require('./routes/shorturls');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);
app.use('/shorturls', shorturls);

app.listen(3000, function () {
  console.log('App on port 3000!');
});

//module.exports = app;
