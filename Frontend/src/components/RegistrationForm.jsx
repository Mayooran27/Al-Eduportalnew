import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import PersonalInfo from './PersonalInfo';
import StepIndicator from './StepIndicator';
import RegistrationComplete from './RegistrationComplete';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: 'male',
    dateOfBirth: '',
    nicNumber: '',
    nicFront: null,
    nicBack: null,
    schoolPhoto: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (name, file) => {
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const submitData = new FormData();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('sex', formData.sex);
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('nicNumber', formData.nicNumber);
      
      if (formData.nicFront) {
        submitData.append('nicFront', formData.nicFront);
      }
      if (formData.nicBack) {
        submitData.append('nicBack', formData.nicBack);
      }
      if (formData.schoolPhoto) {
        submitData.append('schoolPhoto', formData.schoolPhoto);
      }

      const response = await axios.post('http://localhost:5000/api/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmissionStatus({ success: true, message: response.data.message });
      setCurrentStep(4); // Move to completion step
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <PersonalInfo 
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        );
      case 2:
        return <div className="step-placeholder"><h2>Academic Info (Step 2)</h2><p>Coming soon...</p></div>;
      case 3:
        return <div className="step-placeholder"><h2>Review & Submit (Step 3)</h2><p>Coming soon...</p></div>;
      case 4:
        return <RegistrationComplete />;
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1 className="main-title">Registration 001</h1>
        <div className="edu-portal">
          <h2 className="portal-title">EduPortal A/L</h2>
          <p className="portal-subtitle">Your Gateway to A/L Excellence</p>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Expert</span>
            <span className="stat-label">Tutors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free</span>
          </div>
        </div>
      </div>

      <div className="registration-content">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        <form onSubmit={handleSubmit}>
          <div className="step-content">
            {renderStep()}
          </div>

          {currentStep !== 4 && (
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={handleBack} className="btn btn-secondary">
                  Back
                </button>
              )}
              {currentStep < totalSteps - 1 ? (
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Next
                </button>
              ) : currentStep === totalSteps - 1 ? (
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              ) : null}
            </div>
          )}

          {submissionStatus && (
            <div className={`submission-status ${submissionStatus.success ? 'success' : 'error'}`}>
              {submissionStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;