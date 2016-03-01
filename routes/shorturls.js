var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');
var url_regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
/* Get short urls list */
router.get('/', function (req, res) {
  db.all("SELECT * FROM urls", function (err, rows) {
    res.json({"rows": rows});
  });
});

/* Create short url */
router.post('/', function (req, res, next) {
  new_uid = funcs.genUid();
  console.log(new_uid);
  long_url = req.body.long_url;
  console.log("regex:" + url_regex.test(long_url));
  if (! url_regex.test(long_url)) {
    res.status(500);
    res.render('error', {message: "Bad url"});
    return;
  }

  db.run("INSERT INTO urls VALUES (?, ?, ?, ?)",
    [new_uid.int_uid, 0, new_uid.str_uid, long_url]);
  console.log(req.body.long_url);
  //res.json({ok: "ok"});
  res.redirect('/?short_url=' + new_uid.str_uid);
});

module.exports = router;
