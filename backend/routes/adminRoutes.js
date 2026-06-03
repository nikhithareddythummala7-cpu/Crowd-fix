const express = require('express');
const {
  getAllComplaints,
  updateComplaintStatus,
  assignVolunteer,
  getAnalytics,
  getVolunteerActivities,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require admin role
router.use(protect, authorize('admin'));

// Complaint management
router.get('/complaints', getAllComplaints);
router.put('/complaints/:id/status', updateComplaintStatus);
router.put('/complaints/:id/assign-volunteer', assignVolunteer);

// Analytics
router.get('/analytics', getAnalytics);
router.get('/volunteer-activities', getVolunteerActivities);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
