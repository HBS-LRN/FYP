import React from 'react';
import { Helmet } from 'react-helmet';


const NonStaff = () => {
  return (
    <div className="container">
      <div className="neon">401</div>
      <div className="door-frame">
        <div className="door">
          <div className="rectangle"></div>
          <div className="handle"></div>
          <div className="window">
            <div className="eye"></div>
            <div className="eye eye2"></div>
            <div className="leaf"></div>
          </div>
        </div>
      </div>
      <div className="message">You are not a staff of Grand Imperial Group.</div>
      <div className="message2">You tried to access a page you did not have prior authorization for.</div>

      <Helmet>
      <link rel="stylesheet" href="../../../assets/css/non-staff.css" />
  
      </Helmet>
    </div>
  );
};

export default NonStaff;
