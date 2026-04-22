import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { User, Target, Lightbulb } from 'lucide-react';

const About = () => {
  const [aboutData, setAboutData] = React.useState({
    introduction: "To secure an internship where I can apply my programming skills in C++, Java, and Python to build efficient software solutions while learning from industry experts. Currently pursuing M.Tech in Computer Science & Engineering at Amrita Vishwa Vidyapeetham, I am passionate about solving complex engineering problems through software.",
    mission: "To leverage my technical skills and creativity to develop innovative solutions that solve real-world problems and contribute to meaningful projects in the technology industry.",
    vision: "To become a proficient software engineer who creates impactful applications that enhance user experiences and drive technological advancement in society.",
    funFact: "I am a Gold Medalist in B.Tech for Academic Excellence and have a keen interest in runtime monitoring and AI-powered educational tools."
  });

  const [stats, setStats] = React.useState([
    { number: "7.2", label: "M.Tech CGPA" }
  ]);

  React.useEffect(() => {
    // Check if we have user-edited profile data in localStorage
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setAboutData({
          introduction: parsedProfile.about || aboutData.introduction,
          mission: aboutData.mission, // These could be extended in the future
          vision: aboutData.vision,
          funFact: aboutData.funFact
        });
      } catch (e) {
        console.error('Error parsing saved profile data:', e);
      }
    }
  }, []);

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
        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/Me.jpg" 
                alt="Kanchi Karthik" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, index) => (
                <div key={index} className="card text-center p-4">
                  <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <User className="text-primary-600 mr-3" size={24} />
                <h3 className="text-2xl font-bold">About Me</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.introduction}
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Target className="text-primary-600 mr-3" size={24} />
                <h3 className="text-xl font-bold">Mission</h3>
              </div>
              <p className="text-gray-600">
                {aboutData.mission}
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="text-primary-600 mr-3" size={24} />
                <h3 className="text-xl font-bold">Vision</h3>
              </div>
              <p className="text-gray-600">
                {aboutData.vision}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold mb-3">Fun Fact</h3>
              <p className="text-gray-600">
                {aboutData.funFact}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;