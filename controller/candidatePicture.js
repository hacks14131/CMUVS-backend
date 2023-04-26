const mongoose = require('mongoose');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const CandidatePicture = require('../models/candidatePicture');

const postCandidatePicture = async (req, res) => {
  try {
    const { userID, profilePicture } = req.body;
    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profilePictures',
      width: 300,
      height: 300,
      crop: 'scale',
    });

    const candidatePicture = await new CandidatePicture({
      _id: mongoose.Types.ObjectId(),
      userID,
      profilePicture: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    candidatePicture.save().then((docs) => {
      res.status(201).json({
        success: true,
        docs,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      'Error Details': {
        message: error.message,
        error: error,
      },
    });
  }
};

const updateCandidateProfilePicture = async (req, res, next) => {
  try {
    const { profilePicture } = req.body;
    const userID = req.params.userID;
    const query = { userID: userID };
    const options = { new: true };

    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profilePictures',
      width: 300,
      height: 300,
      crop: 'scale',
    });

    const Update = {
      profilePicture: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

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
