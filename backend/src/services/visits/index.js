const fs = require('fs');
const path = require('path');
const db = require('../../db')
const multer = require('multer');
const io = require('../../socket').getIo();
console.log(io);


function getVisits(req, res) {
  db.getVisits((err, result) => {
    if (err) throw err; 
    res.send(result);
  });
}

function getSingleVisit(req, res) {
  let visitId = req.params.id;
  db.getSingleVisit(visitId, (err, result) => {
    if (err) throw err; 
    res.send(result);
  })
}

function getPageVisits(req,res) {
  let pageNumber = req.params.id;
  db.getPageVisits(pageNumber, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

function getTotalVisits(req, res) {
  let plateId = req.params.id;
  db.getTotalVisits(plateId, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

function getPageCount(req, res) {
  db.getPageCount((err, result) => {
    if (err) throw err;
    res.send(result);
  });
}

function postVisit(req, res) {
  console.log(req.body);
  const plate = req.body.plate;
  const timestamp = new Date();
  console.log(timestamp);
  const image_path = `${req.body.plate}-${timestamp.toString()}.png`
  db.insertVisit(plate, timestamp, image_path);

  let buff = new Buffer(req.body.image, 'base64');

  fs.writeFile(`./static/images/${image_path}`, buff,  "binary",function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});

  io.emit("reload");
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

//designate multer upload location and filename scheme
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './db/images') //for some reason in docker container ./ is /app, not the diretory this code is in.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

function postImage(req, res, next) {
  console.log(JSON.stringify(req.file))
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
  getPageCount: getPageCount,
  postImage: postImage,
  upload: upload
};
