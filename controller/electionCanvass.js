const mongoose = require('mongoose');
const ElectionCanvass = require('../models/electionCanvass');

const createElectionCanvass = (req, res) => {
  const electionCanvass = new ElectionCanvass({
    _id: mongoose.Types.ObjectId(),
    electionID: req.body.electionID,
    canvassStatus: req.body.canvassStatus,
  });
  electionCanvass
    .save()
    .then((docs) => {
      res.status(201).json({
        _id: docs._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error info': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const getCanvassedElections = async (req, res) => {
  try {
    const { college, department } = req.params;
    const query = { canvassStatus: 'Finished' };
    if (college === 'ALL' && department === 'ALL') {
      await ElectionCanvass.find(query)
        .populate('electionID')
        .then((docs) => res.status(200).json(docs));
    } else {
      await ElectionCanvass.find(query)
        .populate('electionID')
        .then((docs) => {
          let filteredElections = [];
          let filteredUniversityElections = docs.filter(
            (election) => election.electionID.electionScope === 'University'
          );
          let filteredCollegeElections = docs.filter(
            (election) =>
              election.electionID.electionScope === college &&
              election.electionID.electionLevel === 'College'
          );
          let filteredDepartmentElections = docs.filter(
            (election) =>
              election.electionID.electionScope === department &&
              election.electionID.electionLevel === 'Department'
          );
          filteredElections = [
            ...filteredUniversityElections,
            ...filteredCollegeElections,
            ...filteredDepartmentElections,
          ];
          res.status(200).json(filteredElections);
        });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const findElectionCanvassById = (req, res) => {
  ElectionCanvass.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Election Canvass Info': {
          _id: docs._id,
          electionID: docs.electionID,
          canvassStatus: docs.canvassStatus,
          canvassDate: docs.canvassDate,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error info': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const findElectionCanvass = (req, res) => {
  try {
    const _id = req.params.id;
    ElectionCanvass.findOne({ _id })
      .populate('electionID')
      .then((docs) => {
        if (docs) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({ message: 'No data found' });
        }
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateCanvassStatusByID = (req, res) => {
  try {
    const canvassID = req.params.id;
    const update = { canvassStatus: 'Finished' };
    const query = { _id: canvassID };
    const options = { new: true };

    ElectionCanvass.findOneAndUpdate(query, update, options).then((docs) => {
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAllElectionCanvass = (req, res) => {
  try {
    ElectionCanvass.find({})
      .populate(
        'electionID',
        'electionName electionLevel schoolYear electionOpeningDate electionClosingDate'
      )
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  createElectionCanvass,
  findElectionCanvass,
  findElectionCanvassById,
  updateCanvassStatusByID,
  getCanvassedElections,
  getAllElectionCanvass,
};
