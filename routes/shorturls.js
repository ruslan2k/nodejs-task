var express = require('express');
var basicAuth = require('basic-auth');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');
var url_regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

var auth = function (req, res, next) {

  function unauthorized (res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }
  if (user.name === 'admin' && user.pass === 'nimda') {
    return next();
  } else {
    return unauthorized(res);
  }
};

/* Get short urls list */
router.get('/', auth, function (req, res) {
  db.all('SELECT * FROM urls ORDER BY counter DESC', function (err, rows) {
    res.render('shorturls', {
      'shorturls': rows,
      'proto': req.protocol,
      'host': req.get('host'),
    });
  });
});

/* Create short url */
router.post('/', function (req, res, next) {
  var new_uid = funcs.genUid();
  var long_url = req.body.long_url;

  if (! url_regex.test(long_url)) {
    var err = new Error("Url ont valid");
    err.status = 500;
    throw err; 
  }

  if (! /^https?:\/\//.test(long_url)) {
    long_url = 'http://' + long_url;
  }

  db.run("INSERT INTO urls VALUES (?, ?, ?, ?)",
    [new_uid.int_uid, 0, new_uid.str_uid, long_url]);

  res.redirect('/?int_uid=' + new_uid.int_uid);
});

module.exports = router;
