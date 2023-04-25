const mongoose = require('mongoose');

const electionPartyListSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  electionID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'tblElection',
  },
});

const electionPartyList = mongoose.model(
  'tblElectionPartyList',
  electionPartyListSchema
);

module.exports = electionPartyList;
