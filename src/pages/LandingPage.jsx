import React from 'react';
import Hero from '../components/Hero';
import SemiCircleArcSection from '../components/SemiCircleArcSection';
import Footer from '../components/Footer';
import HerInitiatives from '../components/HerInitiatives';
import AchievementsAwards from '../components/AchievementsAwards';
import NewsSlider from '../components/NewsSlider';
import HealthyLife from '../components/HealthyLife';
import DuringCovid from '../components/DuringCovid';
import SuccessStories from '../components/SuccessStories';
import HealthyBabies from '../components/HealthyBabies';
import Podcasts from '../components/Podcasts';
import Stories from '../components/Stories';
import CTA from '../components/CTA';

const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />


      <SemiCircleArcSection />

      <CTA />


      <Stories />

      <HerInitiatives />

      <Podcasts />

      <HealthyBabies />



      <SuccessStories />

      <DuringCovid />

      <HealthyLife />



      <NewsSlider />



      <AchievementsAwards />



      

      <Footer />
    </div>
  );
};

export default LandingPage;
