// If using MySQL, install mysql2 package with npm install -S mysql2
//mysql2 npm package has support for Promises
var mysql = require('mysql');

//change database credentials as needed
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'attendance',
  charset: 'utf8mb4'
});

const addAttendance = function(today, name, day, callback) {
  connection.query(
    'INSERT INTO students (today, name, day) VALUES (?, ?, ?)',
    [today, name, day],
    (err, results, fields) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(results);
        callback(null, results);
      }
    }
  );
};

const addMessages = function(username, day, message, callback) {
  connection.query("INSERT INTO messages (username, day, message) VALUES (?, ?, ? )",
    [username, day, message],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const addBookmark = function(bookmark, callback){
  connection.query("INSERT INTO bookmarks (bookmark) VALUES (?)",
[bookmark],
(err, results) => {
  if(err){
    callback(err, null);
  }else{
    callback(null, results)
  }
})
}

const getBookmarks = function(callback){
  connection.query("SELECT * FROM bookmarks", (err, results, fields) => {
  if(err){
    callback(err, null);
  }else{
    callback(null, results)
  }
})
}

module.exports.addAttendance = addAttendance;
module.exports.addMessages = addMessages;
module.exports.addBookmark = addBookmark;
module.exports.getBookmarks = getBookmarks;
