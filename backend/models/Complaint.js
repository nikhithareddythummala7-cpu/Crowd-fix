const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['Potholes', 'Garbage', 'Water Leakage', 'Drainage Issues', 'Broken Streetlights', 'Road Damage'],
      required: [true, 'Please select a category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: 500,
    },
    image: {
      type: String,
      default: null,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    area: {
      type: String,
      required: [true, 'Please provide an area'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    resolutionDate: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);
