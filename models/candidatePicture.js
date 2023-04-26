const mongoose = require('mongoose');

const candidatePictureSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tblUser',
    required: true,
  },
  profilePicture: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const candidatePicture = mongoose.model(
  'tblCandidatePicture',
  candidatePictureSchema
);

module.exports = candidatePicture;
