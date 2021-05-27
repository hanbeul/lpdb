const
    express = require('express'),
    visitsController = require('../../controllers/apis/visits/');

let router = express.Router();

router.use('/visits', visitsController);

module.exports = router;