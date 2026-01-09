import React, { useState } from "react";
import "./NewsSlider.css";

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      image: "/Images/Frame 1410138900.png",
      source: "Z News",
      title: "IVF Treatment With World's First At-Home IVF Platform Launches",
    },
    {
      id: 2,
      image: "/Images/Frame 1410138901.png",
      source: "FEMINA",
      title: "IVF Treatment With World's First At-Home IVF Platform Launches",
    },
    {
      id: 3,
      image: "/Images/Frame 1410138900.png",
      source: "Your story",
      title: "Dr. Gauri Agarwal - Founder of Center for IVF",
    },
    {
      id: 4,
      image: "/Images/Frame 1410138901.png",
      source: "Times of India",
      title: "Breaking Barriers in Reproductive Health",
    },
    {
      id: 5,
      image: "/Images/Frame 1410138900.png",
      source: "Hindustan Times",
      title: "Innovation in Healthcare Technology",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= newsItems.length - 2) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return Math.max(0, newsItems.length - 2);
      }
      return prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="news" className="news-slider-section">
      <h2 className="news-section-title">In the News</h2>

      <div className="news-slider-container">
        <div className="news-slider-wrapper">
          <div
            className="news-slider-track"
            style={{
              transform: `translateX(calc(-${currentSlide} * (40% + 12px)))`,
            }}
          >
            {newsItems.map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="news-slider-navigation">
        <div className="news-slider-dots">
          {newsItems.map((_, index) => (
            <button
              key={index}
              className={`news-slider-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="news-slider-arrow news-slider-arrow-left" onClick={prevSlide}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="news-slider-arrow news-slider-arrow-right" onClick={nextSlide}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NewsSlider;
