import React, { useState, useEffect, useRef } from "react";
import "./Podcasts.css";

const Podcasts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wheelTimeoutRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isInViewRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const scrollDirectionRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const podcastItems = [
    {
      id: 1,
      image: "/Images/1.png",
      title: "Success Rates of IVF",
      source: "Only My Health",
    },
    {
      id: 2,
      image: "/Images/Frame 1410138906 (1).png",
      title: "Podcast Title 2",
      source: "Source 2",
    },
    {
      id: 3,
      image: "/Images/Frame 1410138908 (1).png",
      title: "Podcast Title 3",
      source: "Source 3",
    },
    {
      id: 4,
      image: "/Images/Frame 1410138908.png",
      title: "Podcast Title 4",
      source: "Source 4",
    },
  ];

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
            const newSlide = prev >= podcastItems.length - 1 ? 0 : prev + 1;
            return newSlide;
          });
        } else if (isScrollingUp) {
          setCurrentSlide((prev) => {
            const newSlide = prev <= 0 ? podcastItems.length - 1 : prev - 1;
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
  }, [podcastItems.length]);

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
            return prev >= podcastItems.length - 1 ? 0 : prev + 1;
          });
        } else {
          // Swipe right - previous slide
          setCurrentSlide((prev) => {
            return prev <= 0 ? podcastItems.length - 1 : prev - 1;
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
  }, [podcastItems.length]); 


  const prevSlideIndex =
    currentSlide === 0 ? podcastItems.length - 1 : currentSlide - 1;
  const nextSlideIndex =
    currentSlide === podcastItems.length - 1 ? 0 : currentSlide + 1;

  return (
    <section id="podcasts" className="podcasts-section" ref={sectionRef}>
      <div className="podcasts-header">
        <img
          src="/Images/Frame 1410138883.png"
          className="featured-podcasts-banner-image"
          alt="Featured Podcasts"
        />
      </div>

      <div className="podcasts-container" ref={containerRef}>
        <div className="laptop-frame-wrapper">
          <div className="preview-slide preview-slide-left">
            <img
              src={podcastItems[prevSlideIndex].image}
              alt={podcastItems[prevSlideIndex].title}
              className="preview-image"
            />
          </div>

          <img
            src="/Images/laptop.png"
            alt="Laptop Frame"
            className="laptop-frame"
          />
          <div className="laptop-screen">
            <div
              className="podcast-slider-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {podcastItems.map((item) => (
                <div key={item.id} className="podcast-slide">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="podcast-image"
                  />
                </div>
              ))}
            </div>
          </div>
              
          <div className="preview-slide preview-slide-right">
            <img
              src={podcastItems[nextSlideIndex].image}
              alt={podcastItems[nextSlideIndex].title}
              className="preview-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Podcasts;

