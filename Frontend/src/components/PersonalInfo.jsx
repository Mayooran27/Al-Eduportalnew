import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './PersonalInfo.css';

const PersonalInfo = ({ formData, handleInputChange, handleFileChange }) => {
  const onDropFront = useCallback((acceptedFiles) => {
    handleFileChange('nicFront', acceptedFiles[0]);
  }, [handleFileChange]);

  const onDropBack = useCallback((acceptedFiles) => {
    handleFileChange('nicBack', acceptedFiles[0]);
  }, [handleFileChange]);

  const onDropSchool = useCallback((acceptedFiles) => {
    handleFileChange('schoolPhoto', acceptedFiles[0]);
  }, [handleFileChange]);

  const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
    onDrop: onDropFront,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: 5242880 // 5MB
  });

  const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
    onDrop: onDropBack,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: 5242880
  });

  const { getRootProps: getRootPropsSchool, getInputProps: getInputPropsSchool } = useDropzone({
    onDrop: onDropSchool,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: 5242880
  });

  return (
    <div className="personal-info">
      <h3 className="section-title">Personal Info</h3>
      <p className="section-subtitle">Tell us a bit about yourself to get started.</p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="e.g. Mayooran"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="e.g. Thiruchenivam"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Sex</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          <small>DD / MM / YYYY</small>
        </div>

        <div className="form-group">
          <label htmlFor="nicNumber">NIC Number</label>
          <input
            type="text"
            id="nicNumber"
            name="nicNumber"
            placeholder="e.g. 200012345678"
            value={formData.nicNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>NIC Images (Both Sides)</label>
          <div className="upload-grid">
            <div className="upload-box">
              <h4>Front Side</h4>
              <div {...getRootPropsFront()} className="dropzone">
                <input {...getInputPropsFront()} />
                {formData.nicFront ? (
                  <div className="file-info">
                    <span>📄 {formData.nicFront.name}</span>
                    <span className="file-size">{(formData.nicFront.size / 1024).toFixed(2)} KB</span>
                  </div>
                ) : (
                  <div className="dropzone-content">
                    <div className="upload-icon">📤</div>
                    <p>Upload front of your NIC</p>
                    <small>PNG, JPG up to 5MB</small>
                  </div>
                )}
              </div>
            </div>

            <div className="upload-box">
              <h4>Back Side</h4>
              <div {...getRootPropsBack()} className="dropzone">
                <input {...getInputPropsBack()} />
                {formData.nicBack ? (
                  <div className="file-info">
                    <span>📄 {formData.nicBack.name}</span>
                    <span className="file-size">{(formData.nicBack.size / 1024).toFixed(2)} KB</span>
                  </div>
                ) : (
                  <div className="dropzone-content">
                    <div className="upload-icon">📤</div>
                    <p>Upload back of your NIC</p>
                    <small>PNG, JPG up to 5MB</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Your Image in Front of Your School</label>
          <div {...getRootPropsSchool()} className="dropzone school-dropzone">
            <input {...getInputPropsSchool()} />
            {formData.schoolPhoto ? (
              <div className="file-info">
                <span>📸 {formData.schoolPhoto.name}</span>
                <span className="file-size">{(formData.schoolPhoto.size / 1024).toFixed(2)} KB</span>
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="upload-icon">📸</div>
                <p>Click to upload or drag and drop</p>
                <small>PNG, JPG up to 5MB</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;