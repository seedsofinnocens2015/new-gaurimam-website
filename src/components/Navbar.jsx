import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'TedX', id: 'tedx' },
    { name: 'Podcasts', id: 'podcasts' },
    { name: 'Success Stories', id: 'success-stories' },
    { name: 'Initiatives', id: 'initiatives' },
    { name: 'News', id: 'news' },
    { name: 'Gallery', id: 'gallery' }
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`w-full ${isSticky ? 'fixed top-0 left-0 z-50' : 'absolute top-0 left-0 z-20'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 2.6 }}
    >
      <nav className="w-full bg-white py-2 md:py-4 md:px-8 flex items-center justify-between relative lg:h-[94.061px]">
        <motion.div
          className="flex-shrink-0 lg:w-[159.6px] lg:h-[94.061px] lg:flex lg:items-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.8 }}
        >
          <img
            src="/Images/logo.png"
            alt="Dr. Gauri Agarwal Logo"
            className="h-14 md:h-20 w-28 md:w-40 lg:w-[159.6px] lg:h-[94.061px] lg:object-contain"
          />
        </motion.div>

        <div className="hidden lg:flex lg:w-[705px] lg:h-[41px] lg:items-center lg:justify-center">
          <ul className="flex items-center gap-3" style={{ gap: '12px' }}>
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 2.9 + (index * 0.1)
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium text-base rounded-[30px] py-1 px-3"
                  style={{
                    borderRadius: '30px',
                    paddingTop: '4px',
                    paddingRight: '12px',
                    paddingBottom: '4px',
                    paddingLeft: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="hidden lg:flex lg:w-[141px] lg:h-[41px] lg:items-center"
          style={{ gap: '9px' }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.8 }}
        >
          <motion.a
            href="#"
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/Images/insta.svg"
              alt="Instagram"
              className="w-10 h-10"
            />
          </motion.a>

          <motion.a
            href="#"
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/Images/x.svg"
              alt="X (Twitter)"
              className="w-10 h-10"
            />
          </motion.a>

          <motion.a
            href="#"
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/Images/facebook.svg"
              alt="Facebook"
              className="w-10 h-10"
            />
          </motion.a>
        </motion.div>

        <div className="lg:hidden flex items-center gap-2 relative">

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-lg z-50 lg:hidden border-t border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="block px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                  >
                    <img
                      src="/Images/insta.svg"
                      alt="Instagram"
                      className="w-10 h-10"
                    />
                  </a>
                  <a
                    href="#"
                  >
                    <img
                      src="/Images/x.svg"
                      alt="X (Twitter)"
                      className="w-10 h-10"
                    />
                  </a>
                  <a
                    href="#"
                  >
                    <img
                      src="/Images/facebook.svg"
                      alt="Facebook"
                      className="w-10 h-10"
                    />
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>
      <motion.div
        className="w-full h-px bg-gray-300 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 3.0, ease: "easeOut" }}
      ></motion.div>
    </motion.header>
  );
};

export default Navbar;

