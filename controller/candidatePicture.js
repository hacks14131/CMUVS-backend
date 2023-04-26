const mongoose = require('mongoose');
const fs = require('fs');
const CandidatePicture = require('../models/candidatePicture');

const postCandidatePicture = (req, res) => {
  // console.log('controller: ', req.file);
  const candidatePicture = new CandidatePicture({
    _id: mongoose.Types.ObjectId(),
    userID: req.body.userID,
    profilePicture: {
      data: fs.readFileSync(`./backend/image/${req.file.filename}`),
      contentType: 'image/png',
    },
  });
  candidatePicture
    .save()
    .then((docs) => {
      res.status(201).json({
        _id: docs._id,
        candidateID: docs.candidateID,
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          error: error,
        },
      });
    });
  // res.status(200).json({ status: 'good' });
};

const updateCandidateProfilePicture = async (req, res, next) => {
  try {
    console.log('entered here in update profile controller');
    console.log(req.file);
    const userID = req.params.userID;
    const query = { userID: userID };
    const Update = {
      profilePicture: {
        data: fs.readFileSync(`./backend/image/${req.file.filename}`),
        contentType: 'image/png',
      },
    };
    const options = { new: true };
    console.log(req.params);
    await CandidatePicture.findOneAndUpdate(query, Update, options).then(
      (profile) => {
        res.status(200).json(profile);
      }
    );
  } catch (error) {
    res.status(304).json(error);
  }
};

const getCandidatePictureByUserID = async (req, res, next) => {
  const userID = req.params.userID;
  await CandidatePicture.findOne({ userID })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        'Error Details': {
          message: error.message,
          error: error,
        },
      });
    });
};

module.exports = {
  postCandidatePicture,
  getCandidatePictureByUserID,
  updateCandidateProfilePicture,
};
