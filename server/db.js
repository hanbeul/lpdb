const MongoClient = require('mongodb').MongoClient;

let _db;
let url = 'mongodb://localhost:27017';
let dbName = 'lpdb';

module.exports.init = function() {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('An error has occured: ' + err);
      return;
    }
    console.log("Connected successfully to server");
    _db = client.db(dbName);
  });
}

module.exports.insert = function(data) {
  plates.insert(data, (error, result => {
    if (error) {
      console.log('Error inserting into database: ' + error);
      return error;
    }
    if (result.ok) {
      console.log('Successfully inserted %d records.', result.n);
    }
  }));
}

module.exports.find = async (query, callback) => {
  let output = [];
  
  output = _db.collection('plates').find({}).toArray();
  return output;
}

module.exports.close = function() {
  _db.close();
}
