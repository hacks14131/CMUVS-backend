const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblDepartment',
    required: true,
  },
  programName: {
    type: String,
    required: true,
  },
});

const program = mongoose.model('tblProgram', programSchema);

module.exports = program;
