const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  validateUser,
  getUserLatestInfo,
  getAllCollegeAndDepartmentThenGroup,
  getTotalExpectedVoterNumber,
} = require('../controller/user');

router.post('/auth-user', authenticateUser);
router.post('/validate/voter', validateUser);
router.post('/user/data/get', getUserLatestInfo);
router.get('/list', getAllCollegeAndDepartmentThenGroup);
router.get(
  '/expected-voter-number/:allowedCollege/:allowedYearLevel',
  getTotalExpectedVoterNumber
);
module.exports = router;
