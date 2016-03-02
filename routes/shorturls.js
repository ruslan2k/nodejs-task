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
  var new_uid = funcs.genUid();
  var long_url = req.body.long_url;
  console.log(new_uid);
  console.log("regex:" + url_regex.test(long_url));
  if (! url_regex.test(long_url)) {
    var err = new Error("Bad url");
    err.status = 500;
    throw err; 
  }

  if (! /^https?:\/\//.test(long_url)) {
    console.log('prefix exists');
    long_url = 'http://' + long_url;
  }

  db.run("INSERT INTO urls VALUES (?, ?, ?, ?)",
    [new_uid.int_uid, 0, new_uid.str_uid, long_url]);

  res.redirect('/?short_url=' + new_uid.str_uid);
});

module.exports = router;
