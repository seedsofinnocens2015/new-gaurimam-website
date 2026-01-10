import React, { useState, useEffect, useRef } from "react";
import "./SemiCircleArcSection.css";

const baseImages = [
  "/Images/Container.png",
  "/Images/Container (1).png",
  "/Images/Container (2).png",
  "/Images/Container (3).png",
  "/Images/Container (4).png",
  "/Images/Container (5).jpg",
  "/Images/Container (6).jpg",
  "/Images/Container (7).jpg",
];

const mobileImages = [
 "/Images/Container.png",
  "/Images/Container (1).png",
  "/Images/Container (2).png",
  "/Images/Container (3).png",
];

const images = [...baseImages, ...baseImages];
const mobileImagesFull = [...mobileImages, ...mobileImages];

const SemiCircleArcSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageScrollProgress, setImageScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920,
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const academicTimelineRef = useRef(null);
  const missionSectionRef = useRef(null);
  const sliderRef = useRef(null);
  const imageScrollTimeoutRef = useRef(null);
  const timelineScrollTimeoutRef = useRef(null);

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easeOutQuart = (t) => {
    return 1 - Math.pow(1 - t, 4);
  };

  const smoothStep = (t) => {
    return t * t * (3 - 2 * t);
  }; 


  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) =>
        prev === timelinePoints.length - 1 ? 0 : prev + 1,
      );
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) =>
        prev === 0 ? timelinePoints.length - 1 : prev - 1,
      );
    }
  };


  const getRadius = () => {
    if (windowWidth >= 1440) return 650;
    if (windowWidth >= 1200) return 550;
    if (windowWidth >= 1024) return 480;
    if (windowWidth >= 768) return 400;
    return 300; 
  };

  const radius = getRadius();


  const getImageWidth = () => {
    if (windowWidth >= 1440) return 200;
    if (windowWidth >= 1200) return 180;
    if (windowWidth >= 1024) return 150;
    if (windowWidth >= 768) return 130;
    return 100;
  };

  const getImageHeight = () => {
    if (windowWidth >= 1440) return 267;
    if (windowWidth >= 1200) return 240;
    if (windowWidth >= 1024) return 200;
    if (windowWidth >= 768) return 173;
    return 133;
  };

  const imageWidth = getImageWidth();
  const imageHeight = getImageHeight();


  const getSVGSize = () => {
    if (windowWidth >= 1440) return 1400;
    if (windowWidth >= 1200) return 1200;
    if (windowWidth >= 1024) return 1000;
    if (windowWidth >= 768) return 800;
    return 600;
  };

  const svgSize = getSVGSize();



  const totalImages = images.length;
  const angleStep = 360 / totalImages; 


  const timelinePoints = [
    {
      number: "01",
      icon: "🎓",
      color: "#D1F373",
      text: "Dr. Agarwal finished her MBBS degree from Bharati Vidyapeeth Medical College, Pune.",
    },
    {
      number: "02",
      icon: "👶",
      color: "#049DE3",
      text: "DNB Obstetrics & Gynaecology residency program at KG Superspecialty Hospital, Coimbatore.",
    },
    {
      number: "03",
      icon: "💊",
      color: "#E93C50",
      text: "Fellowship in Reproductive Medicine (Infertility) from the University of Gent, Belgium.",
    },
    {
      number: "04",
      icon: "🩺",
      color: " #FEBF11",
      text: "Training in Embryology at the National University of Singapore.",
    },
  ];
  const timelineStartAngle = 200; 
  const timelineEndAngle = 340; 
  const timelineStep =
    (timelineEndAngle - timelineStartAngle) / (timelinePoints.length - 1);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (windowWidth >= 768) return; 

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === timelinePoints.length - 1 ? 0 : prev + 1,
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [windowWidth, timelinePoints.length]);


  useEffect(() => {
    const handleScroll = () => {
      if (!missionSectionRef.current) return;

      setIsScrolling(true);
      
      if (imageScrollTimeoutRef.current) {
        clearTimeout(imageScrollTimeoutRef.current);
      }

      const element = missionSectionRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      const startPoint = windowHeight * 0.9;
      const endPoint = -windowHeight * 0.2; 

      let progress = 0;

      if (elementTop < windowHeight && elementBottom > 0) {
        if (elementTop <= startPoint && elementTop >= endPoint) {
          const scrollableDistance = startPoint - endPoint;
          const scrolled = startPoint - elementTop;
          progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        } else if (elementTop < endPoint) {
          progress = 1;
        } else {
          progress = 0;
        }
      } else {
        progress = 0;
      }

      setImageScrollProgress(progress);

      imageScrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    let rafId = null;
    const optimizedScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", optimizedScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (imageScrollTimeoutRef.current) {
        clearTimeout(imageScrollTimeoutRef.current);
      }
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (!academicTimelineRef.current) return;

      setIsScrolling(true);
      
      if (timelineScrollTimeoutRef.current) {
        clearTimeout(timelineScrollTimeoutRef.current);
      }

      const element = academicTimelineRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      const startPoint = windowHeight * 0.9; 
      const endPoint = windowHeight * 0.1; 

      let progress = 0;

      if (elementTop < windowHeight && elementBottom > 0) {
        if (elementTop <= startPoint && elementTop >= endPoint) {
          const scrollableDistance = startPoint - endPoint;
          const scrolled = startPoint - elementTop;
          progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
        } else if (elementTop < endPoint) {
          progress = 1;
        } else {
          progress = 0;
        }
      } else {
        progress = 0;
      }

      setScrollProgress(progress);

      timelineScrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    let rafId = null;
    const optimizedScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", optimizedScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (timelineScrollTimeoutRef.current) {
        clearTimeout(timelineScrollTimeoutRef.current);
      }
    };
  }, []);


  const getTimelinePointPosition = (index) => {

    const timelineRadius = radius * 0.85;
    
    const isFirstOrLast = index === 0 || index === timelinePoints.length - 1;
    const iconSize = windowWidth >= 1024 ? 40 : windowWidth >= 768 ? 27.5 : 20;
    const arcStrokeWidth = windowWidth >= 768 ? 1 : 0.75;
    
    let iconRadius;
    if (isFirstOrLast) {  
      iconRadius = timelineRadius - arcStrokeWidth + iconSize;
    } else {
      const iconOffset = iconSize + 5;
      iconRadius = timelineRadius + iconOffset;
    }


    const verticalOffset =
      windowWidth >= 1024 ? 100 : windowWidth >= 768 ? 80 : 60;


    const finalAngle = timelineStartAngle + timelineStep * index;


    const startAngle = timelineEndAngle;


    const currentAngle = startAngle + (finalAngle - startAngle) * scrollProgress;

    const radian = (currentAngle * Math.PI) / 180;

    const x = Math.cos(radian) * iconRadius;
    const y = Math.abs(Math.sin(radian)) * iconRadius - verticalOffset;

    return { x, y };
  };

  return (
    <section id="about" className="arc-section">
      <div className="mobile-semi-circle-images">
        <div className="mobile-arc-container">
          {mobileImagesFull.map((src, index) => {
            const totalMobileImages = mobileImagesFull.length;
            const mobileAngleStep = 360 / totalMobileImages;
            
            const baseAngle = index * mobileAngleStep;
            const scrollRotation = -90 + imageScrollProgress * 45;
            const adjustedAngle = baseAngle + scrollRotation;
            const radian = (adjustedAngle * Math.PI) / 180;

            const mobileRadius = windowWidth >= 480 ? 220 : 200;

            const x = Math.sin(radian) * mobileRadius;
            const yOffset = windowWidth >= 480 ? 80 : 70;
            const y = -Math.cos(radian) * mobileRadius + yOffset;

            const imageRotation = adjustedAngle + 180;

            const mobileImageWidth = windowWidth >= 480 ? 130 : 110;
            const mobileImageHeight = windowWidth >= 480 ? 173 : 147;

            const isTopHalf = y < yOffset;
            const zIndex = isTopHalf ? 8 + Math.abs((y / mobileRadius) * 3) : 3;

            return (
              <img
                key={`mobile-img-${index}`}
                src={src}
                alt={`mobile-arc-${index}`}
                className="mobile-semi-circle-img"
                style={{
                  width: `${mobileImageWidth}px`,
                  height: `${mobileImageHeight}px`,
                  marginLeft: `-${mobileImageWidth / 2}px`,
                  marginTop: `-${mobileImageHeight / 2}px`,
                  transform: `translate(${x}px, ${y}px) rotate(${imageRotation}deg)`,
                  transformOrigin: "center center",
                  zIndex: Math.round(zIndex),
                  transition: isScrolling ? "none" : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            );
          })}
        </div>
        <div className="mobile-arc-white-overlay"></div>
      </div>

      <div className="arc-wrapper">
        <div
          className="arc-container"
          style={{
            transform: `rotate(${-90 + imageScrollProgress * 45}deg)`, 
            transformOrigin: "center center",
            transition: isScrolling ? "none" : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)", 
          }}
        >
          {images.map((src, index) => {


            const baseAngle = index * angleStep;
            const radian = (baseAngle * Math.PI) / 180;


            const normalizedAngle = baseAngle % 360;
            

            const baseSpacingMultiplier = 1.05;
            
          
            const isBottomCenter = normalizedAngle > 150 && normalizedAngle < 210;
            const isBottomRegion = normalizedAngle > 140 && normalizedAngle < 220;
            
            let adjustedRadius = radius * baseSpacingMultiplier; 
            if (isBottomCenter) {
              adjustedRadius = radius * 0.92; 
            } else if (isBottomRegion) {
              adjustedRadius = radius * 0.97; 
            } else if (normalizedAngle > 220 && normalizedAngle < 320) {
              adjustedRadius = radius * 1.02; 
            }

            const x = Math.sin(radian) * adjustedRadius; 
            const yOffset =
              windowWidth >= 1024 ? 50 : windowWidth >= 768 ? 40 : 30;
            const y = -Math.cos(radian) * adjustedRadius + yOffset; 

            const imageRotation = baseAngle + 180; 



            const isTopHalf = y < 0;

            const zIndex = isTopHalf ? 8 + Math.abs((y / radius) * 3) : 3;

            return (
              <img
                key={index}
                src={src}
                alt="arc-img"
                className="arc-image"
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                  marginLeft: `-${imageWidth / 2}px`,
                  marginTop: `-${imageHeight / 2}px`,
                  transform: `translate(${x}px, ${y}px) rotate(${imageRotation}deg)`,
                  zIndex: Math.round(zIndex),
                  transition: isScrolling ? "none" : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)", 
                }}
              />
            );
          })}
        </div>

        <svg
          className="timeline-line-svg"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: `${svgSize}px`, height: `${svgSize}px` }}
        >
          <path
            className="timeline-path"
            d={(() => {

              const timelineRadius = radius * 0.85; 
              const startAngle = timelineStartAngle;
              const endAngle = timelineEndAngle;
              const startRadian = (startAngle * Math.PI) / 180;
              const endRadian = (endAngle * Math.PI) / 180;

              const center = svgSize / 2;
              const startX = Math.cos(startRadian) * timelineRadius + center;
              const startY =
                Math.abs(Math.sin(startRadian)) * timelineRadius + center;
              const endX = Math.cos(endRadian) * timelineRadius + center;
              const endY =
                Math.abs(Math.sin(endRadian)) * timelineRadius + center;



              const arcRadius = timelineRadius;
              return `M ${startX},${startY} A ${arcRadius},${arcRadius} 0 0,0 ${endX},${endY}`;
            })()}
            fill="none"
            stroke="#d1d5db"
            strokeWidth={windowWidth >= 768 ? "2" : "1.5"}
          />
        </svg>

        {timelinePoints.map((point, index) => {

          const { x, y } = getTimelinePointPosition(index);


          const pointClass =
            index === 0
              ? "timeline-point-arc point-left"
              : index === 3
                ? "timeline-point-arc point-right"
                : "timeline-point-arc";


          const isMobile = windowWidth < 768;

          return (
            <div
              key={index}
              className={pointClass}
              style={
                isMobile
                  ? {}
                  : {
                      transform: `translate(${x}px, ${y}px)`,
                      transition: "none",
                    }
              }
            >
              <div
                className="point-icon"
                style={{ backgroundColor: point.color }}
              >
                <span className="point-icon-emoji">{point.icon}</span>
              </div>
              {index === 0 && !isMobile && (
                <div 
                  className="point-content-bottom-left"
                  style={{
                    opacity: scrollProgress >= 1 ? 1 : 0,
                    transform: scrollProgress >= 1 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(20px) scale(0.9)',
                    transition: 'opacity 1s ease-in-out 0.3s, transform 1s ease-out 0.3s'
                  }}
                >
                  <div className="point-number">{point.number}</div>
                  <div className="point-text">{point.text}</div>
                </div>
              )}
              {index === 1 && !isMobile && (
                <div 
                  className="point-content-bottom"
                  style={{
                    opacity: scrollProgress >= 1 ? 1 : 0,
                    transform: scrollProgress >= 1 
                      ? 'translate(-50%, 0) scale(1)' 
                      : 'translate(-50%, 20px) scale(0.9)',
                    transition: 'opacity 1s ease-in-out 0.5s, transform 1s ease-out 0.5s'
                  }}
                >
                  <div className="point-number">{point.number}</div>
                  <div className="point-text">{point.text}</div>
                </div>
              )}
              {index === 2 && !isMobile && (
                <div 
                  className="point-content-bottom point-content-bottom-right"
                  style={{
                    opacity: scrollProgress >= 1 ? 1 : 0,
                    transform: scrollProgress >= 1 
                      ? 'translate(-50%, 0) scale(1)' 
                      : 'translate(-50%, 20px) scale(0.9)',
                    transition: 'opacity 1s ease-in-out 0.7s, transform 1s ease-out 0.7s'
                  }}
                >
                  <div className="point-number">{point.number}</div>
                  <div className="point-text">{point.text}</div>
                </div>
              )}
              {index === 3 && !isMobile && (
                <div 
                  className="point-content-right"
                  style={{
                    opacity: scrollProgress >= 1 ? 1 : 0,
                    transform: scrollProgress >= 1 
                      ? 'translateX(0) scale(1)' 
                      : 'translateX(20px) scale(0.9)',
                    transition: 'opacity 1s ease-in-out 0.9s, transform 1s ease-out 0.9s'
                  }}
                >
                  <div className="point-number">{point.number}</div>
                  <div className="point-text">{point.text}</div>
                </div>
              )}
            </div>
          );
        })}

        <div className="arc-white-overlay"></div>

        <div className="arc-text" ref={missionSectionRef}>
          <h2 className="mission-text">A <strong>Woman on a Mission</strong> to</h2>
          <h2 className="mission-text">Make <strong>Fertility Care</strong></h2>
          <h2 className="mission-text"><strong>Accessible to All</strong></h2>
        </div>

        <div className="academic-timeline" ref={academicTimelineRef}>
          <h2 className="timeline-title">
            <span className="title-line-1">A Record of Academic</span>
            <span className="title-line-2">Excellence</span>
          </h2>

          <div className="mobile-timeline-container">
            <svg
              className="mobile-timeline-arc-svg"
              viewBox={`0 0 ${windowWidth >= 480 ? 600 : 500} ${windowWidth >= 480 ? 600 : 500}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ 
                width: windowWidth >= 480 ? '600px' : '500px', 
                height: windowWidth >= 480 ? '600px' : '500px' 
              }}
            >
              <path
                className="mobile-timeline-arc-path"
                d={(() => {
                  const mobileTimelineRadius = (windowWidth >= 480 ? 220 : 200) * 0.85;
                  const mobileStartAngle = timelineStartAngle;
                  const mobileEndAngle = timelineEndAngle;
                  const mobileStartRadian = (mobileStartAngle * Math.PI) / 180;
                  const mobileEndRadian = (mobileEndAngle * Math.PI) / 180;
                  const mobileSvgSize = windowWidth >= 480 ? 600 : 500;
                  const center = mobileSvgSize / 2;
                  const startX = Math.cos(mobileStartRadian) * mobileTimelineRadius + center;
                  const startY = Math.abs(Math.sin(mobileStartRadian)) * mobileTimelineRadius + center;
                  const endX = Math.cos(mobileEndRadian) * mobileTimelineRadius + center;
                  const endY = Math.abs(Math.sin(mobileEndRadian)) * mobileTimelineRadius + center;
                  const arcRadius = mobileTimelineRadius;
                  return `M ${startX},${startY} A ${arcRadius},${arcRadius} 0 0,0 ${endX},${endY}`;
                })()}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1.5"
              />
            </svg>
            <div
              className="timeline-slider-wrapper"
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="timeline-slider"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {timelinePoints.map((point, index) => (
                  <div key={`mobile-${index}`} className="timeline-slide">
                    <div className="point-number">{point.number}</div>
                    <div className="mobile-timeline-icon-wrapper">
                     
                      <div
                        className="point-icon"
                        style={{ backgroundColor: point.color }}
                      >
                        <span className="point-icon-emoji">{point.icon}</span>
                      </div>
                    </div>
                    <div className="point-text">{point.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider-navigation">
              <div className="slider-dots">
                {timelinePoints.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`slider-dot ${currentSlide === index ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
                
              <div className="slider-arrows">
                <button
                  className="slider-arrow slider-arrow-left"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? timelinePoints.length - 1 : prev - 1,
                    )
                  }
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  className="slider-arrow slider-arrow-right"
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === timelinePoints.length - 1 ? 0 : prev + 1,
                    )
                  }
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SemiCircleArcSection;
