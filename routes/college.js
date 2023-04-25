const express = require('express');
const router = express.Router();

const {
  createCollege,
  findCollegeById,
  getAllCollege,
} = require('../controller/college');

router.post('/', createCollege);
router.get('/', getAllCollege);
router.get('/:id', findCollegeById);

module.exports = router;
