import React, { useState, useEffect, useRef } from "react";
import "./HealthyBabies.css";

const HealthyBabies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const currentSlideRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const isInViewRef = useRef(false);
  const lastWheelDeltaRef = useRef(0);

  const healthyBabiesItems = [
    {
      id: 1,
      image: "/Images/Frame 1410138906 (1).png",
    },
    {
      id: 2,
      image: "/Images/Frame 1410138908 (1).png",
    },
    {
      id: 3,
      image: "/Images/Frame 1410138907 (1).png",
    },
    {
      id: 4,
      image: "/Images/Frame 1410138905 (1).png",
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev >= healthyBabiesItems.length - 1 ? 0 : prev + 1;
      currentSlideRef.current = newSlide;
      return newSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev <= 0 ? healthyBabiesItems.length - 1 : prev - 1;
      currentSlideRef.current = newSlide;
      return newSlide;
    });
  };

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInViewRef.current;
          isInViewRef.current = entry.isIntersecting;

          if (entry.isIntersecting && !wasInView && !hasEnteredRef.current) {
            hasEnteredRef.current = true;
            
            let scrollDirection = 'down'; // default
            if (Math.abs(lastWheelDeltaRef.current) > 0) {
              scrollDirection = lastWheelDeltaRef.current > 0 ? 'down' : 'up';
            } else {
              const currentScrollY = window.scrollY;
              scrollDirection = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
            }
            
            isTransitioningRef.current = true;

            if (scrollDirection === 'down') {
              setCurrentSlide((prev) => {
                const newSlide = prev >= healthyBabiesItems.length - 1 ? 0 : prev + 1;
                currentSlideRef.current = newSlide;
                return newSlide;
              });
            } else {
              setCurrentSlide((prev) => {
                const newSlide = prev <= 0 ? healthyBabiesItems.length - 1 : prev - 1;
                currentSlideRef.current = newSlide;
                return newSlide;
              });
            }

            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 500);
          }

          if (!entry.isIntersecting && wasInView) {
            hasEnteredRef.current = false;
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [healthyBabiesItems.length]);


  useEffect(() => {
    const handleScroll = () => {
      lastScrollYRef.current = window.scrollY;
    };

    const handleWheelTrack = (e) => {
      lastWheelDeltaRef.current = e.deltaY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheelTrack, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheelTrack);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      if (!isInViewRef.current) {
        return;
      }

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;
      const isAtLastSlide = currentSlideRef.current >= healthyBabiesItems.length - 1;
      const isAtFirstSlide = currentSlideRef.current <= 0;

      if ((isAtLastSlide && isScrollingDown) || (isAtFirstSlide && isScrollingUp)) {
        return;
      }

      e.preventDefault();
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrollingDown) {
          setCurrentSlide((prev) => {
            if (prev >= healthyBabiesItems.length - 1) {
              currentSlideRef.current = 0;
              return 0;
            }
            const newSlide = prev + 1;
            currentSlideRef.current = newSlide;
            return newSlide;
          });
        } else if (isScrollingUp) {
          setCurrentSlide((prev) => {
            if (prev <= 0) {
              const newSlide = healthyBabiesItems.length - 1;
              currentSlideRef.current = newSlide;
              return newSlide;
            }
            const newSlide = prev - 1;
            currentSlideRef.current = newSlide;
            return newSlide;
          });
        }
      }, 150);
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [healthyBabiesItems.length]);

  return (
    <section className="healthy-babies-section" ref={sectionRef}>
      <img src="/Images/Frame 1410138918.png" className="healthy-babies-title" alt="Happy and Healthy Babies" />
      
      <div className="healthy-babies-container">
        <div className="healthy-babies-wrapper">
          <div
            className="healthy-babies-track"
            style={{
              transform: `translateX(calc(-${currentSlide} * (80% + 16px)))`,
            }}
          >
            {healthyBabiesItems.map((item) => (
              <div key={item.id} className="healthy-babies-card">
                <div className="healthy-babies-image">
                  <img src={item.image} alt="Happy and Healthy Baby" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="slider-navigation">
        <div className="slider-dots">
          {healthyBabiesItems.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HealthyBabies;

