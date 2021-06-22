const fs = require('fs');
const path = require('path');
const db = require('../../db')


function getVisits(req, res) {
  db.getVisits((err, result) => {
    if (err) throw err; 
    res.send(result);
  });
}

function getSingleVisit(req, res) {
  visitId = req.params.id;
  db.getSingleVisit(visitId, (err, result) => {
    if (err) throw err; 
    res.send(result);
  })
}

function getPageVisits(req,res) {
  pageNumber = req.params.id;
  db.getPageVisits(pageNumber, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

function getTotalVisits(req, res) {
  plateId = req.params.id;
  db.getTotalVisits(plateId, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

function getPageCount(req, res) {
  console.log('pagpeCount is starting')
  db.getPageCount((err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

function postVisit(req, res) {
  console.log(req.body);
  const plate = req.body.plate;
  const timestamp = Date(req.body.timestamp)
  db.insertVisit(plate, timestamp);
  res.send(200);
}

function updateVisit(req, res) {
  let visitId = req.params.id;
  let plateNumber = req.body.plate_number;
  db.updateVisit(visitId, plateNumber);
  res.send(200);
}

function deleteVisit(req, res) {
  let visitId = req.params.id;
  db.deleteVisit(visitId);
  res.send(200);
}

module.exports = {
  getVisits : getVisits,
  postVisit: postVisit,
  getTotalVisits: getTotalVisits,
  updateVisit: updateVisit,
  deleteVisit: deleteVisit,
  getSingleVisit: getSingleVisit,
  getPageVisits: getPageVisits,
  getPageCount: getPageCount
};
