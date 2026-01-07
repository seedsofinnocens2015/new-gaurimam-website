import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      <motion.div
        className="absolute top-0 left-0 w-full hidden lg:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: [-100, -100, 0],
          opacity: [0, 1, 1]
        }}
        transition={{ 
          duration: 1.8,
          ease: "easeOut",
          times: [0, 0.55, 1]
        }}
      >
        <img
          src="/Images/Webpage.png"
          alt="Dr. Gauri Agarwal with baby"
          className="w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full block lg:hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: [-100, -100, 0],
          opacity: [0, 1, 1]
        }}
        transition={{ 
          duration: 1.8,
          ease: "easeOut",
          times: [0, 0.55, 1]
        }}
      >
        <img
          src="/Images/mobilebackground.png"
          alt="Dr. Gauri Agarwal with baby - Mobile"
          className="w-full object-cover"
        />
      </motion.div>

      <Navbar />

      {/* Desktop Backlight - Separate */}
      <motion.div
        className="absolute z-9 hidden lg:block"
        style={{ top: '159px', left: '41px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1.8
        }}
      >
        <div
          className="rounded-[40px]"
          style={{
            width: '1451px',
            height: '845px',
            borderRadius: '40px',
            boxShadow: '0 0 60px 30px rgba(253, 253, 253, 0), 0 0 100px 50px rgba(0, 0, 0, 0.63), 0 0 140px 70px rgba(0, 0, 0, 0.3), 0 0 180px 90px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none'
          }}
        ></div>
      </motion.div>

      {/* Desktop Frame - Separate */}
      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ top: '159px', left: '41px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 2.6
        }}
      >
        <img
          src="/Images/uni.png"
          alt="Dr. Gauri Agarwal Frame"
          className="rounded-[40px]"
          style={{
            width: '1451px',
            height: '845px',
            borderRadius: '40px',
            // filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0))'
          }}
        />
      </motion.div>

      {/* Mobile Backlight - Separate */}
      <motion.div
        className="absolute z-9 block lg:hidden"
        style={{ top: '170px', right: '8%', left: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1.8
        }}
      >
        <div
          className="rounded-[20px]"
          style={{
            width: '85vw',
            maxWidth: '380px',
            height: 'auto',
            aspectRatio: '451/845',
            borderRadius: '20px',
            boxShadow: '0 0 60px 30px rgba(253, 253, 253, 0), 0 0 100px 50px rgba(0, 0, 0, 0.63), 0 0 140px 70px rgba(0, 0, 0, 0.3), 0 0 180px 90px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none'
          }}
        ></div>
      </motion.div>

      {/* Mobile Frame - Separate */}
      <motion.div
        className="absolute z-10 block lg:hidden"
        style={{ top: '160px', right: '8%', left: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 2.6
        }}
      >
        <img
          src="/Images/uni (1).png"
          alt="Dr. Gauri Agarwal Frame - Mobile"
          className="rounded-[20px]"
          style={{
            width: '85vw',
            maxWidth: '380px',
            height: 'auto',
            borderRadius: '20px',
            display: 'block',
            // filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))'
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;

