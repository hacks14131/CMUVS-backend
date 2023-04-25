const mongoose = require('mongoose');
const College = require('../models/college');

const createCollege = (req, res) => {
  const college = new College({
    _id: mongoose.Types.ObjectId(),
    collegeName: req.body.collegeName,
  });
  college
    .save()
    .then((docs) => {
      res.status(201).json({
        'College Info': {
          _id: docs._id,
          collegeName: docs.collegeName,
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

const findCollegeById = (req, res) => {
  College.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'College info': {
          _id: docs._id,
          collegeName: docs.collegeName,
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

const getAllCollege = async (req, res) => {
  try {
    const colleges = await College.find({});
    if (colleges) {
      res.status(200).json({
        collegeList: colleges,
      });
    } else {
      res.status(500);
      throw new Error('File Not Found');
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = { createCollege, findCollegeById, getAllCollege };
