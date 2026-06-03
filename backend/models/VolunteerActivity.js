const mongoose = require('mongoose');

const volunteerActivitySchema = new mongoose.Schema(
  {
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
      required: true,
    },
    activityType: {
      type: String,
      enum: ['Verified', 'In Investigation', 'Escalated', 'Resolved'],
      default: 'In Investigation',
    },
    description: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('VolunteerActivity', volunteerActivitySchema);
