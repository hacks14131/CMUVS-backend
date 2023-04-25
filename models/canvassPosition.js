const mongoose = require('mongoose');

const canvassPositionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  canvassingOfficerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblCanvassingOfficer',
    required: true,
  },
  positionToCanvass: {
    type: String,
    required: true,
  },
});

const canvassPosition = mongoose.model(
  'tblCanvassPosition',
  canvassPositionSchema
);

module.exports = canvassPosition;
