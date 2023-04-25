const express = require('express');
const router = express.Router();

const {
  createCanvassResult,
  getCanvassResult,
} = require('../controller/electionCanvassResult');

router.post('/post-canvass-result', createCanvassResult);
router.get('/get-canvass-result/:id', getCanvassResult);

module.exports = router;
