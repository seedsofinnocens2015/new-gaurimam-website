import React, { useState, useEffect } from "react";
import "./SuccessStories.css";

const SuccessStories = () => {
  const [activeCase, setActiveCase] = useState(1);
  const [isChanging, setIsChanging] = useState(false);

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

  useEffect(() => {
    setIsChanging(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsChanging(false);
      });
    });
  }, [activeCase]);

  const nextCase = () => {
    setActiveCase((prev) => (prev >= totalCases ? 1 : prev + 1));
  };

  const prevCase = () => {
    setActiveCase((prev) => (prev <= 1 ? totalCases : prev - 1));
  };

  const handleCaseClick = (caseNum) => {
    setActiveCase(caseNum);
  };

  return (
    <section id="success-stories" className="success-stories-section">
      <h2 className="success-stories-title">
        <strong>Genetic Testing</strong> Made It Happen
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
                    onClick={() => handleCaseClick(caseNum)}
                  >
                    {isActive ? (
                      <div 
                        key={`case-content-${activeCase}`} 
                        className={`case-content ${isChanging ? "changing" : "fade-in"}`}
                      >
                        <p>{successCases[activeCase].text}</p>
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
          </div>
          <div className="mobile-blue-bar"></div>
          <div className="mobile-text-overlay">
            <p>{currentCase.text}</p>
          </div>
          <button className="mobile-nav-arrow" onClick={nextCase}>
          <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#ffffff"></path> </g> </g></svg>
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

