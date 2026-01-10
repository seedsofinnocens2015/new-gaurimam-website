import React, { useState, useEffect, useRef } from "react";
import "./DuringCovid.css";

const tabs = ["labs", "awareness", "homeivf"];

const DuringCovid = () => {
  const [activeTab, setActiveTab] = useState("labs");
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const contentData = {
    labs: {
      image: "/Images/Image (1).png",
      title: "Labs",
      description:
        "Dr. Gauri Agarwal established India's first round-the-clock COVID-19 test-on-arrival lab at IGI Airport and scaled Genestrings Diagnostics across various airports, strengthening India's pandemic response infrastructure.",
      iconIndex: 0,
      iconImage: "/Images/Icon Container.png",
      activeIconImage: "/Images/Icon Container1.png",
    },
    awareness: {
      image: "/Images/Image (2).png",
      title: "Awareness",
      description:
        "During the COVID-19 pandemic, Dr. Gauri Agarwal provided expert media commentary on testing challenges and workforce gaps while leading high-volume diagnostic labs that supported government testing initiatives and public awareness efforts.",
      iconIndex: 1,
      iconImage: "/Images/Icon Container (1).png",
      activeIconImage: "/Images/Icon Container (1)1.png",
    },
    homeivf: {
      image: "/Images/Main Image.png",
      title: "HomeIVF",
      description:
        "Recognising the need for safer care during COVID-19, Dr. Gauri Agarwal pioneered HomeIVF, a home-based fertility care model that brought consultations, monitoring, and hormone therapy directly to patients.",
      iconIndex: 2,
      iconImage: "/Images/Icon Container (2).png",
      activeIconImage: "/Images/Icon Container (2)1.png",
    },
  };

  const currentContent = contentData[activeTab];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      e.preventDefault();

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const currentIndex = tabs.indexOf(activeTab);
        let newIndex = currentIndex;

        if (e.deltaY > 0) {
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : currentIndex;
        } else if (e.deltaY < 0) {
          newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        }

        if (newIndex !== currentIndex) {
          setActiveTab(tabs[newIndex]);
        }
      }, 150);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeTab]);

  return (
    <section className="during-covid-section" ref={sectionRef}>
      <h2 className="during-covid-title">Her Contributions <span className="during-covid-title-span">During Covid</span></h2>

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
                src={activeTab === "labs" ? contentData.labs.activeIconImage : contentData.labs.iconImage}
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
                src={activeTab === "awareness" ? contentData.awareness.activeIconImage : contentData.awareness.iconImage}
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
                src={activeTab === "homeivf" ? contentData.homeivf.activeIconImage : contentData.homeivf.iconImage}
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
