var express = require('express');
var router = express.Router();

/* Get short urls list */
router.get('/', function (req, res, next) {
  res.render('urls', {urls: [1, 2, 3]});
});

module.exports = router;
