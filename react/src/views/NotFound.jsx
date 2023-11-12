export default function NotFound() {
  return (
    <div>
      <section class="error-section">
        <div class="container">
          <div class="error-page">
            <img alt="girl" src="assets/img/404.png" data-aos="flip-up" data-aos-delay="300"
              data-aos-duration="400" height={550}/>
            <h2>404</h2>
            <h4 data-aos="flip-up" data-aos-delay="400" data-aos-duration="500">Sorry, we were unuble to find that
              page</h4>
              <p data-aos="flip-up" data-aos-delay="600" data-aos-duration="700">We couldn't locate the requested page. Please check the link and try again.<br /> If the issue persists, feel free to contact our support team.</p>

            <a href="/index"><i class="fa-solid fa-house"></i></a>
          </div>
        </div>
      </section>
    </div>
  )
}