const express = require('express');
const router = express.Router();

const { createAdmin, checkAdmin } = require('../controller/admin');

router.post('/:username/:password', createAdmin);
router.get('/:username/:password', checkAdmin);

module.exports = router;
