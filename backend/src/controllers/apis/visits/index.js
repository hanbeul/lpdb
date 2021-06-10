const
    express = require('express'),
    visitService = require('../../../services/visits/index');

let router = express.Router();

router.get('/', visitService.getVisits)
      .get('/:id', visitService.getTotalVisits)
  .post('/', visitService.postVisit);

module.exports = router;
