const express = require('express');
const router = express.Router();
// const multer = require('multer');

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

const {
  createElectionCandidate,
  getElectionCandidate,
  deleteElectionCandidate,
  getElectionCandidateByELection,
  getAllCandidate,
} = require('../controller/electionCandidate');

router.post('/', createElectionCandidate);
router.get('/', getAllCandidate);
router.get('/:userID', getElectionCandidate);
router.get('/candidate/:electionID', getElectionCandidateByELection);
router.delete('/:id', deleteElectionCandidate);

module.exports = router;
