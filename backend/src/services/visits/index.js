const fs = require('fs');
const path = require('path');
const db = require('../../db')


function getVisits(req, res) {
  db.getVisits((err, result) => {
    if (err) throw err; 
    res.send(result);
  });
}

function getTotalVisits(req, res) {
  plateId = req.params.id;
  db.getTotalVisits(plateId, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

function postVisit(req, res) {
  console.log(req.body);
  const plate = req.body.plate;
  const timestamp = Date(req.body.timestamp)
  res.send(200);
  db.insertVisit(plate, timestamp);
}

module.exports = {
  getVisits : getVisits,
  postVisit: postVisit,
  getTotalVisits: getTotalVisits
};
