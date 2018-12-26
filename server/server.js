const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const db = require('./db.js');
db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/lpdb', async (req, res) => {
  let results = [];
  results = await db.find({});
  res.send(results);
});

app.post('/lpdb', async (req, res) => {
  let body = req.body;

  body.timestamp = new Date();

  //console.log(body);
  db.insert(body);
  res.send('POST request to homepage');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
