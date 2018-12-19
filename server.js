const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const db = require('monk')('localhost/lpdb');
const plates = db.get('plates');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  let body = req.body;

  body.timestamp = new Date();

  console.log(body);
  plates.insert(body);
  res.send('POST request to homepage');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
