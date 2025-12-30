import React from "react";
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

  const topRowLogos = logos.slice(0, 3);
  const bottomRowLogos = logos.slice(3, 6);

  return (
    <section className="circle-section">
      <div className="circle-wrapper desktop-layout">
        {logos.map((src, i) => {
          const angle = (360 / total) * i;
          return (
            <div
              key={i}
              className="circle-item"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(${-angle}deg)
                `,
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
