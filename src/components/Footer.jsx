import React from "react";
import "./Footer.css";

const Footer = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
                      <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="footer-link">
                        About
                      </a>
                      <a href="#podcasts" onClick={(e) => scrollToSection(e, 'podcasts')} className="footer-link">
                        Podcasts
                      </a>
                      <a href="#success-stories" onClick={(e) => scrollToSection(e, 'success-stories')} className="footer-link">
                        Success Stories
                      </a>
                      <a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="footer-link">
                        News
                      </a>
                    </div>
                    <div className="footer-links-column">
                      <a href="#tedx" onClick={(e) => scrollToSection(e, 'tedx')} className="footer-link">
                        TedX
                      </a>
                      <a href="#initiatives" onClick={(e) => scrollToSection(e, 'initiatives')} className="footer-link">
                        Initiatives
                      </a>
                      <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="footer-link">
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
                    <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="footer-link">
                      About
                    </a>
                    <a href="#podcasts" onClick={(e) => scrollToSection(e, 'podcasts')} className="footer-link">
                      Podcasts
                    </a>
                    <a href="#success-stories" onClick={(e) => scrollToSection(e, 'success-stories')} className="footer-link">
                      Success Stories
                    </a>
                    <a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="footer-link">
                      News
                    </a>
                  </div>
                  <div className="footer-links-column footer-links-column-mobile-right">
                    <a href="#tedx" onClick={(e) => scrollToSection(e, 'tedx')} className="footer-link">
                      TedX
                    </a>
                    <a href="#initiatives" onClick={(e) => scrollToSection(e, 'initiatives')} className="footer-link">
                      Initiatives
                    </a>
                    <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="footer-link">
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
