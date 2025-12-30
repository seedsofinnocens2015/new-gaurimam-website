import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      <motion.div
        className="absolute top-0 left-0 w-full hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="/Images/Webpage.png"
          alt="Dr. Gauri Agarwal with baby"
          className="w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full block lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="/Images/mobilebackground.png"
          alt="Dr. Gauri Agarwal with baby - Mobile"
          className="w-full object-cover"
        />
      </motion.div>

      <Navbar />

      <motion.div
        className="absolute z-10 hidden lg:block"
        style={{ top: '159px', left: '41px' }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1
        }}
      >
        <div
          className="absolute rounded-[40px]"
          style={{
            width: '1451px',
            height: '845px',
            borderRadius: '40px',
            boxShadow: '0 0 60px 30px rgba(253, 253, 253, 0), 0 0 100px 50px rgba(0, 0, 0, 0.63), 0 0 140px 70px rgba(0, 0, 0, 0.3), 0 0 180px 90px rgba(0, 0, 0, 0.2)',
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        ></div>

        <img
          src="/Images/uni.png"
          alt="Dr. Gauri Agarwal Frame"
          className="rounded-[40px] relative"
          style={{
            width: '1451px',
            height: '845px',
            borderRadius: '40px',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))'
          }}
        />
      </motion.div>

      <motion.div
        className="absolute z-10 block lg:hidden"
        style={{ top: '160px', right: '8%', left: 'auto' }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1
        }}
      >
        <div className="relative" style={{ width: '85vw', maxWidth: '380px' }}>
          <div
            className="absolute rounded-[20px]"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              boxShadow: '0 0 30px 15px rgba(253, 253, 253, 0), 0 0 50px 25px rgba(0, 0, 0, 0.4), 0 0 70px 35px rgba(0, 0, 0, 0.3)',
              top: 0,
              left: 0,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          ></div>

          <img
            src="/Images/uni (1).png"
            alt="Dr. Gauri Agarwal Frame - Mobile"
            className="rounded-[20px] relative"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '20px',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
