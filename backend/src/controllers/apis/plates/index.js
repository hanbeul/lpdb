const 
    express = require('express')
    plateService = require('../../../services/plates/index')

let router = express.Router();

router.get('/', plateService.getPlates)
      .get('/page/:id', plateService.getPagePlates)
      .get('/pagecount/total', plateService.getPlatesPageCount)


module.exports = router;
