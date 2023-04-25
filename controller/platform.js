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

module.exports = { createPlatform, getPlatformByID };
