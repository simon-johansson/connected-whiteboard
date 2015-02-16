'use strict';

var express = require('express');
var controller = require('./config.controller');

var router = express.Router();

router.get('/raspberry-pi', controller.raspberryPi);

module.exports = router;
