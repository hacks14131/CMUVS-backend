const express = require('express');
const router = express.Router();
// const multer = require('multer');

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './backend/image/');
//   },
//   filename: (req, file, cb) => {
//     console.log('middleware ', file);
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: fileStorageEngine,
//   limits: { fileSize: 1024 * 1024 * 10 },
//   fileFilter: fileFilter,
// });

const {
  postCandidatePicture,
  getCandidatePictureByUserID,
  updateCandidateProfilePicture,
  adminUpdateProfilePicture,
} = require('../controller/candidatePicture');

router.post('/', postCandidatePicture);
router.post('/admin-candidate-profile-update', adminUpdateProfilePicture);
router.patch('/update-candidate-profile', updateCandidateProfilePicture);
router.get('/:userID', getCandidatePictureByUserID);

module.exports = router;
