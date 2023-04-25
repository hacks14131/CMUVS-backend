const express = require('express');
const router = express.Router();

const {
  addUser,
  authenticateUser,
  getAllCollegeAndDepartmentThenGroup,
  getAllEnrolledStudents,
  validateUser,
  getUserLatestInfo,
  getTotalExpectedVoterNumber,
} = require('../controller/dtoUser');

router.post('/', addUser);
router.get('/', getAllEnrolledStudents);
router.post('/auth-user', authenticateUser);
router.post('/validate/voter', validateUser);
router.post('/user/data/get', getUserLatestInfo);
router.get('/college-and-department-list', getAllCollegeAndDepartmentThenGroup);
router.get(
  '/expected-voter-number/:allowedCollege/:allowedYearLevel',
  getTotalExpectedVoterNumber
);

module.exports = router;
