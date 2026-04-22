import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    const defaultProjects = [
      {
        id: 1,
        title: "Runtime Detection of LOTL Attacks in Kubernetes",
        description: "Designed a runtime monitoring framework to detect Living-Off-The-Land (LOTL) attacks in containerized environments. Analyzed Linux system call traces and process behavior using Python to identify anomalous command executions.",
        technologies: ["Python", "Kubernetes", "Linux Bash", "Docker"],
        liveUrl: "#",
        githubUrl: "https://github.com/Kanchi-karthik/LOTL",
        featured: true
      },
      {
        id: 2,
        title: "Citizen Department Portal",
        description: "Developed RESTful APIs for public complaint registration, status tracking, and department assignment. Integrated backend services with MySQL database for persistent record management. Developed resource allocation workflows and status tracking modules.",
        technologies: ["Node.js", "Express.js", "MySQL", "REST APIs"],
        liveUrl: "#",
        githubUrl: "https://github.com/Kanchi-karthik/Citizen_Dept",
        featured: true
      },
      {
        id: 3,
        title: "Innovatix",
        description: "An innovative project showcasing cutting-edge technologies and creative problem-solving approaches. Demonstrates practical implementation of modern development practices and architectural patterns.",
        technologies: ["JavaScript", "React.js", "Node.js", "MongoDB"],
        liveUrl: "#",
        githubUrl: "https://github.com/Kanchi-karthik/Innovatix",
        featured: true
      },
      {
        id: 4,
        title: "CareCart – Healthcare Management System",
        description: "Designed normalized relational schema and ER diagrams for doctor-patient appointment workflows. Built MySQL database with referential integrity constraints, PL/SQL triggers, and stored procedures. Integrated backend using JDBC to handle concurrent transactional operations reliably.",
        technologies: ["MySQL", "PL/SQL", "JDBC", "Java"],
        liveUrl: "#",
        githubUrl: "https://github.com/Kanchi-karthik/CareCart",
        featured: true
      },
      {
        id: 5,
        title: "Secure ESP32-IoT Communication",
        description: "Developed a secure IoT communication system using ESP32 microcontroller with encryption protocols. Implemented robust security mechanisms for connected devices with focus on data integrity and secure transmission.",
        technologies: ["ESP32", "IoT", "Embedded C", "Security Protocols"],
        liveUrl: "#",
        githubUrl: "https://github.com/Kanchi-karthik/Secure_ESP32-IoT_Communication",
        featured: true
      }
    ];

    // Check if we have user-edited projects data in localStorage
    const savedProjects = localStorage.getItem('projectsData');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing saved projects data:', e);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
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
        className="text-center mb-16"
      >
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Showcasing my expertise through practical applications and innovative solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`card hover:shadow-xl transition-all duration-300 ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                {project.featured && (
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star size={16} className="mr-1" />
                    Featured
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;