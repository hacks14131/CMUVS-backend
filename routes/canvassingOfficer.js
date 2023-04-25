const express = require('express');
const router = express.Router();

const {
  createCanvassingOfficer,
  findCanvassingOfficerTask,
  findCanvassingOfficerById,
  checkCanvassStatus,
  updateCanvassingOfficerTaskStatus,
  getCanvasserOfficerFullName,
  getCanvasserOfficer,
} = require('../controller/canvassingOfficer');

router.post('/', createCanvassingOfficer);
router.get('/:id', findCanvassingOfficerById);
router.get('/canvass-list/:id', findCanvassingOfficerTask);
router.get('/info/:id/:canvassID', getCanvasserOfficerFullName);
router.get('/info/:canvassID', getCanvasserOfficer);
router.get('/canvass-status/:id', checkCanvassStatus);
router.patch(
  '/update-task-status/:id/:canvassid',
  updateCanvassingOfficerTaskStatus
);

module.exports = router;
