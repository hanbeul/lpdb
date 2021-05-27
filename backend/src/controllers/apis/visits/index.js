const
    express = require('express'),
    visitService = require('../../../services/visits/index');

let router = express.Router();

router.get('/', visitService.getVisits);

module.exports = router;