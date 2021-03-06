const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');

//const db = require('./db.js');
//db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let plates = {};

app.get('/lpdb', async (req, res) => {
  res.send(plates);
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
