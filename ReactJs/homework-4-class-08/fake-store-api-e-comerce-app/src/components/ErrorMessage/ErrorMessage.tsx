import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message">
      <h3>Oops! Something went wrong</h3>
      <p>{message || 'Failed to load data. Please try again later.'}</p>
    </div>
  );
};

export default ErrorMessage;