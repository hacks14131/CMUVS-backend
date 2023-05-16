const express = require('express');
const router = express.Router();

const {
  createElectionCanvass,
  findElectionCanvass,
  findElectionCanvassById,
  updateCanvassStatusByID,
  getCanvassedElections,
  getAllElectionCanvass,
} = require('../controller/electionCanvass');

router.post('/', createElectionCanvass);
router.get('/', getAllElectionCanvass);
router.get('/:id', findElectionCanvassById);
router.get(
  '/get-canvassed-elections/:college/:department',
  getCanvassedElections
);
router.get('/get-canvass-data/:id', findElectionCanvass);
router.patch('/update-canvass-status/:id', updateCanvassStatusByID);

module.exports = router;
