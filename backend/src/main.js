const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 9000;
const cors = require('cors');

const fetch = require('node-fetch');

//const db = require('./db.js');
//db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let plates = {};

app.get('/', async (req, res) => {
  let x = await fetch('http://alpr:5000');
  x = await x.text();
  res.send(x);
});

app.get('/lpdb', async (req, res) => {
  //res.send(plates);
  res.send("Something else! Via docker volumes");
});

app.post('/lpdb', async (req, res) => {
  console.log('Received post request! ');
  let body = req.body;

  //body.timestamp = new Date();

  console.log(body);

  if (body.plate in plates) {
    plates[body.plate]++;
  } else {
    plates[body.plate] = 1;
  }

  //console.log(body);
  //db.insert(body);
  res.send('POST request to homepage');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
