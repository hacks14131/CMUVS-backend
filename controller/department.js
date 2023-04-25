const mongoose = require('mongoose');
const Department = require('../models/department');

const createDepartment = (req, res) => {
  const department = new Department({
    _id: mongoose.Types.ObjectId(),
    collegeID: req.body.collegeID,
    departmentName: req.body.departmentName,
  });
  department
    .save()
    .then((docs) => {
      res.status(201).json({
        'Department info': {
          _id: docs._id,
          collegeID: docs.collegeID,
          departmentName: docs.departmentName,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const findDepartmentById = (req, res) => {
  Department.findById(req.params.id)
    .populate('collegeID')
    .then((docs) => {
      res.status(200).json({
        'Department Info': {
          _id: docs._id,
          collegeID: docs.collegeID,
          departmentName: docs.departmentName,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const getAllDepartment = async (req, res) => {
  try {
    const departments = await Department.find({});
    if (departments) {
      res.status(200).json({
        departmentList: departments,
      });
    } else {
      throw new Error('File Not Found');
    }
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

module.exports = { createDepartment, findDepartmentById, getAllDepartment };
