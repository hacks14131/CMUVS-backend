const mongoose = require('mongoose');
const ElectionPartyList = require('../models/electionPartyList');

const createElectionPartyList = (req, res) => {
  const electionPartyList = new ElectionPartyList({
    _id: mongoose.Types.ObjectId(),
    electionID: req.body.electionID,
  });
  electionPartyList
    .save()
    .then((res) => {
      res.status(201).json({
        'Party List Details': {
          _id: res._id,
          electionID: res.electionID,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'Error on using createElectionPartyList API',
        },
      });
    });
};

const getElectionPartyList = (req, res) => {
  ElectionPartyList.findById(req.params.id).then((res) => {
    res.status(200).json({
      'Candidate Details': {
        _id: res._id,
        electionID: res.electionID,
      },
    });
  });
};

module.exports = { createElectionPartyList, getElectionPartyList };
