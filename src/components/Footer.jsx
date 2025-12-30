import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-desktop">
        <div className="footer-top-section">
          <div className="footer-arch-container">
            <img
              src="/Images/footer.png"
              alt="Arch"
              className="footer-arch-image desktop-footer-image"
            />

            <div className="footer-content-overlay">
              <div className="footer-content">
                <div className="footer-quick-links">
                  <h3 className="footer-section-title">Quick Links</h3>
                  <div className="footer-links-grid">
                    <div className="footer-links-column">
                      <a href="#about" className="footer-link">
                        About
                      </a>
                      <a href="#featured" className="footer-link">
                        Featured
                      </a>
                      <a href="#awards" className="footer-link">
                        Awards
                      </a>
                      <a href="#podcasts" className="footer-link">
                        Podcasts
                      </a>
                    </div>
                    <div className="footer-links-column">
                      <a href="#tedx" className="footer-link">
                        TedX
                      </a>
                      <a href="#success-stories" className="footer-link">
                        Success Stories
                      </a>
                      <a href="#initiatives" className="footer-link">
                        Initiatives
                      </a>
                      <a href="#gallery" className="footer-link">
                        Gallery
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          style={{ marginLeft: "4px", display: "inline-block" }}
                        >
                          <path
                            d="M1 11L11 1M11 1H1M11 1V11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="footer-contact">
                  <h3 className="footer-section-title">Contact</h3>
                  <div className="footer-contact-info">
                    <p>Delhi NCR, Ghaziabad</p>
                    <p>98103-60812</p>
                    <p>info@example.com</p>
                  </div>
                </div>
              </div>

              <div className="footer-address-section">
                <p className="footer-address">
                  Gauri Agarwal - 123 Janpath Rd, New Delhi, Delhi, 110001
                </p>
                <p className="footer-copyright">© 2025 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-mobile">
        <div className="mobile-footer-background">
          <img
            src="/Images/Frame 1410138996 (1).png"
            alt="Footer Background Mobile"
            className="mobile-footer-bg-image"
          />

          <div className="mobile-footer-content">
            <div className="footer-content">
              <div className="footer-quick-links">
                <h3 className="footer-section-title">Quick Links</h3>
                <div className="footer-links-grid">
                  <div className="footer-links-column">
                    <a href="#about" className="footer-link">
                      About
                    </a>
                    <a href="#featured" className="footer-link">
                      Featured
                    </a>
                    <a href="#awards" className="footer-link">
                      Awards
                    </a>
                    <a href="#podcasts" className="footer-link">
                      Podcasts
                    </a>
                  </div>
                  <div className="footer-links-column footer-links-column-mobile-right">
                    <a href="#tedx" className="footer-link">
                      TedX
                    </a>
                    <a href="#success-stories" className="footer-link">
                      Success Stories
                    </a>
                    <a href="#initiatives" className="footer-link">
                      Initiatives
                    </a>
                    <a href="#gallery" className="footer-link">
                      Gallery
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{ marginLeft: "4px", display: "inline-block" }}
                      >
                        <path
                          d="M1 11L11 1M11 1H1M11 1V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-contact">
                <h3 className="footer-section-title">Contact</h3>
                <div className="footer-contact-info">
                  <p>Delhi NCR, Ghaziabad</p>
                  <p>98103-60812</p>
                  <p>info@example.com</p>
                </div>
              </div>
            </div>

            <div className="footer-address-section">
              <p className="footer-address">
                Gauri Agarwal - 123 Janpath Rd, New Delhi, Delhi, 110001
              </p>
              <p className="footer-copyright">© 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
