var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');

/*Get short url */
router.get(/^\/([a-zA-Z]{6})$/, function (req, res) {
  var str_uid = req.params[0];
  var int_uid = funcs.strUidtoInt(str_uid);

  db.get("SELECT * FROM urls WHERE id = ?", int_uid, function (err, row) {
    console.log("err:" + err);
    console.log("row:" + row);
    if (err) {
      return next(err);
    } else if (row == undefined) {
      res.status(404);
      res.render('error', {error: 'Not found'});
    } else {
      //res.redirect(row.long_url);
      res.json({"str_uid": str_uid, "int_uid": int_uid, "url": row.long_url});
    }
  });
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index',
    {title: 'Shorter URL', short_url: req.query.short_url });
});

module.exports = router;
