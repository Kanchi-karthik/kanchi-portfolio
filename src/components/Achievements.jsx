import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Award, Trophy, BadgeCheck, Star } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      icon: <Trophy className="text-yellow-500" size={24} />,
      title: "Gold Medal for Academic Excellence",
      description: "Awarded top performer honors across all B.Tech branches (2019-2023).",
      date: "2023"
    },
    {
      id: 2,
      icon: <Star className="text-purple-500" size={24} />,
      title: "Hackathon Finalist - Techspardha (Excalibur)",
      description: "Recognized among the top teams for AI-powered tool development at NIT Kurukshetra.",
      date: "2025"
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
          Recognitions and accomplishments that highlight my dedication and excellence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 p-3 bg-gray-100 rounded-lg">
                {achievement.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-3">{achievement.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {achievement.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;