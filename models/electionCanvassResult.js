const mongoose = require('mongoose');

const electionCanvassResultSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionCanvassID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCanvass',
    required: true,
  },
  canvassDate: {
    type: Date,
    required: true,
  },
  resultInformation: {
    type: String,
    required: true,
  },
});

const electionCanvassResult = mongoose.model(
  'tblCanvassResult',
  electionCanvassResultSchema
);

module.exports = electionCanvassResult;
