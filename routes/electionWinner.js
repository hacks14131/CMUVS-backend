const express = require('express');
const router = express.Router();

const {
  createElectionWinner,
  getElectionWinnerById,
} = require('../controller/electionWinner');

router.post('/', createElectionWinner);
router.get('/:id', getElectionWinnerById);

module.exports = router;
