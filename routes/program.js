const express = require('express');
const router = express.Router();

const {
  createProgram,
  getProgramById,
  getAllPrograms,
} = require('../controller/program');

router.post('/', createProgram);
router.get('/', getAllPrograms);
router.get('/:id', getProgramById);

module.exports = router;
