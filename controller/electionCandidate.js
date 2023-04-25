const mongoose = require('mongoose');
const ElectionCandidate = require('../models/electionCandidate');
const fs = require('fs');

const createElectionCandidate = (req, res) => {
  // console.log(
  //   'user ID: ',
  //   req.body.userID,
  //   ' election ID: ',
  //   req.body.electionID,
  //   ' position ID: ',
  //   req.body.positionID,
  //   ' party: ',
  //   req.body.party
  // );
  const electionCandidate = new ElectionCandidate({
    _id: mongoose.Types.ObjectId(),
    userID: req.body.userID,
    electionID: req.body.electionID,
    positionID: req.body.positionID,
    party: req.body.party,
  });
  electionCandidate
    .save()
    .then((docs) => {
      res.status(201).json({
        'Candidate Details': {
          _id: docs._id,
          userID: docs.userID,
          electionID: docs.electionID,
          positionID: docs.positionID,
          party: docs.party,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: 'Error when registering election candidate',
          message: error.message,
        },
      });
    });
};

const getElectionCandidateByELection = async (req, res) => {
  try {
    const id = req.params.electionID;
    ElectionCandidate.find({ electionID: id })
      .populate('userID', 'firstName middleName familyName college department')
      .populate('positionID')
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(401).json(error);
  }
};

const getElectionCandidate = (req, res) => {
  ElectionCandidate.find({ userID: req.params.userID })
    .populate('electionID')
    .then((docs) => {
      const today = new Date();
      let status = false;
      let item = {};
      console.log(
        `Today: ${today.getTime()}, Closing Date: ${docs[0].electionID.electionClosingDate.getTime()}`
      );
      for (let i = 0; i < docs.length; i++) {
        if (
          today.getTime() < docs[i].electionID.electionClosingDate.getTime()
        ) {
          status = true;
          item = docs[i];
        }
      }
      if (status) {
        res.status(200).json(item);
      } else {
        res
          .status(200)
          .json({ message: 'cannot fetch profile data for finished election' });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'election candidate data fetch unsuccessful',
      });
    });
};

const deleteElectionCandidate = (req, res, next) => {
  const id = req.params.id;
  ElectionCandidate.deleteOne({ _id: id })
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: docs,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Delete election candidate unsuccessful',
        details: error.message,
      });
    });
};

module.exports = {
  createElectionCandidate,
  getElectionCandidate,
  deleteElectionCandidate,
  getElectionCandidateByELection,
};
