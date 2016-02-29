var db = require('../db');

module.exports = {
  delete: function (id, callback) {
    //
  },

  get: function (id) {
    // int_id = stringToIntId(id);
  },

  getAll: function (callback) {
    console.log("callback:" + callback);
    db.all('SELECT * FROM urls', function (err, rows) {
      if (err) {
        callback(err);
        return;
      }
      console.log(rows);
      callback(null, rows);
    });
  },

  insert: function (data) {
    //    
  }

};
