const db = require('../../db')

function getPlates(req, res) {
    db.getPlates((err, result) => {
        if (err) throw err;
        res.send(result);   
    })
}

function getPagePlates(req, res) {
    let pageNumber = req.params.id;
    db.getPagePlates(pageNumber, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

function getPlatesPageCount(req, res) {
    db.getPlatesPageCount((err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

module.exports = {
    getPlates : getPlates,
    getPagePlates : getPagePlates,
    getPlatesPageCount : getPlatesPageCount
};