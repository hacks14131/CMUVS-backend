const mongoose = require('mongoose');

const userVoteHistorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElection',
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblUser',
    required: true,
  },
  votedCandidateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCandidate',
    required: true,
  },
  IPv4: {
    type: String,
    required: false,
  },
  deviceModel: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const userVoteHistory = mongoose.model(
  'tblUserVoteHistory',
  userVoteHistorySchema
);

module.exports = userVoteHistory;
