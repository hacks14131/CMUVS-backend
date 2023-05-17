const express = require('express');
const router = express.Router();

const {
  createPlatform,
  getPlatformByID,
  adminUpdatePlatform,
} = require('../controller/platform');

router.post('/', createPlatform);
router.post('/admin-platform-update', adminUpdatePlatform);
router.get('/:id', getPlatformByID);

module.exports = router;
