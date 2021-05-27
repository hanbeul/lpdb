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

  //Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  //Setup routes
  routes.init(app);
}

start = function() {
  app.listen(port, function() {
    console.log('Express server listening on - http://localhost:' + port);
  });
};

create();
start();


//const db = require('./db.js');
//db.init();

// app.get('/', async (req, res) => {
//   let x = await fetch('http://alpr:5000');
//   x = await x.text();
//   res.send(x);
// });

// let plates = {};

// app.get('/lpdb', async (req, res) => {
//   res.send(plates);
// });

// app.post('/lpdb', async (req, res) => {
//   console.log('Received post request! ');
//   let body = req.body;

//   //body.timestamp = new Date();

//   console.log(body);

//   if (body.plate in plates) {
//     plates[body.plate]++;
//   } else {
//     plates[body.plate] = 1;
//   }

//   //console.log(body);
//   //db.insert(body);
//   res.send('POST request to homepage');
// });
