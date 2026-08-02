import React from 'react';
import './RegistrationComplete.css';

const RegistrationComplete = () => {
  return (
    <div className="registration-complete">
      <div className="success-icon">✅</div>
      <h2>Registration Complete!</h2>
      <p>Thank you for registering with EduPortal A/L.</p>
      <div className="confirmation-details">
        <p>We have received your registration details.</p>
        <p>You will receive a confirmation email shortly.</p>
      </div>
      <div className="next-steps">
        <h4>Next Steps:</h4>
        <ul>
          <li>Check your email for confirmation</li>
          <li>Complete your profile</li>
          <li>Access your learning dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationComplete;