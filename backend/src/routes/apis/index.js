const
    express = require('express'),
    visitsController = require('../../controllers/apis/visits/');
    platesController = require('../../controllers/apis/plates/')

let router = express.Router();

router.use('/visits', visitsController);
router.use('/plates', platesController);

module.exports = router;