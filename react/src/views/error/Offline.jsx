import React from 'react';

export default function OffLine() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <section className="error-section">
        <div className="container">
          <div className="error-page">
            <img alt="girl" src="assets/img/404.png" data-aos="flip-up" data-aos-delay="300"
              data-aos-duration="400" height={550} />
            <h2>Offline</h2>
            <h4 data-aos="flip-up" data-aos-delay="400" data-aos-duration="500">Please Check Your Connectivity</h4>
            <p data-aos="flip-up" data-aos-delay="600" data-aos-duration="700">Try To Refresh Again<br /> </p>

            <a href="#" onClick={handleRefresh}>
              <i className="fa fa-repeat" aria-hidden="true"></i>
            </a>
          </div>
          <i className="fa-solid fa-wifi-slash"></i>
        </div>
      </section>
    </div>
  );
}
