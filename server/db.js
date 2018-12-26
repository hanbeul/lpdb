const MongoClient = require('mongodb').MongoClient;

let _db;
let url = 'mongodb://localhost:27017';
let dbName = 'lpdb';

module.exports.init = async () => {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log('An error has occured: ' + err);
      return;
    }
    console.log("Connected successfully to server");
    _db = client.db(dbName);
  });
}

module.exports.insert = async (data) => {
  _db.collection('plates').insertOne(data, (error, result) => {
    if (error) {
      console.log('An error has occured: ' + error);
      return error;
    }
    console.log('Sucessfully inserted record!')
  });
}

module.exports.find = async (query) => {
  let output = [];
  
  output = _db.collection('plates').find({}).toArray();
  return output;
}

module.exports.close = function() {
  _db.close();
}
