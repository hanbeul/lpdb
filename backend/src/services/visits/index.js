const fs = require('fs');
const path = require('path');
visitsFilePath = path.join(__dirname, '../../sampleData/visits.json');

function getVisits(req, res) {
    fs.readFile(visitsFilePath, function read(err, data) {
        if (err) throw err;
        const content = JSON.parse(data);
        res.send(content);
    })
}

module.exports = {
    getVisits : getVisits
};