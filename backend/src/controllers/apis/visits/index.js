const
    express = require('express'),
    visitService = require('../../../services/visits/index');

let router = express.Router();

router.get('/', visitService.getVisits)
      .get('/:id', visitService.getSingleVisit)
      .get('/page/:id', visitService.getPageVisits)
      .get('/countvisits/:id', visitService.getTotalVisits)
      .get('/pagecount/total', visitService.getPageCount)
      .post('/', visitService.postVisit)
      .put('/:id', visitService.updateVisit)
      .delete('/:id', visitService.deleteVisit)
      .post('/image', visitService.upload.single('image'), visitService.postImage)

module.exports = router;
