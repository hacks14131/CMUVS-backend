const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  collegeName: {
    type: String,
    required: true,
  },
});

const college = mongoose.model('tblCollege', collegeSchema);

module.exports = college;
