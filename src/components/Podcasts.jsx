import React, { useState, useEffect, useRef } from "react";
import "./Podcasts.css";

const Podcasts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const currentSlideRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const isInViewRef = useRef(false);
  const lastWheelDeltaRef = useRef(0);

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


  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);


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





            let scrollDirection = "down"; 
            if (Math.abs(lastWheelDeltaRef.current) > 0) {
              scrollDirection = lastWheelDeltaRef.current > 0 ? "down" : "up";
            } else {

              const currentScrollY = window.scrollY;
              scrollDirection =
                currentScrollY > lastScrollYRef.current ? "down" : "up";
            }


            isTransitioningRef.current = true;


            if (scrollDirection === "down") {

              setCurrentSlide((prev) => {
                const newSlide = prev >= podcastItems.length - 1 ? 0 : prev + 1;
                currentSlideRef.current = newSlide;
                return newSlide;
              });
            } else {

              setCurrentSlide((prev) => {
                const newSlide = prev <= 0 ? podcastItems.length - 1 : prev - 1;
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
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [podcastItems.length]);


  useEffect(() => {
    const handleScroll = () => {
      lastScrollYRef.current = window.scrollY;
    };

    const handleWheelTrack = (e) => {
      lastWheelDeltaRef.current = e.deltaY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheelTrack, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheelTrack);
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
      const isAtLastSlide = currentSlideRef.current >= podcastItems.length - 1;
      const isAtFirstSlide = currentSlideRef.current <= 0;




      if (
        (isAtLastSlide && isScrollingDown) ||
        (isAtFirstSlide && isScrollingUp)
      ) {

        return;
      }


      e.preventDefault();


      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }


      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrollingDown) {

          setCurrentSlide((prev) => {
            if (prev >= podcastItems.length - 1) {
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
              const newSlide = podcastItems.length - 1;
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

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [podcastItems.length]); 


  const prevSlideIndex =
    currentSlide === 0 ? podcastItems.length - 1 : currentSlide - 1;
  const nextSlideIndex =
    currentSlide === podcastItems.length - 1 ? 0 : currentSlide + 1;

  return (
    <section className="podcasts-section" ref={sectionRef}>
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
