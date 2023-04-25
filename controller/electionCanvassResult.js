const mongoose = require('mongoose');
const CanvassResult = require('../models/electionCanvassResult');

const createCanvassResult = (req, res) => {
  try {
    const electionCanvassID = req.body.electionCanvassID;
    const result = req.body.resultInformation;

    const canvassResult = new CanvassResult({
      _id: mongoose.Types.ObjectId(),
      electionCanvassID,
      canvassDate: new Date(),
      resultInformation: result,
    });
    canvassResult
      .save()
      .then((docs) => {
        res.status(201).json({ message: 'result save successfully' });
      })
      .catch((error) => res.status(409).json(error));
  } catch (error) {
    res.status(409).json({ message: error.message, error });
  }
};

const getCanvassResult = (req, res) => {
  try {
    const electionCanvassID = req.params.id;
    CanvassResult.findOne({ electionCanvassID })
      .then((docs) => res.status(200).json(docs))
      .catch((error) => res.status(404).json({ message: 'result not found' }));
  } catch (error) {
    res.status(404).json({ message: 'result not found' });
  }
};

module.exports = { createCanvassResult, getCanvassResult };
