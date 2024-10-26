import React from 'react';
import '../css/componentCss/alert.css'; // Import the CSS file for styling

const FloatingAlert = ({ message, isVisible, onClose, successs }) => {
  return (
    <div className={`${successs ? 'success-alert' : 'failed-alert'} floating-alert ${isVisible ? 'show' : ''}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default FloatingAlert;
