const mongoose = require('mongoose');
const CanvassPosition = require('../models/canvassPosition');

const createCanvassPosition = (req, res) => {
  const canvassPosition = new CanvassPosition({
    _id: mongoose.Types.ObjectId(),
    canvassingOfficerID: req.body.canvassingOfficerID,
    positionToCanvass: req.body.positionToCanvass,
  });
  canvassPosition
    .save()
    .then((docs) => {
      res.status(201).json({
        'Canvass Position Information': {
          _id: docs._id,
          canvassingOfficerID: docs.canvassingOfficerID,
          positionToCanvass: docs.positionToCanvass,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          'Full Information': error,
        },
      });
    });
};

const findCanvassPositionById = (req, res) => {
  CanvassPosition.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Canvass Position Information': {
          _id: docs._id,
          canvassingOfficerID: docs.canvassingOfficerID,
          positionToCanvass: docs.positionToCanvass,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          message: error.message,
          'Full Information': error,
        },
      });
    });
};

const getPositionsToCanvass = (req, res) => {
  try {
    const canvassingOfficerID = req.params.id;
    CanvassPosition.find({ canvassingOfficerID }).then((docs) => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ message: 'No data found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createCanvassPosition,
  findCanvassPositionById,
  getPositionsToCanvass,
};
