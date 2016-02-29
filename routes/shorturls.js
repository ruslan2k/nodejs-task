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

router.post('/', function (req, res) {
  //res.send(req);
  new_uid = funcs.genUid();
  console.log(req.body.long_url);
  console.log(new_uid);
  res.send(getRandomString());
});

module.exports = router;
