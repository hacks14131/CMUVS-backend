const mongoose = require('mongoose');
const Program = require('../models/program');

const createProgram = (req, res) => {
  const program = new Program({
    _id: mongoose.Types.ObjectId(),
    departmentID: req.body.departmentID,
    programName: req.body.programName,
  });
  program
    .save()
    .then((docs) => {
      res.status(201).json({
        'Program Details': {
          _id: docs._id,
          departmentID: docs.departmentID,
          programName: docs.programName,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          'Full detail': error,
        },
      });
    });
};

const getProgramById = (req, res) => {
  Program.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Program Info': {
          _id: docs._id,
          departmentID: docs.departmentID,
          programName: docs.programName,
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

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    if (programs) {
      res.status(200).json({
        programList: programs,
      });
    } else {
      throw new Error('File Not Found');
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = { createProgram, getProgramById, getAllPrograms };
