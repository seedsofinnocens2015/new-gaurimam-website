import React, { useState } from "react";
import "./SuccessStories.css";

const SuccessStories = () => {
  const [activeCase, setActiveCase] = useState(1);

  const successCases = {
    1: {
      text: "A Thalassemia minor couple, blessed with healthy babies through our genetic testing.",
      image: "/Images/Rectangle 40602.png"
    },
    2: {
      text: "Our genetic solutions helped ensure a healthy baby despite the father's history of autism.",
      image: "/Images/Rectangle 40602 (1).png"
    },
    3: {
      text: "With our advanced genetic testing, a couple whose first child had a genetic syndrome welcomed their second baby healthy.",
      image: "/Images/Frame 1410138891.png"
    },
    4: {
      text: "With our genetic testing, a mother with a history of breast cancer was able to conceive a healthy, cancer-free baby.",
      image: "/Images/image 1694810429.png"
    },
    5: {
      text: "The father had balanced translocation and their first child had developmental delay. With PGT-SR, they welcomed a healthy baby.",
      image: "/Images/2 1.png"
    }
  };

  const currentCase = successCases[activeCase];
  const totalCases = Object.keys(successCases).length;

  const nextCase = () => {
    setActiveCase((prev) => (prev >= totalCases ? 1 : prev + 1));
  };

  const prevCase = () => {
    setActiveCase((prev) => (prev <= 1 ? totalCases : prev - 1));
  };

  return (
    <section id="success-stories" className="success-stories-section">
      <h2 className="success-stories-title">
        Success Stories <span className="star-emoji">⭐</span>
      </h2>
      
      <div className="success-stories-card desktop-card">
        <div className="success-stories-left">
          <div className="cases-list">
            {[1, 2, 3, 4, 5].map((caseNum) => {
              const isActive = activeCase === caseNum;
              
              return (
                <div key={caseNum} className={`case-button-wrapper ${isActive ? "has-active" : ""}`}>
                  {isActive && <div className="case-button-spacer" />}
                  <button
                    className={`case-button ${isActive ? "active" : ""}`}
                    onClick={() => setActiveCase(caseNum)}
                  >
                    {isActive ? (
                      <div className="case-content">
                        <p>{successCases[caseNum].text}</p>
                      </div>
                    ) : (
                      <>
                        <div className="case-icon">
                          <span>+</span>
                        </div>
                        <span>Case {caseNum}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="success-stories-right">
          <img 
            src={currentCase.image} 
            alt={`Success Story Case ${activeCase}`}
            className="success-story-image"
          />
        </div>
      </div>

      <div className="mobile-slider-container">
        <div className="mobile-slider-wrapper">
          <div className="mobile-image-container">
            <img 
              src={currentCase.image} 
              alt={`Success Story Case ${activeCase}`}
              className="mobile-slider-image"
            />
            <div className="mobile-text-overlay">
              <p>{currentCase.text}</p>
            </div>
          </div>
          <button className="mobile-nav-arrow" onClick={nextCase}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="rgba(0, 0, 0, 0.5)" stroke="white" strokeWidth="1"/>
              <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="mobile-case-indicators">
          {[1, 2, 3, 4, 5].map((caseNum) => (
            <button
              key={caseNum}
              className={`mobile-indicator ${activeCase === caseNum ? "active" : ""}`}
              onClick={() => setActiveCase(caseNum)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

