import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Calendar, Clock, User, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "My Journey from Mechanical Engineering to Software Development",
      excerpt: "How I transitioned from a mechanical engineering background to pursuing M.Tech in Computer Science.",
      content: "In this post, I'll share my journey from mechanical engineering to software development...",
      date: "2023-12-01",
      author: "KANCHI KARTHIK",
      readTime: "8 min read",
      category: "Career Transition",
      image: "/images/blog1.jpg"
    },
    {
      id: 2,
      title: "Building Scalable Applications with MERN Stack",
      excerpt: "Best practices and lessons learned from developing full-stack applications.",
      content: "The MERN stack has become one of the most popular choices for building modern web applications...",
      date: "2023-11-15",
      author: "KANCHI KARTHIK",
      readTime: "6 min read",
      category: "Web Development",
      image: "/images/blog2.jpg"
    },
    {
      id: 3,
      title: "Preparing for Technical Interviews",
      excerpt: "Tips and strategies for acing coding interviews and technical assessments.",
      content: "Technical interviews can be challenging, but with the right preparation...",
      date: "2023-10-28",
      author: "KANCHI KARTHIK",
      readTime: "10 min read",
      category: "Interview Preparation",
      image: "/images/blog3.jpg"
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
          Thoughts, tutorials, and insights on technology and software development.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4" />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  <Tag size={12} className="mr-1" />
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <User size={14} className="mr-1" />
                <span className="mr-4">{post.author}</span>
                <Calendar size={14} className="mr-1" />
                <span className="mr-4">{post.date}</span>
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
              <button className="mt-4 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;