import React, { useState } from "react";
import "./DuringCovid.css";

const DuringCovid = () => {
  const [activeTab, setActiveTab] = useState("labs");

  const contentData = {
    labs: {
      image: "/Images/Image (1).png",
      title: "Labs",
      description:
        "Dr. Gauri Agarwal established India's first round-the-clock COVID-19 test-on-arrival lab at IGI Airport and scaled Genestrings Diagnostics across various airports, strengthening India's pandemic response infrastructure.",
      iconIndex: 0,
    },
    awareness: {
      image: "/Images/Image (2).png",
      title: "Awareness",
      description:
        "During the COVID-19 pandemic, Dr. Gauri Agarwal provided expert media commentary on testing challenges and workforce gaps while leading high-volume diagnostic labs that supported government testing initiatives and public awareness efforts.",
      iconIndex: 1,
    },
    homeivf: {
      image: "/Images/Main Image.png",
      title: "HomeIVF",
      description:
        "Recognising the need for safer care during COVID-19, Dr. Gauri Agarwal pioneered HomeIVF, a home-based fertility care model that brought consultations, monitoring, and hormone therapy directly to patients.",
      iconIndex: 2,
    },
  };

  const currentContent = contentData[activeTab];

  return (
    <section className="during-covid-section">
      <h2 className="during-covid-title">During Covid</h2>

      <div className="during-covid-content">
        <div className="during-covid-image-wrapper">
          <img
            src={currentContent.image}
            alt={currentContent.title}
            className="during-covid-image"
          />
        </div>

        <div className="during-covid-text-wrapper">
          <div className="during-covid-icons">
            <button
              className={`icon-circle icon-blue ${activeTab === "labs" ? "active" : ""}`}
              onClick={() => setActiveTab("labs")}
              aria-label="Labs"
            >
              <img
                src="/Images/Icon Container.png"
                alt="Labs"
                className="icon-image"
              />
            </button>
            <button
              className={`icon-circle icon-yellow ${activeTab === "awareness" ? "active" : ""}`}
              onClick={() => setActiveTab("awareness")}
              aria-label="Awareness"
            >
              <img
                src="/Images/Icon Container (1).png"
                alt="Awareness"
                className="icon-image"
              />
            </button>
            <button
              className={`icon-circle icon-blue icon-home ${activeTab === "homeivf" ? "active" : ""}`}
              onClick={() => setActiveTab("homeivf")}
              aria-label="HomeIVF"
            >
              <img
                src="/Images/Icon Container (2).png"
                alt="HomeIVF"
                className="icon-image"
              />
            </button>
          </div>

          <h3 className="labs-title">{currentContent.title}</h3>

          <p className="labs-description">{currentContent.description}</p>
        </div>
      </div>
    </section>
  );
};

export default DuringCovid;
