import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { GraduationCap, Building2, Calendar, MapPin, BadgeCheck } from 'lucide-react';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "M.Tech in Computer Science & Engineering",
      institution: "Amrita Vishwa Vidyapeetham",
      location: "Coimbatore, Tamil Nadu",
      period: "2025 – Present",
      gpa: "7.2 CGPA",
      description: "Relevant Coursework: Data Structures, Operating Systems, DBMS, Computer Networks, Object-Oriented Programming."
    },
    {
      id: 2,
      degree: "B.Tech in Mechanical Engineering",
      institution: "Audisankara College of Engineering & Technology",
      location: "Gudur, Andhra Pradesh",
      period: "2019 – 2023",
      gpa: "8.65 CGPA",
      description: "Awarded Gold Medal for Academic Excellence. Developed strong analytical and problem-solving foundations."
    },
    {
      id: 3,
      degree: "Intermediate (M.P.C)",
      institution: "Viswasai Junior College",
      location: "Nellore, Andhra Pradesh",
      period: "2017 – 2019",
      gpa: "8.69 CGPA",
      description: "Focused on Mathematics, Physics, and Chemistry."
    },
    {
      id: 4,
      degree: "SSC (10th)",
      institution: "Vowel Techlan School",
      location: "Nellore, Andhra Pradesh",
      period: "2016 – 2017",
      gpa: "9.20 CGPA",
      description: "Excelled in foundational sciences and mathematics."
    }
  ];

  const experience = [
    {
      id: 1,
      role: "Java Programming Intern",
      company: "VSP Technologies",
      location: "Hyderabad, Telangana",
      period: "Apr 2024 – Oct 2024",
      description: [
        "Developed and integrated REST APIs for internal application workflows using Spring Boot.",
        "Debugged production issues, optimized backend logic, and improved system stability.",
        "Collaborated using Git for version control and participated in agile sprint cycles."
      ]
    }
  ];

  const certifications = [
    {
      title: "Data Structures & Algorithms in Java",
      issuer: "Udemy",
      year: "2025"
    },
    {
      title: "Java Full Stack Development",
      issuer: "Kelly Technologies",
      year: "2024"
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
          My academic journey, professional experience, and certifications that shaped my skills and expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-8">
            <GraduationCap className="text-primary-600 mr-3" size={28} />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="card relative pl-8 pb-8 border-l-2 border-primary-200 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500"></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                  <div className="flex flex-wrap items-center text-gray-600 mb-3">
                    <Building2 size={16} className="mr-2" />
                    <span className="mr-4">{edu.institution}</span>
                    <MapPin size={16} className="mr-2" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span className="mr-4">{edu.period}</span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {edu.gpa}
                    </span>
                  </div>
                  <p className="text-gray-600">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-8">
            <Building2 className="text-primary-600 mr-3" size={28} />
            <h3 className="text-2xl font-bold">Experience</h3>
          </div>
          
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="card relative pl-8 pb-8 border-l-2 border-purple-200 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-xl font-bold mb-2">{exp.role}</h4>
                  <div className="flex flex-wrap items-center text-gray-600 mb-3">
                    <Building2 size={16} className="mr-2" />
                    <span className="mr-4">{exp.company}</span>
                    <MapPin size={16} className="mr-2" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <div className="flex items-center mb-8">
          <BadgeCheck className="text-primary-600 mr-3" size={28} />
          <h3 className="text-2xl font-bold">Certifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="card p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-primary-50 rounded-lg mr-4">
                  <BadgeCheck size={24} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{cert.title}</h4>
                  <div className="text-gray-600">{cert.issuer}</div>
                </div>
              </div>
              <div className="text-primary-600 font-medium px-3 py-1 bg-primary-50 rounded-full text-sm">
                {cert.year}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Education;