  //Connect DB
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the test SQlite database.');
  });

  //Turn foreign key constraints on
  db.get("PRAGMA foreign_keys = ON");


  //CRUD operations
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

  module.exports.getPlates = () => {
    let sql = `SELECT
                plate_id,
                plate_number
              FROM
                plates`
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.plate_id + ',' + row.plate_number)
      });
    });
  }

  module.exports.getPlateId = () => {
    let sql = `SELECT
                plate_id
              FROM
                plates
              WHERE
                plate_number = 'TEST001'`
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.plate_id)
      });
    });
  }

  db.run(`CREATE TABLE IF NOT EXISTS visits (
                  visit_id integer PRIMARY KEY,
                  visit_date text,
                  plate_id text NOT NULL,
                  FOREIGN KEY (plate_id)
                    REFERENCES plates (plate_id)
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS plates (
                  plate_id integer PRIMARY KEY,
                  plate_number text NOT NULL UNIQUE
  )`)

  // db.run(`DROP TABLE visits`);
  // db.run(`DROP TABLE plates`);


  // module.exports.insertPlate = () => {
  //   db.run(`INSERT INTO plates(plate_number)
  //           VALUES(?)`,
  //           ['TEST001'],
  //         function(err) {
  //           if (err) {
  //             return console.log(err.message);
  //           }
  //           console.log(`A row in plates has been inserted with rowid ${this.lastID}`);
  //           })
  // }

  module.exports.insertVisit = () => {
    db.serialize(() => {
      db.run(`INSERT INTO plates(plate_number)
              VALUES(?)`,
              [req.body.plate],
            function(err) {
              if (err) {
                return console.log(err.message);
              }
              console.log(`A row in plates has been inserted with rowid ${this.lastID}`);
              })
    })
      let selectPlateId = `SELECT
                  plate_id
                FROM
                  plates
                WHERE
                  plate_number = ${req.body.plate}`
      db.all(selectPlateId, [], (err, rows) => {
        if (err) {
          throw err;
        }
        let plate_id = rows[0].plate_id;

        db.run(`INSERT INTO visits(plate_id, visit_date) 
                VALUES(?, ?)`, 
                [plate_id, Date(req.body.timestamp)], 
              function(err) {
                if (err) {
                  return console.log(err.message);
                }
                console.log(`A row in visits has been inserted with rowid ${this.lastID}`);
              })
      });
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

