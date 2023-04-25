const mongoose = require('mongoose');

const electionWinnerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElection',
    required: true,
  },
  electionCandidateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCandidate',
    required: true,
  },
});

const electionWinner = mongoose.model(
  'tblElectionWinner',
  electionWinnerSchema
);

module.exports = electionWinner;
