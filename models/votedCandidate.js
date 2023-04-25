const mongoose = require('mongoose');

const votedCandidateSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userVoteHistoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblUserVoteHistory',
    required: true,
  },
  electionCandidateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblCandidate',
    required: true,
  },
});

const votedCandidate = new mongoose.model(
  'tblVotedCandidate',
  votedCandidateSchema
);

module.exports = votedCandidate;
