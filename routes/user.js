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
  oldPasswordAuth,
} = require('../controller/user');

router.post('/', registerUser);
router.post('/reset-password', oldPasswordAuth);
router.patch('/update-user-information/:userID', updateUserInfo);
router.patch('/deactivate-students/status', deactivateStudentAccountStatus);
router.get('/checkUser/:firstname/:familyname', checkUser);
router.post('/sign-up-validator', signUpValidator);
router.get('/:id', getUserByStudentID);
router.delete('/:id', deleteUserByID);

module.exports = router;
