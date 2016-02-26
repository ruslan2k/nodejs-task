var express = require('express')
  , http = require('http')
  , app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('App on port 3000!');
});
