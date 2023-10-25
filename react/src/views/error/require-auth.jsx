import React from 'react';
import { Helmet } from 'react-helmet';

const ForbiddenPage = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-bg">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Login First!</h1>
        <h2>You Are Required To Log In To See Your Record</h2>
        <a href="/login">Login</a>
      </div>

      {/* Use Helmet to set the stylesheets */}
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand:700" />
        <link rel="stylesheet" type="text/css" href="../../../assets/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="../../../assets/css/unauthorized.css" />
      </Helmet>
    </div>
  );
};

export default ForbiddenPage;
