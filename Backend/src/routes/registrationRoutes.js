const express = require('express');
const router = express.Router();
const { uploadFiles } = require('../middleware/upload');
const {
  validateRegistration,
  registerStudent,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus
} = require('../controllers/registrationController');

// Register new student
router.post(
  '/register',
  uploadFiles,
  validateRegistration,
  registerStudent
);

// Get all registrations
router.get('/registrations', getAllRegistrations);

// Get registration by ID
router.get('/registrations/:id', getRegistrationById);

// Update registration status
router.put('/registrations/:id/status', updateRegistrationStatus);

module.exports = router;