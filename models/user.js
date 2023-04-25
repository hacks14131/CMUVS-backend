const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentID: {
    type: Number,
    required: true,
  },
  registrationNumber: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
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
  username: {
    type: String,
    required: true,
  },
  accountPassword: {
    type: String,
    required: true,
  },
  studentStatus: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('accountPassword')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.accountPassword = await bcrypt.hash(this.accountPassword, salt);
});

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.accountPassword);
};

const user = mongoose.model('tblUser', userSchema);

module.exports = user;
