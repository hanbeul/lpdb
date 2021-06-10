const 
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    fetch = require('node-fetch');

let app = express(),
    port = 9000,
    create,
    start;

create = function() {
  let routes = require('./routes');
  let db = require('./db.js');

  //Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  //Setup routes
  routes.init(app);

  //DB methods testing area. Don't need to run any DB methods, btw, to init 
  //the DB; just requiring it above will make the connection. 
  //Because I did not wrap the connection code in any function or class. 
  // db.getVisits();
  // db.getPlates();
  // db.insertVisit();
  // db.update();
  // db.delete();
  // db.close();
}

start = function() {
  app.listen(port, function() {
    console.log('Express server listening on - http://localhost:' + port);
  });
};

create();
start();