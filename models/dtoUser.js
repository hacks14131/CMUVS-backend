const mongoose = require('mongoose');
const conn = require('../config/db2');

const dtoUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentID: {
    type: Number,
    required: true,
  },
  registrationNumber: {
    type: Number,
    required: true,
  },
  enrollementStatus: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  yearLevel: {
    type: Number,
    required: true,
  },
  withPE: {
    type: Boolean,
    requried: true,
  },
});

const dtoUser = conn.model('tblStudentList', dtoUserSchema);

module.exports = dtoUser;
