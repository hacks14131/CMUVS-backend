const express = require('express');
const router = express.Router();

const {
  createElectionPosition,
  getElectionPosition,
  getElectionPositionByElectionID,
} = require('../controller/electionPosition');

router.post('/', createElectionPosition);
router.get('/:electionID', getElectionPosition);
router.get(
  '/positions/:electionID/:positionName',
  getElectionPositionByElectionID
);

module.exports = router;
