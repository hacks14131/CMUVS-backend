const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionName: {
    type: String,
    required: true,
  },
  electionLevel: {
    type: String,
    required: true,
  },
  electionScope: {
    type: String,
    required: true,
  },
  electionStatus: {
    type: String,
    required: true,
  },
  electionOpeningDate: {
    type: Date,
    required: true,
  },
  electionClosingDate: {
    type: Date,
    required: true,
  },
  schoolYear: {
    type: String,
    required: true,
  },
});

const election = mongoose.model('tblElection', electionSchema);

module.exports = election;
