import React, { useState, useEffect, useRef } from "react";
import "./HealthyBabies.css";

const HealthyBabies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFirstImageFullscreen, setIsFirstImageFullscreen] = useState(false);
  const sectionRef = useRef(null);
  const firstImageRef = useRef(null);
  const wheelTimeoutRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isInViewRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const scrollDirectionRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

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
      return newSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = prev <= 0 ? healthyBabiesItems.length - 1 : prev - 1;
      return newSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll handler for fullscreen first image effect
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const firstImage = firstImageRef.current;
      
      // Only apply fullscreen to first image when on first slide
      if (!section || !firstImage || currentSlide !== 0) {
        setIsFirstImageFullscreen(false);
        return;
      }

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is entering viewport
      // Fullscreen when section top reaches viewport top
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Fullscreen when section enters viewport (top is at or above 20% of viewport)
      // Keep fullscreen while section is in upper portion of viewport
      // Return to normal when scrolled further down
      if (sectionTop <= windowHeight * 0.2 && sectionTop >= -windowHeight * 0.2 && sectionBottom > windowHeight * 0.4) {
        setIsFirstImageFullscreen(true);
      } else {
        // Return to normal when scrolled past
        setIsFirstImageFullscreen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentSlide]);

  // Wheel event handler for carousel scrolling (desktop only)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      // Skip wheel events on mobile devices
      const isMobile = window.innerWidth <= 768;
      if (isMobile) return;

      // Only handle wheel events when section is in view
      if (!isInViewRef.current) {
        return;
      }

      // Prevent default scroll when transitioning
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const threshold = 50; // Minimum scroll delta to trigger slide change

      // Determine scroll direction
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      // Track scroll direction and accumulate delta only if direction matches
      if (scrollDirectionRef.current === null) {
        scrollDirectionRef.current = isScrollingDown ? 'down' : 'up';
      }

      // Only accumulate if scrolling in the same direction
      if (
        (isScrollingDown && scrollDirectionRef.current === 'down') ||
        (isScrollingUp && scrollDirectionRef.current === 'up')
      ) {
        accumulatedDeltaRef.current += Math.abs(deltaY);
      } else {
        // Reset if direction changes
        accumulatedDeltaRef.current = Math.abs(deltaY);
        scrollDirectionRef.current = isScrollingDown ? 'down' : 'up';
      }

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Only trigger slide change if accumulated delta exceeds threshold
      if (accumulatedDeltaRef.current >= threshold) {
        e.preventDefault();
        
        // Set transitioning state
        isTransitioningRef.current = true;

        if (isScrollingDown) {
          setCurrentSlide((prev) => {
            const newSlide = prev >= healthyBabiesItems.length - 1 ? 0 : prev + 1;
            return newSlide;
          });
        } else if (isScrollingUp) {
          setCurrentSlide((prev) => {
            const newSlide = prev <= 0 ? healthyBabiesItems.length - 1 : prev - 1;
            return newSlide;
          });
        }

        // Reset accumulated delta and direction
        accumulatedDeltaRef.current = 0;
        scrollDirectionRef.current = null;

        // Allow transition to complete before allowing next scroll
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 600); // Match CSS transition duration (500ms) + buffer
      } else {
        // Reset accumulated delta after a short delay if no action taken
        wheelTimeoutRef.current = setTimeout(() => {
          accumulatedDeltaRef.current = 0;
          scrollDirectionRef.current = null;
        }, 150);
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [healthyBabiesItems.length]);

  // Touch event handlers for mobile swipe
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!touchStartXRef.current || !touchStartYRef.current) {
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartXRef.current - touchEndX;
      const diffY = touchStartYRef.current - touchEndY;

      // Only handle horizontal swipes (ignore vertical scrolling)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (isTransitioningRef.current) {
          touchStartXRef.current = null;
          touchStartYRef.current = null;
          return;
        }

        isTransitioningRef.current = true;

        if (diffX > 0) {
          // Swipe left - next slide
          setCurrentSlide((prev) => {
            return prev >= healthyBabiesItems.length - 1 ? 0 : prev + 1;
          });
        } else {
          // Swipe right - previous slide
          setCurrentSlide((prev) => {
            return prev <= 0 ? healthyBabiesItems.length - 1 : prev - 1;
          });
        }

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 600);
      }

      touchStartXRef.current = null;
      touchStartYRef.current = null;
    };

    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchend", handleTouchEnd);
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
            {healthyBabiesItems.map((item, index) => (
              <div key={item.id} className="healthy-babies-card">
                <div 
                  className={`healthy-babies-image ${index === 0 && isFirstImageFullscreen ? 'fullscreen' : ''}`}
                  ref={index === 0 ? firstImageRef : null}
                >
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

