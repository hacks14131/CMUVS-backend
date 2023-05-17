const mongoose = require('mongoose');
const Platform = require('../models/platform');

const createPlatform = (req, res) => {
  const platform = new Platform({
    _id: mongoose.Types.ObjectId(),
    electionCandidateID: req.body.electionCandidateID,
    platform: req.body.platform,
  });
  platform
    .save()
    .then((docs) => {
      res.status(201).json({
        'Platform Details': {
          _id: docs._id,
          electionCandidateID: docs.electionCandidateID,
          platform: docs.platform,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'POST platform API failed successfully',
        },
      });
    });
};

const getPlatformByID = (req, res) => {
  const electionCandidateID = req.params.id;
  Platform.find({ electionCandidateID })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'GET platform API failed successfully',
        },
      });
    });
};

const adminUpdatePlatform = async (req, res) => {
  try {
    console.log('platform api acess');
    const { electionCandidateID, platform } = req.body;
    const query = { electionCandidateID };
    await Platform.deleteMany(query);
    for (let i = 0; i < platform.length; i++) {
      const newPlatform = await new Platform({
        _id: mongoose.Types.ObjectId(),
        electionCandidateID,
        platform: platform[i],
      });
      newPlatform.save().then(() => {
        console.log('platofrm posted');
      });
    }
    res.status(201).json({ message: 'success' });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { createPlatform, getPlatformByID, adminUpdatePlatform };
