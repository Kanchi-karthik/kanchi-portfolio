import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Code, Palette, Smartphone, Globe, Database, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <Code size={32} />,
      title: "Java Development",
      description: "Building robust backend applications using Java technologies including Servlets and JDBC."
    },
    {
      id: 2,
      icon: <Globe size={32} />,
      title: "MERN Stack Development",
      description: "Creating full-stack web applications using MongoDB, Express.js, React.js, and Node.js."
    },
    {
      id: 3,
      icon: <Database size={32} />,
      title: "Database Design",
      description: "Designing efficient database schemas using SQL and NoSQL solutions like MySQL and MongoDB."
    },
    {
      id: 4,
      icon: <Zap size={32} />,
      title: "Performance Optimization",
      description: "Analyzing and improving application performance through code optimization and efficient algorithms."
    },
    {
      id: 5,
      icon: <Palette size={32} />,
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces with a focus on usability and modern design principles."
    },
    {
      id: 6,
      icon: <Smartphone size={32} />,
      title: "Responsive Web Design",
      description: "Building websites that work seamlessly across all devices and screen sizes."
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
          Comprehensive tech solutions tailored to meet your business requirements and exceed expectations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 text-primary-600 rounded-full">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;