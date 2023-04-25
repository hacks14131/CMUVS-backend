const express = require('express');
const router = express.Router();

const {
  createDepartment,
  findDepartmentById,
  getAllDepartment,
} = require('../controller/department');

router.post('/', createDepartment);
router.get('/', getAllDepartment);
router.get('/:id', findDepartmentById);

module.exports = router;
