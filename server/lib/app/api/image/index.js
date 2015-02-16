'use strict';

var express = require('express');
var controller = require('./image.controller');

var router = express.Router();

router.get('/', controller.getImageJson);
router.post('/request-new', controller.requestNew);

module.exports = router;
