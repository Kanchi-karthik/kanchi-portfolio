import React, { useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Send, Mail, Phone, MapPin, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  // Store contact messages in localStorage
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('contactMessages');
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Save to localStorage
      const newMessage = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      
      // In a real application, you would send this to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Simulate sending email notification
      console.log('Email notification sent to kanchikarthik27798@gmail.com');
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Refs for scroll animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="text-gray-600 mb-8">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-lg mr-4">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email</h4>
                <a href="mailto:kanchikarthik27798@gmail.com" className="text-gray-600 hover:text-primary-600 transition-colors">
                  kanchikarthik27798@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-lg mr-4">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Phone</h4>
                <a href="tel:+918885828678" className="text-gray-600 hover:text-primary-600 transition-colors">
                  +91 88858 28678
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-primary-100 text-primary-600 rounded-lg mr-4">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Location</h4>
                <p className="text-gray-600">
                  Nellore, Andhra Pradesh<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare size={20} className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary flex items-center justify-center py-3 px-4 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
                  Oops! Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;