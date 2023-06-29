import React from "react";

import { Helmet } from 'react-helmet';

export default function AccessProhibited() {
  return (
    
    <div>
       <Helmet>
      <link rel="stylesheet" href="css/accessprohibited.css" />
      </Helmet>
      <body>
     
        <div class="lock"></div>
        <div class="message">
          <h1>Access to this page is restricted</h1>
          <p>Please check with the site admin if you believe this is a mistake.</p>
        </div>
      </body>
    </div>
  )
}
