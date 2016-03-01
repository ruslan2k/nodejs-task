var express = require('express');
var router = express.Router();

/*Get short url */
router.get(/^\/([a-zA-Z]{6})$/, function (req, res) {
  var id = req.params[0];
  res.json({"id": id});
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index',
    {title: 'Shorter URL', short_url: req.query.short_url });
});

module.exports = router;
