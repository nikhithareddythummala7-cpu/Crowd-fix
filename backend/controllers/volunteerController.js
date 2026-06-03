const Complaint = require('../models/Complaint');
const VolunteerActivity = require('../models/VolunteerActivity');
const User = require('../models/User');

// Get volunteer nearby complaints
exports.getNearbyComplaints = async (req, res, next) => {
  try {
    const { area } = req.query;
    let filter = { status: { $in: ['Pending', 'In Progress'] } };

    if (area) {
      filter.area = new RegExp(area, 'i');
    }

    const complaints = await Complaint.find(filter)
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get assigned complaints
exports.getAssignedComplaints = async (req, res, next) => {
  try {
    const volunteerId = req.user.id;

    const complaints = await Complaint.find({ assignedVolunteer: volunteerId })
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create volunteer activity
exports.createActivity = async (req, res, next) => {
  try {
    const { complaintId, activityType, description } = req.body;

    if (!complaintId || !activityType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const activity = await VolunteerActivity.create({
      volunteerId: req.user.id,
      complaintId,
      activityType,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get volunteer activities
exports.getVolunteerActivities = async (req, res, next) => {
  try {
    const volunteerId = req.user.id;

    const activities = await VolunteerActivity.find({ volunteerId })
      .populate('complaintId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update volunteer area
exports.updateVolunteerArea = async (req, res, next) => {
  try {
    const { area } = req.body;

    if (!area) {
      return res.status(400).json({
        success: false,
        message: 'Please provide area',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { area },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Area updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
