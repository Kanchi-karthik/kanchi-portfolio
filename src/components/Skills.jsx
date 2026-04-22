import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Globe, Database, Server } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code size={24} />,
      skills: ["Java", "Python", "JavaScript"]
    },
    {
      title: "Web Development",
      icon: <Globe size={24} />,
      skills: ["React.js", "Node.js", "Express.js", "HTML5", "CSS3", "Servlets", "Spring", "Spring Boot"]
    },
    {
      title: "Database Technologies",
      icon: <Database size={24} />,
      skills: ["MySQL", "MongoDB", "JDBC", "SQL"]
    },
    {
      title: "Tools & Technologies",
      icon: <Server size={24} />,
      skills: ["Git", "GitHub", "Linux", "VS Code", "IntelliJ IDEA"]
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
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Here's a breakdown of my technical expertise and the tools I use to build robust applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card text-center group hover:shadow-2xl transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6 text-primary-600 dark:text-primary-400 group-hover:rotate-12 transition-transform duration-300">
              {category.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{category.title}</h3>
            <div className="flex flex-wrap justify-center">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="tech-badge shine-effect">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Professional Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-primary-50 to-white dark:from-dark-700 dark:to-dark-800 rounded-lg border border-primary-100 dark:border-dark-600 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg">Industry Ready</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Full-stack development skills with hands-on project experience</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-primary-50 to-white dark:from-dark-700 dark:to-dark-800 rounded-lg border border-primary-100 dark:border-dark-600 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg">Problem Solver</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Strong foundation in data structures and algorithmic thinking</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-primary-50 to-white dark:from-dark-700 dark:to-dark-800 rounded-lg border border-primary-100 dark:border-dark-600 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
              <h4 className="font-bold text-lg">Team Player</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Collaborative experience through internships and training programs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;