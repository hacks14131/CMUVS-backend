const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const admin = mongoose.model('tblAdmin', adminSchema);

module.exports = admin;
