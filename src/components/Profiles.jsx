import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Profiles = () => {
  const [repoCount, setRepoCount] = useState('Loading...');

  useEffect(() => {
    // Fetch real GitHub repository count
    const fetchGitHubData = async () => {
      try {
        // In a real implementation, you would fetch this from GitHub API
        // For now, we'll simulate with a realistic count
        // You can replace this with actual API call:
        // const response = await fetch('https://api.github.com/users/Kanchi-karthik/repos');
        // const repos = await response.json();
        // setRepoCount(`${repos.length} Repositories`);
        
        // Simulating a more realistic count
        setRepoCount('10+ Repositories');
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setRepoCount('GitHub API Error');
      }
    };

    fetchGitHubData();
  }, []);

  const profiles = [
    {
      name: "GitHub",
      icon: <Github size={32} />,
      username: "@Kanchi-karthik",
      description: "Showcasing projects, contributions, and coding journey",
      link: "https://github.com/Kanchi-karthik",
      stats: repoCount
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={32} />,
      username: "kanchikarthik",
      description: "Professional networking and career development",
      link: "https://www.linkedin.com/in/kanchikarthik",
      stats: "Growing Network"
    }
  ];

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
        className="text-center mb-16"
      >
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Connect with me on these platforms to see my ongoing work and professional journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {profiles.map((profile, index) => (
          <motion.a
            key={index}
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card block group hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-100 rounded-lg mr-4 group-hover:text-primary-600 transition-colors">
                  {profile.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-gray-600">{profile.username}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 flex-grow">
                {profile.description}
              </p>
              
              <div className="pt-4 border-t border-gray-200">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {profile.stats}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Profiles;