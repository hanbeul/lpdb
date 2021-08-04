const 
    express = require('express')
    plateService = require('../../../services/plates/index')

let router = express.Router();

router.get('/', plateService.getPlates)


module.exports = router;
