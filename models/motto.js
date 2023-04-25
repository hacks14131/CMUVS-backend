const mongoose = require('mongoose');

const mottoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionCandidateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCandidate',
    required: true,
  },
  motto: {
    type: String,
    required: true,
  },
});

const motto = mongoose.model('tblMotto', mottoSchema);

module.exports = motto;
