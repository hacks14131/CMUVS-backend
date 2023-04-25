const express = require('express');
const router = express.Router();

const { createPlatform, getPlatformByID } = require('../controller/platform');

router.post('/', createPlatform);
router.get('/:id', getPlatformByID);

module.exports = router;
