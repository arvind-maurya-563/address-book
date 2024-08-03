import React from 'react';
import '../styles/loader.css';
export const AlertModal = ({onClose,message}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-icon">✔️</div>
          <div className="modal-title">Information</div>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
