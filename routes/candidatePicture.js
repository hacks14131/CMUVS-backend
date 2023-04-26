const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyAccessToken } = require('../utils/generateToken');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './backend/image/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter,
});

const {
  postCandidatePicture,
  getCandidatePictureByUserID,
  updateCandidateProfilePicture,
} = require('../controller/candidatePicture');

router.post('/', upload.single('profilePicture'), postCandidatePicture);
router.patch(
  '/:userID',
  upload.single('profilePicture'),
  updateCandidateProfilePicture
);
router.get('/:userID', getCandidatePictureByUserID);

module.exports = router;
