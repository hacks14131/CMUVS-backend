const mongoose = require('mongoose');
const Admin = require('../models/admin');
const { generateToken } = require('../utils/generateToken');

const createAdmin = (req, res) => {
  try {
    const admin = new Admin({
      _id: mongoose.Types.ObjectId(),
      username: req.params.username,
      password: req.params.password,
    });
    admin.save().then((docs) => {
      res.status(201).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const checkAdmin = (req, res) => {
  try {
    const { username, password } = req.params;
    const query = { username, password };
    Admin.findOne(query).then((docs) => {
      if (docs) {
        res.status(200).json({
          _id: docs._id,
          token: generateToken(docs._id),
          auth: true,
        });
      } else {
        res
          .status(404)
          .json({ message: 'no admin found with same credentials' });
      }
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = { createAdmin, checkAdmin };
