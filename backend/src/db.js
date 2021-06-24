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

//SCHEMA!!
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

//Delete all tables and data inside them. THIS IS JUST FOR TESTING PURPOSES 
//get rid of this code once initial testing is done.
// db.run(`DROP TABLE visits`);
// db.run(`DROP TABLE plates`);



//CRUD operations

//READ (SELECT)
module.exports.getVisits = (result) => {
  db.all(`SELECT 
            visit_id,
            visit_date,
            visits.plate_id,
            plate_number
          FROM
            visits
          INNER JOIN plates
            ON plates.plate_id = visits.plate_id`, 
            [], (err, rows) => {
    if (err) {
      throw err;
    }
    result(null, rows);
  });
}

module.exports.getSingleVisit = (visitId, result) => {
  db.all(`SELECT
            visit_id,
            visit_date,
            visits.plate_id,
            plate_number
          FROM
            visits
          INNER JOIN plates
            ON plates.plate_id = visits.plate_id
          WHERE visit_id = '${visitId}'`,
          [], (err, rows) => {
            if (err) {
              throw err;``
            }
            result(null, rows);
          })
}

module.exports.getPageVisits = (pageNumber, result) => {
  let start = Number((pageNumber - 1) * 10);
  let visitsPerPage = 10; 
  db.all(`SELECT
            visit_id,
            visit_date,
            plate_id
          FROM
            visits
          ORDER BY
            visit_id DESC
          LIMIT '${visitsPerPage}' OFFSET '${start}'`,
          [], (err, rows) => {
            if (err) {
              throw err;
            }
            result(null, rows);
          })
}

module.exports.getPageCount = (result) => {
  db.all(`SELECT COUNT(*)
          FROM visits`,
          [], (err, rows) => {
            if (err) {
              throw err;
            }
            let count = Math.ceil(rows[0]['COUNT(*)'] / 10);
            let pageCount = {
              total: count
            } 
            result(null, pageCount);
          })
}

module.exports.getTotalVisits = (plateId, result) => {
  db.all(`SELECT COUNT(*)
          FROM visits
          WHERE plate_id = '${plateId}'`,
          [], (err, rows) => {
    if (err) {
      throw err;
    }
    result(null, rows);
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

//CREATE (INSERT)
module.exports.insertVisit = (plate, timestamp) => {
  db.serialize(() => {
    db.run(`INSERT INTO plates(plate_number)
            VALUES(?)`,
            [plate],
          function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`A row in plates has been inserted with rowid ${this.lastID}`);
            })

    let selectPlateId = `SELECT
                            plate_id
                          FROM
                            plates
                          WHERE
                            plate_number = '${plate}'`
    db.all(selectPlateId, [], (err, rows) => {
      if (err) {
        throw err;
      }
      let plate_id = rows[0].plate_id;

      db.run(`INSERT INTO visits(plate_id, visit_date) 
              VALUES(?, ?)`, 
              [plate_id, Date(timestamp)], 
            function(err) {
              if (err) {
                return console.log(err.message);
              }
              console.log(`A row in visits has been inserted with rowid ${this.lastID}`);
            })
    });
  })
}

//UPDATE (UPDATE)
module.exports.updateVisit = (visitId, plateNumber) => {
  db.all(`SELECT COUNT(*)
          FROM
              plates
          WHERE
              plate_number = '${plateNumber}'`,
      [], function(err, count) {
        if (err) {
          return console.log(err.message);
        }
        let exists = (count[0]['COUNT(*)']);
        if (exists > 0) {
          db.all(`SELECT
                    plate_id
                  FROM
                    plates
                  WHERE
                    plate_number = '${plateNumber}'`,
                [], function(err, rows) {
                  if (err) {
                    return console.log(err.message);
                  }
                  let newPlateId = rows[0].plate_id;
                  db.run(`UPDATE visits
                          SET plate_id = '${newPlateId}'
                          WHERE visit_id = '${visitId}'`, 
                  [], function(err) {
                  if (err) {
                    return console.error(err.message);
                  }
                  console.log(`Row(s) updated: ${this.changes} with a pre-existing plate number.`);
                  });
              })
        }
        if (exists == 0) {
          db.run(`INSERT INTO 
                      plates(plate_number)
                      VALUES(?)`,
                      [plateNumber],
                    function(err) {
                      if (err) {
                        return console.log(err.message);
                      }
                      console.log(`A row in plates has been inserted with rowid ${this.lastID}`);

                        db.all(`SELECT
                                  plate_id
                                FROM
                                  plates
                                WHERE
                                  plate_number = '${plateNumber}'`,
                                  [], (err, rows) => {
                                  if (err) {
                                    throw err;
                                  }
                                  let plate_id = rows[0].plate_id;

                                  db.run(`UPDATE visits
                                          SET plate_id = '${plate_id}'
                                          WHERE visit_id = '${visitId}'`, 
                                  [], function(err) {
                                  if (err) {
                                    return console.error(err.message);
                                  }
                                  console.log(`Row(s) updated: ${this.changes} with a new plate number.`);
                                  });
                                  });
                                })
        }
      })
}

//DELETE (DELETE)
module.exports.deleteVisit = (visitId) => {
  console.log(visitId)
  let sql = `DELETE FROM visits 
              WHERE visit_id = '${visitId}'`
  db.run(sql, [], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  });
}


//Looks like the concensus on Google is that there really is no
//reason to close the DB ever... Just let it's process die with the app,
//when the app kills its process. I'll leave the code here in case I need it
//though. 
// module.exports.close = () => {
//     db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });
// }

