import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Download, FileText, Award, Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
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
          Download my complete resume to learn more about my professional background and qualifications.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }
        }
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card text-center p-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 text-primary-600 rounded-full">
              <FileText size={32} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Download My Resume</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a comprehensive overview of my education, experience, skills, and achievements in a professionally formatted PDF document.
          </p>
          
          <a 
            href="/Kanchi_Karthik.pdf" 
            download="Kanchi_Karthik_Resume.pdf"
            className="btn-primary inline-flex items-center px-8 py-4 text-lg"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </a>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <GraduationCap className="text-primary-600 mx-auto mb-4" size={28} />
              <h4 className="font-bold mb-2">Education</h4>
              <p className="text-gray-600 text-sm">
                M.Tech in Computer Science & Engineering with excellent academic performance
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Briefcase className="text-primary-600 mx-auto mb-4" size={28} />
              <h4 className="font-bold mb-2">Experience</h4>
              <p className="text-gray-600 text-sm">
                Hands-on experience through internships and training programs
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Award className="text-primary-600 mx-auto mb-4" size={28} />
              <h4 className="font-bold mb-2">Achievements</h4>
              <p className="text-gray-600 text-sm">
                Gold medalist with multiple recognitions for technical skills
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;