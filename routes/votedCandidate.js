const express = require('express');
const router = express.Router();

const {
  addVotedCandidate,
  getVotedCandidateByID,
} = require('../controller/votedCandidate');

router.post('/', addVotedCandidate);
router.get('/:id', getVotedCandidateByID);

module.exports = router;
