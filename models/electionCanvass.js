const mongoose = require('mongoose');

const electionCanvassSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElection',
    required: true,
  },
  canvassStatus: {
    type: String,
    required: true,
  },
});

const electionCanvass = mongoose.model(
  'tblElectionCanvass',
  electionCanvassSchema
);

module.exports = electionCanvass;
