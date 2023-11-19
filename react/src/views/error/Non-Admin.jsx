import React from 'react';
import { Helmet } from 'react-helmet';


const NonAdmin = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>401 Unauthorized</title>
        <link rel="stylesheet" href="../../../assets/css/non-admin.css" />
      </Helmet>

      <div className="lock"></div>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        <p>Please check with the site admin if you believe this is a mistake.</p>
      </div>
    </div>
  );
};

export default NonAdmin;
