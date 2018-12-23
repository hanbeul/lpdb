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

module.exports.find = (query, callback) => {
  let plates = _db.collection('plates');
  plates.find({}).toArray(function(err, docs) {
    callback(docs);
  })
}

module.exports.close = function() {
  _db.close();
}
