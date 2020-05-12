import React from "react";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <em className="fas fa-info-circle"></em> {alert.message}
      </div>
    )
  );
};

export default Alert;
