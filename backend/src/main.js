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




// Begin mike's testing area

const fs = require('fs')
const path = require('path'),    
custFilePath = path.join(__dirname, './sampleData/customers.json');
visitsFilePath = path.join(__dirname, './sampleData/visits.json');


app.get('/customers', async (req, res) => {
  fs.readFile(custFilePath, function read(err, data) {
    if (err) throw err;
    const content = JSON.parse(data);
    res.send(content);
  });
});

app.get('/visits', async (req, res) => {
  fs.readFile(visitsFilePath, function read(err, data) {
    if (err) throw err;
    const content = JSON.parse(data);
    res.send(content);
  });
});

//below is an example of how we'd serve data that is filtered/analyzed from the backend. I'm not going to to this yet though...
app.get('/totalvisits', async (req, res) => {
  fs.readFile(visitsFilePath, function read(err, data) {
    if (err) throw err;
    const content = JSON.parse(data);
    const contentLength = Object.keys(content).length;
    res.send(contentLength.toString());
  });
  
});
// End mike's testing area



app.get('/', async (req, res) => {
  let x = await fetch('http://alpr:5000');
  x = await x.text();
  res.send(x);
});

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
