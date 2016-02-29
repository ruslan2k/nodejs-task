var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var db = require('../db');

/* Get short urls list */
router.get('/', function (req, res) {
  db.all("SELECT * FROM urls", function (err, rows) {
    res.json({"rows": rows});
  });
});

router.post('/', function (req, res, next) {
  new_uid = funcs.genUid();
  console.log(new_uid);
  long_url = req.body.long_url;
  db.run("INSERT INTO urls VALUES (?, ?, ?, ?)",
    [new_uid.int_uid, 0, new_uid.str_uid, long_url]);
  console.log(req.body.long_url);
  res.json({ok: "ok"});
});

module.exports = router;
