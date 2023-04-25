const express = require('express');
const router = express.Router();

const {
  createCanvassPosition,
  findCanvassPositionById,
  getPositionsToCanvass,
} = require('../controller/canvassPosition');

router.post('/', createCanvassPosition);
router.get('/:id', findCanvassPositionById);
router.get('/canvass-get-positions/:id', getPositionsToCanvass);

module.exports = router;
