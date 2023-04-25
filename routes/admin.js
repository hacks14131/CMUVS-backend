const express = require('express');
const router = express.Router();

const { createAdmin } = require('../controller/admin');

router.post('/create-admin', createAdmin);

module.exports = router;
