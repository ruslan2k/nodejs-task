var express = require('express');
var router = express.Router();
var funcs = require('../libs/funcs');
var ShortUrl = require('../models/shorturl'); 

function _handleModelRes (res, successStatus) {
  return function (err, playload) {
    if (err) {
      console.error(err);
      res.status(err.code).send(err.message);
      return;
    }
    if (successStatus) {
      res.status(successStatus);
    }
    console.log("playload:" + playload);
    return playload;
  };
}

/* Get short urls list */
router.get('/', function (req, res) {
  //res.render('urls', {urls: [1, 2, 3]});
  //console.log(ShortUrl.getAll(next));
  //next();
  var urls = ShortUrl.getAll(_handleModelRes(res));
  console.log("urls:" + urls);
  res.render('urls', {"urls": urls});
});

router.post('/', function (req, res) {
  //res.send(req);
  new_uid = funcs.genUid();
  console.log(req.body.long_url);
  console.log(new_uid);
  res.send(getRandomString());
});

module.exports = router;
