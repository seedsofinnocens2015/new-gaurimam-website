import React, { useState, useEffect, useRef } from "react";
import "./Stories.css";

const Stories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="stories-section" ref={sectionRef}>
      <div className="stories-image-container">
        <img src="/Images/tedx.png" alt="Story" className="stories-image" />
        <div className="stories-overlay">
          <div className="stories-content-left">
            <h3 className="stories-title">
              Years of Practice, <br /> Thousands of Stories
            </h3>
            <hr className="stories-divider" />
            <p className="stories-description">
              Dr. Gauri Agarwal, Delhi/NCR fertility specialist with 10+{" "}
              <br />years experience. Director, IVF at Seeds of Innocence. {" "}
              <br />MBBS, DNB Gynecology, Belgian Reproductive Fellow, <br />{" "}
              Singapore Embryology.
            </p>
          </div>
          <div className={`stories-play-right ${isVisible ? "slide-in" : ""}`}>
            <img
              src="/Images/Play Now Button.png"
              alt="Play"
              className="stories-play-icon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
