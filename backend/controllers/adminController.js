const Complaint = require('../models/Complaint');
const User = require('../models/User');
const VolunteerActivity = require('../models/VolunteerActivity');

// Get all complaints (admin only)
exports.getAllComplaints = async (req, res, next) => {
  try {
    const { category, status, priority, area } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (area) filter.area = new RegExp(area, 'i');

    const complaints = await Complaint.find(filter)
      .populate('userId', 'name email mobile')
      .populate('assignedVolunteer', 'name email mobile')
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

// Update complaint status and priority (admin only)
exports.updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, priority, feedback } = req.body;
    const complaintId = req.params.id;

    let complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;
    if (feedback) complaint.feedback = feedback;

    if (status === 'Resolved') {
      complaint.resolutionDate = new Date();
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign volunteer to complaint (admin only)
exports.assignVolunteer = async (req, res, next) => {
  try {
    const { volunteerId } = req.body;
    const complaintId = req.params.id;

    // Check if volunteer exists
    const volunteer = await User.findById(volunteerId);
    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found',
      });
    }

    let complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        assignedVolunteer: volunteerId,
        status: 'In Progress'
      },
      { new: true }
    ).populate('assignedVolunteer', 'name email mobile');

    res.status(200).json({
      success: true,
      message: 'Volunteer assigned successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get analytics (admin only)
exports.getAnalytics = async (req, res, next) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });

    const categoryWise = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const areaWise = await Complaint.aggregate([
      { $group: { _id: '$area', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const priorityWise = await Complaint.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVolunteers = await User.countDocuments({ role: 'volunteer' });

    res.status(200).json({
      success: true,
      analytics: {
        complaints: {
          total: totalComplaints,
          resolved: resolvedComplaints,
          pending: pendingComplaints,
          inProgress: inProgressComplaints,
        },
        categoryWise,
        areaWise,
        priorityWise,
        users: {
          total: totalUsers,
          volunteers: totalVolunteers,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Monitor volunteer activities (admin only)
exports.getVolunteerActivities = async (req, res, next) => {
  try {
    const activities = await VolunteerActivity.find()
      .populate('volunteerId', 'name email mobile area')
      .populate('complaintId', 'category area status priority userId createdAt')
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

// Manage users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    let filter = {};

    if (role) filter.role = role;

    const users = await User.find(filter).select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
