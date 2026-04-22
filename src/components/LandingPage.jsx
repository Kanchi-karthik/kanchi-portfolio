import React, { useState } from 'react';
import { ChevronRight, Code, Briefcase, Award, Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full Stack Development",
      description: "Expertise in Java and MERN stack development"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Professional Experience",
      description: "Hands-on experience through internships and training programs"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Recognized Skills",
      description: "Gold medalist with proven technical abilities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            KANCHI KARTHIK
          </div>
          <div className="flex space-x-4">
            <a href="mailto:kanchikarthik27798@gmail.com" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
              <Mail className="w-5 h-5 text-gray-600" />
            </a>
            <a href="https://github.com/Kanchi-karthik" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
              <Github className="w-5 h-5 text-gray-600" />
            </a>
            <a href="https://www.linkedin.com/in/kanchikarthik" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
              <Linkedin className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Computer Science Engineer
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Motivated software developer with strong foundations in Java and MERN stack development. 
                Currently pursuing M.Tech in Computer Science & Engineering.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="text-primary-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <button
                onClick={() => navigate('/portfolio')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="btn-primary px-8 py-4 text-lg group"
              >
                <span className="flex items-center">
                  Explore My Portfolio
                  <ChevronRight 
                    className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                    size={20} 
                  />
                </span>
              </button>
            </motion.div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="mailto:kanchikarthik27798@gmail.com" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center">
                <Mail className="mr-1" size={16} />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Kanchi Karthik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;