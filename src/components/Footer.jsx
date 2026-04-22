import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Kanchi-karthik',
      icon: <Github size={20} />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kanchikarthik',
      icon: <Linkedin size={20} />
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">KANCHI KARTHIK</div>
            <p className="text-gray-400 mb-6">
              Computer Science Engineer passionate about creating innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">kanchikarthik27798@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+91 88858 28678</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Nellore, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Kanchi Karthik. All rights reserved. Made with{' '}
            <Heart className="inline text-red-500" size={16} /> using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;