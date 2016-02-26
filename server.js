var express = requre('express')
  , http = require('http')
  , app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
