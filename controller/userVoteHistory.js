const mongoose = require('mongoose');
const UserVoteHistory = require('../models/userVoteHistory');

const createUserVoteHistory = (req, res) => {
  // console.log(
  //   `Election ID: ${req.body.electionID}, User ID: ${req.body.userID}, Voted Candidate ID: ${req.body.votedCandidateID}, IPv4: ${req.body.IPv4}, Device Model: ${req.body.deviceModel}`
  // );
  const userVoteHistory = new UserVoteHistory({
    _id: mongoose.Types.ObjectId(),
    electionID: req.body.electionID,
    userID: req.body.userID,
    votedCandidateID: req.body.votedCandidateID,
    IPv4: req.body.IPv4,
    deviceModel: req.body.deviceModel,
  });
  userVoteHistory
    .save()
    .then((docs) => {
      res.status(201).json({
        'User Vote History Details': {
          _id: docs._id,
          electionID: docs.electionID,
          userID: docs.userID,
          votedCandidateID: docs.votedCandidateID,
          IPv4: docs.IPv4,
          deviceModel: docs.deviceModel,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'Error at creating user vote history',
        },
      });
    });
};

const checkUserVoteStatus = async (req, res) => {
  try {
    const electionID = req.params.electionID;
    const userID = req.params.userID;

    const voteStatus = await UserVoteHistory.findOne({ electionID, userID });
    if (voteStatus) {
      res.status(200).json(voteStatus);
    } else {
      res.status(200).json(voteStatus);
    }
  } catch (error) {
    res.status(404).json({ message: error.message, error });
  }
};

const getUserVoteHistoryByID = (req, res) => {
  const id = req.params.electionID;
  UserVoteHistory.find({ electionID: id })
    .populate('userID', 'college department program')
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      res.status(500).json({
        'Error Details': {
          error: error.message,
          message: 'Error at getting user vote history by ID',
        },
      });
    });
};

const getVoterParticipationQuantityPerPosition = (req, res) => {
  try {
    const electionID = req.params.electionID;
    const positionID = req.params.positionID;
    const query = { electionID: electionID };

    UserVoteHistory.find(query)
      .populate('votedCandidateID', 'positionID')
      .then((docs) => {
        if (docs) {
          let data = [];
          let count = 0;
          for (let i = 0; i < docs.length; i++) {
            if (docs[i].votedCandidateID.positionID.toString() === positionID) {
              count++;
              data.push(docs[i].userID.toString());
            }
          }

          let unique = [...new Set(data)];
          res.status(200).json({ votedCount: unique.length });
        } else {
          res.status(404).json({ error: 'some error occured' });
        }
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCanvassData = (req, res) => {
  try {
    const electionID = req.params.electionID;
    const query = { electionID: electionID };
    UserVoteHistory.find(query)
      .populate(
        'userID',
        'firstName familyName studentID college department program yearLevel'
      )
      .populate('votedCandidateID', 'userID positionID')
      .then((docs) => {
        res.status(200).json(docs);
      });
  } catch (error) {
    res.status(404).json({ error: 'some error occured' });
  }
};

module.exports = {
  getCanvassData,
  createUserVoteHistory,
  getUserVoteHistoryByID,
  checkUserVoteStatus,
  getVoterParticipationQuantityPerPosition,
};
