const mongoose = require('mongoose');
const ElectionWinner = require('../models/electionWinner');

const createElectionWinner = (req, res) => {
  const electionWinner = new ElectionWinner({
    _id: mongoose.Types.ObjectId(),
    electionID: req.body.electionID,
    candidateID: req.body.candidateID,
  });
  electionWinner
    .save()
    .then((docs) => {
      res.status(201).json({
        'Election Winner Info': {
          _id: docs._id,
          electionID: docs.electionID,
          candidateID: docs.candidateID,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          error: error,
        },
      });
    });
};

const getElectionWinnerById = (req, res) => {
  ElectionWinner.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Election Winner Info': {
          _id: docs._id,
          electionID: docs.electionID,
          candidateID: docs.candidateID,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          error: error,
        },
      });
    });
};

module.exports = { createElectionWinner, getElectionWinnerById };
