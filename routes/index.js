var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index',
    {title: 'Shorter URL', short_url: req.query.short_url });
});

module.exports = router;
