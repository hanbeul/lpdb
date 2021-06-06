  //Database testing
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the test SQlite database.');
  });

  module.exports.getVisits = () => {
    let sql = `SELECT 
                visit_id,
                visit_date,
                plate_id
            FROM
                visits`
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.visit_id + ',' + row.plate_id + ',' + row.visit_date);
      });
    });
  }

  db.run(`CREATE TABLE IF NOT EXISTS visits (
                  visit_id integer PRIMARY KEY,
                  visit_date text,
                  plate_number text NOT NULL,
                  FOREIGN KEY (plate_number)
                    REFERENCES plates (plate_number)
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS plates (
                  plate_id integer PRIMARY KEY,
                  plate_number text NOT NULL UNIQUE,
                  total_visits integer
  )`)

  // db.run(`DROP TABLE visits`);
  // db.run(`DROP TABLE plates`);


  module.exports.insert = () => {
    db.run(`INSERT INTO visits(plate_id, visit_date) 
            VALUES(?, ?)`, 
            ['123456', Date()], 
          function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          })
        }

  module.exports.update = () => {
    let data = ['654321', '123456'];
    let sql = `UPDATE visits
                SET plate_id = ?
                WHERE plate_id = ?`;

    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    });
  }

  module.exports.delete = () => {
    let id = 1;
    let sql = `DELETE FROM visits 
               WHERE rowid = ?`
    db.run(sql, id, function(err) {
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
