const mongoose = require('mongoose');

const electionCandidateSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblUser',
    required: true,
  },
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElection',
    required: true,
  },
  positionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionPosition',
    required: true,
  },
  party: {
    type: String,
    required: true,
    default: 'Independent',
  },
});

const electionCandidate = mongoose.model(
  'tblElectionCandidate',
  electionCandidateSchema
);

module.exports = electionCandidate;
