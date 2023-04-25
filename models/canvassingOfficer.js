const mongoose = require('mongoose');

const canvassingOfficerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblUser',
  },
  electionCanvassID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblElectionCanvass',
    required: true,
  },
  taskStatus: {
    type: String,
    required: true,
  },
});

const canvassingOfficer = mongoose.model(
  'tblCanvassingOfficer',
  canvassingOfficerSchema
);

module.exports = canvassingOfficer;
