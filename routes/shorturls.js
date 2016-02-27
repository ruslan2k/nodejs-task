var express = require('express');
var router = express.Router();

function getRandomString (l)
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var possible_length = possible.length;
  l = typeof l !== 'undefined' ? l : 6;

  for (var i = 0; i < l; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible_length));
  }

  return text;
}

/* Get short urls list */
router.get('/', function (req, res, next) {
  res.render('shorturls', {urls: [1, 2, 3]});
});

router.post('/', function (req, res) {
  //res.send(req);
  console.log(req.body);
  res.send(getRandomString());
});

module.exports = router;
