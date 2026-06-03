const express = require('express');
const {
  getNearbyComplaints,
  getAssignedComplaints,
  createActivity,
  getVolunteerActivities,
  updateVolunteerArea,
} = require('../controllers/volunteerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require volunteer role
router.use(protect, authorize('volunteer', 'admin'));

// Complaint routes
router.get('/nearby-complaints', getNearbyComplaints);
router.get('/assigned-complaints', getAssignedComplaints);

// Activity routes
router.post('/activities', createActivity);
router.get('/activities', getVolunteerActivities);

// Profile update
router.put('/area', updateVolunteerArea);

module.exports = router;
