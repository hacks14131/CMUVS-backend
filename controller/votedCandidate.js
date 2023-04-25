const mongoose = require('mongoose');
const VotedCandidate = require('../models/votedCandidate');

const addVotedCandidate = (req, res) => {
  const votedCandidate = new VotedCandidate({
    _id: mongoose.Types.ObjectId(),
    userVoteHistoryID: req.body.userVoteHistoryID,
    electionCandidateID: req.body.electionCandidateID,
  });

  votedCandidate
    .save()
    .then((docs) => {
      res.status(201).json({
        'Voted Candidate Details': {
          _id: docs._id,
          userVoteHistoryID: docs.userVoteHistoryID,
          electionCandidateID: docs.electionCandidateID,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'Add voted candidate API failed successfully',
        },
      });
    });
};

const getVotedCandidateByID = (req, res) => {
  VotedCandidate.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Voted Candidate Details': {
          _id: docs._id,
          userVoteHistoryID: docs.userVoteHistoryID,
          electionCandidateID: docs.electionCandidateID,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'Get voted candidate API failed',
        },
      });
    });
};

module.exports = { addVotedCandidate, getVotedCandidateByID };
