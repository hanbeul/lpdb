const app = require('express')();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*"
  }
});

const port = 9000;

let routes = require('./routes');
let db = require('./db.js');

io.on("connection", socket => {

  console.log("Socket IO client connected!");

  socket.on("hello", msg => {
    console.log(msg);
    io.emit("hello", "world");
  });
})

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Setup routes
routes.init(app);


httpServer.listen(port, function() {
  console.log('Express server listening on - http://localhost:' + port);
});


