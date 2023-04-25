const express = require('express');
const router = express.Router();

const {
  createMotto,
  getMottoByCandidateID,
  updateMotto,
} = require('../controller/motto');

router.post('/', createMotto);
router.get('/:id', getMottoByCandidateID);
router.patch('/:id', updateMotto);

module.exports = router;
