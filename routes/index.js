var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');

/* Redirect short url */
router.get(/^\/([a-zA-Z]{6})$/, function (req, res, next) {
  var str_uid = req.params[0];
  var int_uid = funcs.strUidtoInt(str_uid);
  var long_url;

  db.get("SELECT * FROM urls WHERE id = ?", int_uid, function (err, row) {
    if (err) {
      throw err;
    } else if (row == undefined) {
      res.status(404);
      res.render('error', {message: 'Not found'});
    } else {
      res.redirect(row.long_url);
    }
  });
  db.run("UPDATE urls SET counter=counter + 1 WHERE id = ?", int_uid);
});

/* GET home page. */
router.get('/', function (req, res) {
  var int_uid = req.query.int_uid;
  db.get("SELECT * FROM urls WHERE id = ?", int_uid, function (err, row) {
    if (err) {
      throw err;
    } else if (row !== undefined) {
      res.render('index', {
        short_url: row.path,
        proto: req.protocol,
        host: req.get('host'),
        long_url: row.long_url,
      });
    } else {
      res.render('index');
    }
  });
});

module.exports = router;
