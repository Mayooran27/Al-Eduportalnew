import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="step-indicator">
      <div className="step-header">
        <span className="step-label">Step {currentStep} of {totalSteps}</span>
      </div>
      <div className="step-progress">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="step-dots">
          {[...Array(totalSteps)].map((_, index) => (
            <div 
              key={index}
              className={`step-dot ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;