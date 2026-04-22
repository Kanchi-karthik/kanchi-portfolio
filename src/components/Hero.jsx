import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, User } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Computer Science Engineer";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                KANCHI KARTHIK
              </span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-bold mb-6 h-16">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Motivated software developer with strong foundations in Java and MERN stack development. 
              Currently pursuing M.Tech in Computer Science & Engineering while strengthening skills in 
              problem solving and Data Structures & Algorithms.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="#contact" 
                className="btn-primary"
              >
                Get In Touch
              </a>
              <a 
                href="/Kanchi_Karthik.pdf" 
                download="Kanchi_Karthik_Resume.pdf"
                className="btn-secondary flex items-center"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <Mail size={20} className="mr-2 text-primary-600" />
                <span>kanchikarthik27798@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 text-primary-600" />
                <span>+91-8885828678</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2 text-primary-600" />
                <span>Nellore, Andhra Pradesh</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/images/Karthik.jpg" 
                  alt="Kanchi Karthik" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentNode && e.target.parentNode.querySelector('.fallback-avatar')) {
                      e.target.parentNode.querySelector('.fallback-avatar').style.display = 'flex';
                    }
                  }}
                />
                <div className="fallback-avatar hidden w-full h-full bg-gradient-to-br from-primary-400 to-purple-500 items-center justify-center absolute top-0 left-0 rounded-full">
                  <User size={80} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white px-6 py-2 rounded-full shadow-md border border-gray-200">
                <span className="font-bold text-primary-600">7.2 CGPA (M.Tech)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;