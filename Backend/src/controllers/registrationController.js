const { validationResult, body } = require('express-validator');
const Registration = require('../models/Registration');
const path = require('path');

// Validation rules
const validateRegistration = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('sex').isIn(['male', 'female']).withMessage('Invalid sex'),
  body('dateOfBirth').isISO8601().withMessage('Invalid date format'),
  body('nicNumber').trim().notEmpty().withMessage('NIC number is required')
    .matches(/^[0-9]{12}$/).withMessage('NIC must be 12 digits')
];

// Register new student
const registerStudent = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      nicNumber
    } = req.body;

    // Check if NIC already exists
    const existingRegistration = await Registration.findByNIC(nicNumber);
    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'NIC number already registered'
      });
    }

    // Get file paths
    const nicFrontPath = req.files?.nicFront ? req.files.nicFront[0].filename : null;
    const nicBackPath = req.files?.nicBack ? req.files.nicBack[0].filename : null;
    const schoolPhotoPath = req.files?.schoolPhoto ? req.files.schoolPhoto[0].filename : null;

    // Create registration
    const registrationId = await Registration.create({
      firstName,
      lastName,
      sex,
      dateOfBirth,
      nicNumber,
      nicFrontPath,
      nicBackPath,
      schoolPhotoPath
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId,
        firstName,
        lastName
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    
    const registrations = await Registration.getAll(limit, offset);
    res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
};

// Get registration by ID
const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findById(id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registration'
    });
  }
};

// Update registration status
const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updated = await Registration.updateStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully'
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
};

module.exports = {
  validateRegistration,
  registerStudent,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus
};