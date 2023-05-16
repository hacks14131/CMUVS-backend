const mongoose = require('mongoose');
const CanvassingOfficer = require('../models/canvassingOfficer');

const createCanvassingOfficer = (req, res) => {
  const canvassingOfficer = new CanvassingOfficer({
    _id: mongoose.Types.ObjectId(),
    userID: req.body.userID,
    electionCanvassID: req.body.electionCanvassID,
    taskStatus: req.body.taskStatus,
  });

  canvassingOfficer
    .save()
    .then((docs) => {
      res.status(201).json({
        officerID: docs._id,
      });
    })
    .catch((error) => {
      res.status(404).json({
        'Error Info': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const findCanvassingOfficerTask = (req, res) => {
  try {
    const userID = req.params.id;
    CanvassingOfficer.find({ userID }).then((docs) => {
      if (docs) {
        res.status(201).json(docs);
      } else {
        res.status(404).json({ message: 'no data found' });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const findCanvassingOfficerById = (req, res) => {
  CanvassingOfficer.findById(req.params.id)
    .then((docs) => {
      res.status(200).json({
        'Canvass Position Info': {
          _id: docs._id,
          userID: docs.userID,
          electionCanvassID: docs.electionCanvassID,
          taskStatus: docs.taskStatus,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Info': {
          message: error.message,
          'full info': error,
        },
      });
    });
};

const checkForCanvasserRights = (req, res) => {
  try {
    const id = req.params.id;
    const query = { userID: id, taskStatus: 'Pending' };
    CanvassingOfficer.find(query)
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(404).json({ message: 'Canvasser not found', error });
  }
};

const checkCanvassStatus = (req, res) => {
  try {
    const id = req.params.id;
    const query = { electionCanvassID: id };
    CanvassingOfficer.find(query).then((docs) => {
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateCanvassingOfficerTaskStatus = (req, res) => {
  try {
    const id = req.params.id;
    const canvassid = req.params.canvassid;
    const taskStatus = req.body.taskStatus;
    const update = { taskStatus: taskStatus };
    const query = { userID: id, electionCanvassID: canvassid };
    const options = { new: true };
    CanvassingOfficer.findOneAndUpdate(query, update, options).then((docs) => {
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCanvasserOfficerFullName = (req, res) => {
  try {
    const id = req.params.id;
    const canvassID = req.params.canvassID;

    CanvassingOfficer.findOne({
      userID: id,
      electionCanvassID: canvassID,
    })
      .populate('userID', 'firstName middleName familyName')
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(404).json({ message: 'Officer not found' });
  }
};

const getCanvasserOfficer = (req, res) => {
  try {
    const canvassID = req.params.canvassID;

    CanvassingOfficer.findOne({
      electionCanvassID: canvassID,
    })
      .populate('userID', 'firstName middleName familyName')
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(404).json({ message: 'Officer not found' });
  }
};

const getAllCanvassingOfficer = (req, res) => {
  try {
    CanvassingOfficer.find({})
      .populate('userID', 'firstName familyName')
      .populate('electionCanvassID', 'electionID')
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  createCanvassingOfficer,
  findCanvassingOfficerTask,
  findCanvassingOfficerById,
  checkForCanvasserRights,
  checkCanvassStatus,
  updateCanvassingOfficerTaskStatus,
  getCanvasserOfficerFullName,
  getCanvasserOfficer,
  getAllCanvassingOfficer,
};
