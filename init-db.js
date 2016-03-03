var fs = require('fs');
var funcs = require('./libs/funcs');
var db_file = "db.sq3";
var exists = fs.existsSync(db_file);
var sqlite3 = require("sqlite3").verbose()

if (!exists) {
  console.log("Creatind DB file.")
  fs.openSync(db_file, "w");
}

var db = new sqlite3.Database(db_file);

db.serialize(function () {
  if (!exists) {
    db.run(
      "CREATE TABLE IF NOT EXISTS urls ("
        + "id INTEGER PRIMARY KEY,"
        + "counter INT,"
        + "path CHAR,"
        + "long_url CHAR"
        + ")"
    );

    var a = ["https://github.com", "http://www.inkitt.com"];

    for (var i = 0; i < a.length; i++) {

      var uid = funcs.genUid();
      db.run("INSERT INTO urls VALUES (?, ?, ?, ?)",
        [uid.int_uid, 0, uid.str_uid, a[i]]);
    }
  }

  //var stmt = db.prepare("INSERT INTO urls VALUES (?, ?, ?, ?)");
  //var rnd;
  // for (var i = 0; i < 10; i++) {
  //   rnd = 500 - i;
  //   stmt.run([i, 0, rnd, "http://google.com"]);
  // } 

  // stmt.finalize();

});

db.close();
