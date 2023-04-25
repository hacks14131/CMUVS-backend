const express = require('express');
const router = express.Router();

const {
  getCanvassData,
  createUserVoteHistory,
  getUserVoteHistoryByID,
  checkUserVoteStatus,
  getVoterParticipationQuantityPerPosition,
} = require('../controller/userVoteHistory');

router.post('/', createUserVoteHistory);
router.get('/:electionID', getUserVoteHistoryByID);
router.get('/canvass-data/:electionID', getCanvassData);
router.get(
  '/:electionID/:positionID',
  getVoterParticipationQuantityPerPosition
);
router.get('/status/:userID/:electionID', checkUserVoteStatus);

module.exports = router;
