const db = require('../../db')

function getPlates(req, res) {
    db.getPlates((err, result) => {
        if (err) throw err;
        res.send(result);   
    })
}

module.exports = {
    getPlates : getPlates
};