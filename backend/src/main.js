const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const io = require("./socket").init(httpServer);

const port = 9000;

let routes = require('./routes');
let db = require('./db.js');

app.use(express.static('static'))

//Middleware
app.use(bodyParser.json({
  limit: '500mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '500mb',
}));
app.use(cors());

//Setup routes
routes.init(app);


httpServer.listen(port, function() {
  console.log('Express server listening on - http://localhost:' + port);
});

