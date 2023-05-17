const Election = require('../models/election');
const mongoose = require('mongoose');

const createElection = (req, res, next) => {
  let currentSchoolYear = null;
  const firstSemester = [8, 9, 10, 11, 12];

  let startYear = new Date(req.body.electionOpeningDate);
  const currentMonth = startYear.getMonth();
  startYear = startYear.getFullYear();

  if (firstSemester.includes(currentMonth)) {
    currentSchoolYear = startYear + '-' + (startYear + 1);
  } else {
    currentSchoolYear = startYear - 1 + '-' + startYear;
  }
  const election = new Election({
    _id: mongoose.Types.ObjectId(),
    electionName: req.body.electionName,
    electionLevel: req.body.electionLevel,
    electionScope: req.body.electionScope,
    electionStatus: req.body.electionStatus,
    electionOpeningDate: new Date(req.body.electionOpeningDate),
    electionClosingDate: new Date(req.body.electionClosingDate),
    schoolYear: currentSchoolYear,
  });
  election
    .save()
    .then((docs) => {
      res.status(201).json({
        electionID: docs._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        Error: {
          message: error.message,
          error,
        },
      });
    });
};

const getAllUniversityElection = async (req, res) => {
  try {
    // const currentDate = new Date().toISOString();
    await Election.find({
      electionLevel: 'University',
    }).then((docs) => {
      // console.log(typeof docs[0].electionOpeningDate);
      // console.log(typeof docs[0].electionClosingDate);
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

const getAllCollegeElection = async (req, res) => {
  try {
    // const currentDate = new Date().toISOString();
    const userCollege = req.params.college;
    if (userCollege === 'ALL') {
      await Election.find({
        electionLevel: 'College',
      }).then((docs) => {
        res.status(200).json(docs);
      });
    } else {
      await Election.find({
        electionLevel: 'College',
        electionScope: userCollege,
      }).then((docs) => {
        res.status(200).json(docs);
      });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

const getAllDepartmentElection = async (req, res) => {
  try {
    // const currentDate = new Date().toISOString();
    const userDepartment = req.params.department;
    if (userDepartment === 'ALL') {
      await Election.find({
        electionLevel: 'Department',
      }).then((docs) => {
        res.status(200).json(docs);
      });
    } else {
      await Election.find({
        electionLevel: 'Department',
        electionScope: userDepartment,
      }).then((docs) => {
        res.status(200).json(docs);
      });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

const getElectionByID = (req, res) => {
  Election.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Election Details': {
          'Election ID': docs._id,
          'Election Name': docs.electionName,
          'Election Level': docs.electionLevel,
          'Election Scope': docs.electionScope,
          'Election Status': docs.electionStatus,
          'Election Opening Date': docs.electionOpeningDate,
          'Election Closing Date': docs.electionClosingDate,
        },
      });
    })
    .catch((error) => {
      res.status(401).json({
        error: error.message,
        message: 'No election with the specified ID found in the database',
      });
    });
};

const getAllElection = (req, res) => {
  try {
    Election.find({ electionStatus: 'Finished' }).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: 'No election found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllActiveElection = (req, res) => {
  try {
    Election.find({
      electionStatus: 'On-going',
    }).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: 'No election found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteElection = (req, res, next) => {
  Election.deleteOne({ _id: req.params.id })
    .exec()
    .then((docs) => {
      res.status(200).json({
        'Server Response': 'Election deleted successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Delete unsuccessful',
      });
    });
};

const updateElection = (req, res) => {
  try {
    const electionID = req.params.id;
    const newElectionStatus = req.body.electionStatus;
    const query = { _id: electionID };
    const update = { electionStatus: newElectionStatus };
    const options = { new: true };

    Election.findOneAndUpdate(query, update, options).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: 'No document found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const extendElection = (req, res) => {
  try {
    const electionID = req.params.id;
    const extendedDate = req.body.electionClosingDate;
    const query = { _id: electionID };
    const update = { electionClosingDate: extendedDate };
    const options = { new: true };
    Election.findOneAndUpdate(query, update, options).then((docs) =>
      res.status(200).json(docs)
    );
  } catch (error) {
    res.status(304).json({ message: 'Election not extended' });
  }
};

const getAllOnGoingElection = (req, res) => {
  try {
    Election.find({ electionStatus: 'On-going' }).then((docs) => {
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  createElection,
  getElectionByID,
  deleteElection,
  getAllUniversityElection,
  getAllCollegeElection,
  getAllDepartmentElection,
  getAllElection,
  getAllActiveElection,
  updateElection,
  extendElection,
  getAllOnGoingElection,
};
