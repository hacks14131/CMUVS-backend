const mongoose = require('mongoose');
const ElectionPosition = require('../models/electionPosition');

const createElectionPosition = (req, res) => {
  const electionPosition = new ElectionPosition({
    _id: mongoose.Types.ObjectId(),
    electionID: req.body.electionID,
    positionName: req.body.positionName,
    positionNumber: req.body.positionNumber,
    maximumVotes: req.body.maximumVotes,
    allowedCollege: req.body.allowedCollege,
    allowedYearLevel: req.body.allowedYearLevel,
    expectedMaximumVoter: req.body.expectedMaximumVoter,
  });
  electionPosition
    .save()
    .then((docs) => {
      res.status(201).json({
        'Position Details': {
          _id: docs._id,
          electionID: docs.electionID,
          positionName: docs.positionName,
          positionNumber: docs.positionNumber,
          maximumVotes: docs.maximumVotes,
          allowedCollege: docs.allowedCollege,
          allowedYearLevel: docs.allowedYearLevel,
          expectedMaximumVoter: docs.expectedMaximumVoter,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error,
          message: 'POST election position API failed',
        },
      });
    });
};

const getElectionPosition = (req, res) => {
  ElectionPosition.find({ electionID: req.params.electionID })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'GET election position API failed',
        },
      });
    });
};

const getElectionPositionByElectionID = async (req, res) => {
  try {
    await ElectionPosition.find({
      electionID: req.params.electionID,
      positionName: req.params.positionName,
    })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error,
    });
  }
};

// for fetching all election positions with status on-going
const getAllPositions = async (req, res) => {
  try {
    await ElectionPosition.find({})
      .populate('electionID', 'electionStatus')
      .then((docs) => {
        let filteredData = [];
        for (let i = 0; i < docs.length; i++) {
          if (docs[i].electionID.electionStatus === 'On-going') {
            filteredData.push(docs[i]);
          }
        }
        res.status(200).json(filteredData);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  createElectionPosition,
  getElectionPosition,
  getElectionPositionByElectionID,
  getAllPositions,
};
