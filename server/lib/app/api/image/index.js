'use strict';

import express from 'express';
import {getImageJson} from './image.controller';

const router = express.Router();

router.get('/', getImageJson);
// router.post('/request-new', controller.requestNew);

module.exports = router;
