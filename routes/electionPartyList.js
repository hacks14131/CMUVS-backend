const express = require('express');
const router = express.Router();

const {
  createElectionPartyList,
  getElectionPartyList,
} = require('../controller/electionPartyList');

router.post('/', createElectionPartyList);
router.get('/:id', getElectionPartyList);

module.exports = router;
