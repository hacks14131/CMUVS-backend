const mongoose = require('mongoose');
const Motto = require('../models/motto');

const createMotto = (req, res) => {
  const motto = new Motto({
    _id: mongoose.Types.ObjectId(),
    electionCandidateID: req.body.electionCandidateID,
    motto: req.body.motto,
  });

  motto
    .save()
    .then((docs) => {
      res.status(201).json({
        'Candidate Motto Info': {
          _id: docs._id,
          'Candidate ID': docs.electionCandidateID,
          motto: docs.motto,
        },
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
};

const updateMotto = async (req, res) => {
  try {
    const candidateID = req.params.id;
    const motto = req.body.motto;
    const query = { electionCandidateID: candidateID };
    const update = { motto: motto };
    const options = { new: true };
    Motto.findOneAndUpdate(query, update, options).then((docs) =>
      res.status(200).json(docs)
    );
  } catch (error) {
    res.status(404).json(error);
  }
};

const getMottoByCandidateID = async (req, res) => {
  const electionCandidateID = req.params.id;
  await Motto.findOne({ electionCandidateID })
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

module.exports = { createMotto, getMottoByCandidateID, updateMotto };
