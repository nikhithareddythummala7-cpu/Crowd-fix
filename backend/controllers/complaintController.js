const Complaint = require('../models/Complaint');
const cloudinary = require('../config/cloudinary');
const fs = require('fs').promises;

// Create complaint
exports.createComplaint = async (req, res, next) => {
  try {
    const { category, description, area, latitude, longitude } = req.body;

    // Validation
    if (!category || !description || !area) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'crowdfix-complaints',
          resource_type: 'auto',
        });
        imageUrl = result.secure_url;
        // Delete file from server after upload
        await fs.unlink(req.file.path);
      } catch (error) {
        console.error('Cloudinary upload failed:', error);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
        });
      }
    }

    // Create complaint
    const complaint = await Complaint.create({
      userId: req.user.id,
      category,
      description,
      area,
      image: imageUrl,
      location: {
        latitude: latitude || null,
        longitude: longitude || null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      complaint,
    });
  } catch (error) {
    // Clean up uploaded file if it exists
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all complaints of user
exports.getUserComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id })
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

// Get single complaint
exports.getComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email mobile')
      .populate('assignedVolunteer', 'name email mobile');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update complaint
exports.updateComplaint = async (req, res, next) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    // Check if user is the complaint owner or admin
    if (complaint.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this complaint',
      });
    }

    const { category, description, area, latitude, longitude } = req.body;

    if (category) complaint.category = category;
    if (description) complaint.description = description;
    if (area) complaint.area = area;
    if (latitude || longitude) {
      complaint.location = {
        latitude: latitude || complaint.location.latitude,
        longitude: longitude || complaint.location.longitude,
      };
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

// Delete complaint
exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    // Check if user is the complaint owner or admin
    if (complaint.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this complaint',
      });
    }

    // Delete image from cloudinary if exists
    if (complaint.image) {
      try {
        const publicId = complaint.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`crowdfix-complaints/${publicId}`);
      } catch (error) {
        console.log('Error deleting image from cloudinary:', error);
      }
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
