const express = require('express');
const router = express.Router();

const { checkForCanvasserRights } = require('../controller/canvassingOfficer');

router.get('/:id', checkForCanvasserRights);

module.exports = router;
