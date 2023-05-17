const express = require('express');
const router = express.Router();

const {
  createElectionPosition,
  getElectionPosition,
  getElectionPositionByElectionID,
  getAllPositions,
} = require('../controller/electionPosition');

router.post('/', createElectionPosition);
router.get('/', getAllPositions);
router.get('/:electionID', getElectionPosition);
router.get(
  '/positions/:electionID/:positionName',
  getElectionPositionByElectionID
);

module.exports = router;
