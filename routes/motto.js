const express = require('express');
const router = express.Router();

const {
  createMotto,
  getMottoByCandidateID,
  updateMotto,
  adminUpdateMotto,
} = require('../controller/motto');

router.post('/', createMotto);
router.post('/admin-update-motto', adminUpdateMotto);
router.get('/:id', getMottoByCandidateID);
router.patch('/:id', updateMotto);

module.exports = router;
