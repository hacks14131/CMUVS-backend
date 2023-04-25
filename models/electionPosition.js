const mongoose = require('mongoose');

const electionPositionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElection',
    required: true,
  },
  positionName: {
    type: String,
    required: true,
  },
  positionNumber: {
    type: Number,
    required: true,
  },
  maximumVotes: {
    type: Number,
    required: true,
  },
  allowedCollege: {
    type: String,
    required: true,
  },
  allowedYearLevel: {
    type: String,
    required: true,
  },
  expectedMaximumVoter: {
    type: Number,
    required: true,
  },
});

const electionPosition = mongoose.model(
  'tblElectionPosition',
  electionPositionSchema
);

module.exports = electionPosition;
