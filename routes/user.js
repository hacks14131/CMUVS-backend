const express = require('express');
const router = express.Router();

const {
  registerUser,
  deleteUserByID,
  getUserByStudentID,
  checkUser,
  signUpValidator,
  updateUserInfo,
  deactivateStudentAccountStatus,
} = require('../controller/user');

router.post('/', registerUser);
router.patch('/update-user-information/:userID', updateUserInfo);
router.patch('/deactivate-students/status', deactivateStudentAccountStatus);
router.get('/checkUser/:firstname/:familyname', checkUser);
router.post('/sign-up-validator', signUpValidator);
router.get('/:id', getUserByStudentID);
router.delete('/:id', deleteUserByID);

module.exports = router;
