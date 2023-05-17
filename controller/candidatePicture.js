const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');
const CandidatePicture = require('../models/candidatePicture');

const postCandidatePicture = async (req, res) => {
  try {
    const { userID, profilePicture } = req.body;
    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profilePictures',
      width: 300,
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

const updateCandidateProfilePicture = async (req, res) => {
  try {
    const { profilePicture, userID } = req.body;
    const query = { userID };
    const options = { new: true };

    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profilePictures',
      width: 300,
      crop: 'scale',
    });

    const update = {
      profilePicture: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };

    await CandidatePicture.findOneAndUpdate(query, update, options).then(
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

const adminUpdateProfilePicture = async (req, res) => {
  try {
    console.log('use admin candidate profile update API');
    const { userID, profilePicture } = req.body;

    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profilePictures',
      width: 300,
      crop: 'scale',
    });

    console.log('After cloudinary fetch');
    const check = await CandidatePicture.findOne({ userID });
    if (check) {
      // update
      console.log('Candidate has existing profile picture');
      const query = { userID };
      const update = {
        profilePicture: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      };
      const options = { new: true };
      await CandidatePicture.findOneAndUpdate(query, update, options).then(
        () => {
          console.log('profile updated');
          res.status(202).json({ message: 'successful' });
        }
      );
    } else {
      // create
      console.log('Candidate has no existing profile picture');
      const candidatePicture = await new CandidatePicture({
        _id: mongoose.Types.ObjectId(),
        userID,
        profilePicture: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
      candidatePicture.save().then((docs) => {
        console.log('profile posted');
        res.status(201).json({
          success: true,
          docs,
        });
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  postCandidatePicture,
  getCandidatePictureByUserID,
  updateCandidateProfilePicture,
  adminUpdateProfilePicture,
};
