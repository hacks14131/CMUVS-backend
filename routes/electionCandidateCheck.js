const express = require('express');
const router = express.Router();

const { getElectionCandidate } = require('../controller/electionCandidate');

router.get('/:userID', getElectionCandidate);

module.exports = router;
