const
    express = require('express'),
    visitService = require('../../../services/visits/index');

let router = express.Router();

router.get('/', visitService.getVisits)
  .post('/', visitService.postVisit);

module.exports = router;
