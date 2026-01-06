import React, { useEffect, useRef, useState } from "react";
import "./AchievementsAwards.css";

const logos = [
  "/Images/Container (8).png",
  "/Images/Container (9).png",
  "/Images/Group 1000005999.png",
  "/Images/Group 1000006001.png",
  "/Images/award 1.png",
  "/Images/award 2.png",
];

const AchievementsAwards = () => {
  const radius = 350;
  const center = 250;
  const total = logos.length;
  const [scrollRotation, setScrollRotation] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const sectionRef = useRef(null);

  const topRowLogos = logos.slice(0, 3);
  const bottomRowLogos = logos.slice(3, 6);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2;

      // Check if section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress based on section position relative to viewport center
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // When section top is at window center, rotation starts (progress = 0)
        // When section bottom is at window center, rotation completes (progress = 1)
        const startScroll = windowCenter;
        const endScroll = windowCenter - sectionHeight;
        const currentScroll = sectionTop;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (startScroll - currentScroll) / (startScroll - endScroll)
          )
        );

        // Rotate 90 degrees clockwise (left to right) based on scroll progress
        // Once rotation completes (90 degrees), keep it at 90 and stop
        const rotation = Math.min(scrollProgress * 45, 45);
        
        if (rotation >= 45 && !hasRotated) {
          setHasRotated(true);
        }
        
        // Only update rotation if we haven't completed rotation
        if (!hasRotated) {
          setScrollRotation(rotation);
        } else {
          // Keep at 90 once rotation is complete
          setScrollRotation(45);
        }
      } else if (rect.bottom < 0) {
        // Reset only when scrolling back up significantly (section is above viewport)
        setScrollRotation(0);
        setHasRotated(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="circle-section">
      <div className="circle-wrapper desktop-layout">
        {logos.map((src, i) => {
          const baseAngle = (360 / total) * i;
          const currentAngle = baseAngle + scrollRotation;
          return (
            <div
              key={i}
              className="circle-item"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${currentAngle}deg)
                  translate(${radius}px)
                  rotate(${-currentAngle}deg)
                `,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <img src={src} alt="award-logo" />
            </div>
          );
        })}
        <div className="circle-center-content">
          <img src="/Images/Frame 1410138929.png" alt="award-logo" />
        </div>
      </div>

      <div className="mobile-layout">
        <div className="mobile-row mobile-row-top">
          {topRowLogos.map((src, i) => {
            const angle = -60 + i * 60;
            const radius = 100;
            return (
              <div
                key={i}
                className="mobile-award-item"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    rotate(${angle}deg)
                    translateY(-${radius}px)
                    rotate(${-angle}deg)
                  `,
                }}
              >
                <img src={src} alt="award-logo" />
              </div>
            );
          })}
        </div>

        <div className="mobile-center">
          <img src="/Images/Frame 1410138929.png" alt="award-logo" />
        </div>

        <div className="mobile-row mobile-row-bottom">
          {bottomRowLogos.map((src, i) => {
            const angle = -60 + i * 60;
            const radius = 100;
            return (
              <div
                key={i + 3}
                className="mobile-award-item"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    rotate(${angle}deg)
                    translateY(${radius}px)
                    rotate(${-angle}deg)
                  `,
                }}
              >
                <img src={src} alt="award-logo" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsAwards;
