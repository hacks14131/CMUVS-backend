const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionCandidateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCandidate',
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
});

const platform = mongoose.model('tblPlatform', platformSchema);

module.exports = platform;
