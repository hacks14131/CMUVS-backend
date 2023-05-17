const express = require('express');
const router = express.Router();

const {
  createElection,
  getElectionByID,
  deleteElection,
  getAllUniversityElection,
  getAllCollegeElection,
  getAllDepartmentElection,
  getAllElection,
  getAllActiveElection,
  updateElection,
  extendElection,
  getAllOnGoingElection,
} = require('../controller/election');

router.post('/', createElection);
router.get('/get-elections', getAllOnGoingElection);
router.get('/:id', getElectionByID);
router.get('/', getAllUniversityElection);
router.patch('/extend-election/:id', extendElection);
router.patch('/update-election/:id', updateElection);
router.get('/college/:college', getAllCollegeElection);
router.get('/department/:department', getAllDepartmentElection);
router.get('/get-election/active', getAllActiveElection);
router.get('/get-election/history', getAllElection);
router.delete('/:id', deleteElection);

module.exports = router;
