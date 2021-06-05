  //Database testing
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the test SQlite database.');
  });

  // let sql = `SELECT DISTINCT Name name FROM playlists
  //            ORDER BY name`;

  // module.exports.all = () => {
  //   db.all(sql, [], (err, rows) => {
  //     if (err) {
  //       throw err;
  //     }
  //     rows.forEach((row) => {
  //       console.log(row.name);
  //     });
  //   });
  // }

  // db.run('CREATE TABLE langs(name text)');

  module.exports.insert = () => {
    db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      })
    }

  module.exports.update = () => {
    let data = ['Ansi C', 'C'];
    let sql = `UPDATE langs
                SET name = ?
                WHERE name = ?`;

    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    });
  }

  module.exports.delete = () => {
    let id = 1;
    db.run(`DELETE FROM langs WHERE rowid=?`, id, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) deleted ${this.changes}`);
    });
  }

  module.exports.close = () => {
      db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }








// const MongoClient = require('mongodb').MongoClient;

// let _db;
// let url = 'mongodb://localhost:27017';
// let dbName = 'lpdb';

// module.exports.init = async () => {
//   MongoClient.connect(url, function(err, client) {
//     if (err) {
//       console.log('An error has occured: ' + err);
//       return;
//     }
//     console.log("Connected successfully to server");
//     _db = client.db(dbName);
//   });
// }

// module.exports.insert = async (data) => {
//   _db.collection('plates').insertOne(data, (error, result) => {
//     if (error) {
//       console.log('An error has occured: ' + error);
//       return error;
//     }
//     console.log('Sucessfully inserted record!')
//   });
// }

// module.exports.find = async (query) => {
//   let output = [];
  
//   output = _db.collection('plates').find({}).sort({timestamp: -1}).limit(10).toArray();
//   return output;
// }

// module.exports.close = function() {
//   _db.close();
// }
