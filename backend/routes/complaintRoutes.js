const express = require('express');
const {
  createComplaint,
  getUserComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
} = require('../controllers/complaintController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes are protected
router.post('/', protect, upload.single('image'), createComplaint);
router.get('/', protect, getUserComplaints);
router.get('/:id', protect, getComplaint);
router.put('/:id', protect, updateComplaint);
router.delete('/:id', protect, deleteComplaint);

module.exports = router;
