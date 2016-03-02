var fs = require("fs")
  , db_file = "db.sq3"
  , exists = fs.existsSync(db_file);

if (!exists) {
  console.log("Creatind DB file.")
  fs.openSync(db_file, "w");
}

var sqlite3 = require("sqlite3").verbose()
  , db = new sqlite3.Database(db_file);

db.serialize(function () {
  if (!exists) {
    db.run(
      "CREATE TABLE IF NOT EXISTS urls ("
        + "id INTEGER PRIMARY KEY,"
        + "counter INT,"
        + "path CHAR,"
        + "long_url CHAR(256)"
        + ")"
    );
  }

  // var stmt = db.prepare("INSERT INTO urls VALUES (?, ?, ?, ?)");
  // var rnd;
  // for (var i = 0; i < 10; i++) {
  //   rnd = 500 - i;
  //   stmt.run([i, 0, rnd, "http://google.com"]);
  // } 

  // stmt.finalize();

});

db.close();
