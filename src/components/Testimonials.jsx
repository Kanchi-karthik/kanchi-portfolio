import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Ramesh Babu",
      role: "Professor, Computer Science",
      company: "Amrita Vishwa Vidyapeetham",
      content: "Kanchi has shown exceptional dedication to his studies and consistently demonstrates strong problem-solving abilities. His work on the Citizen Department Portal project was particularly impressive.",
      avatar: "/images/testimonial1.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Suresh Kumar",
      role: "Internship Coordinator",
      company: "APSSDC",
      content: "During his internship, Karthik exhibited remarkable technical skills and a strong work ethic. He was able to quickly adapt to new technologies and contributed significantly to our team projects.",
      avatar: "/images/testimonial2.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Project Manager",
      company: "The Spark Foundation",
      content: "Working with Karthik on the web development project was a pleasure. His attention to detail and ability to meet deadlines made him a valuable team member.",
      avatar: "/images/testimonial3.jpg",
      rating: 5
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
    <div className="py-12 bg-gray-50 dark:bg-dark-800">
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
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What colleagues and mentors say about my work and professional qualities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              
              <div className="relative mb-6">
                <Quote className="text-primary-500 opacity-20 absolute -top-2 -left-2" size={40} />
                <p className="text-gray-600 dark:text-gray-300 pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;