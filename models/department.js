const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  collegeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblCollege',
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
});

const department = mongoose.model('tblDepartment', departmentSchema);

module.exports = department;
