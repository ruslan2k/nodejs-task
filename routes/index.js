var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');

/* Get short url */
router.get(/^\/([a-zA-Z]{6})$/, function (req, res, next) {
  var str_uid = req.params[0];
  var int_uid = funcs.strUidtoInt(str_uid);
  var long_url;

  db.get("SELECT * FROM urls WHERE id = ?", int_uid, function (err, row) {
    console.log("err:" + err);
    console.log("row:" + row);
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
  res.render('index',
    { title: 'Shorter URL',
      short_url: req.query.short_url,
      proto: req.protocol,
      host: req.get('host')
    });
});

module.exports = router;
