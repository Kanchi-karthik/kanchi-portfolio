import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Calendar, Plus, Edit3, Trash2 } from 'lucide-react';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Refs for scroll animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    // Load updates from localStorage
    const savedUpdates = localStorage.getItem('portfolioUpdates');
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.content) {
      const update = {
        id: Date.now(),
        title: newUpdate.title,
        content: newUpdate.content,
        date: new Date().toLocaleDateString()
      };
      
      const updatedList = [update, ...updates];
      setUpdates(updatedList);
      localStorage.setItem('portfolioUpdates', JSON.stringify(updatedList));
      
      setNewUpdate({ title: '', content: '' });
      setShowForm(false);
    }
  };

  const handleDeleteUpdate = (id) => {
    const updatedList = updates.filter(update => update.id !== id);
    setUpdates(updatedList);
    localStorage.setItem('portfolioUpdates', JSON.stringify(updatedList));
  };

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
          Stay informed about my latest achievements, projects, and professional developments.
        </p>
        
        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center mx-auto transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Update
          </button>
        )}
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card mb-8 p-6"
        >
          <h3 className="text-xl font-bold mb-4">Add New Update</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newUpdate.title}
                onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="Update title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
              <textarea
                value={newUpdate.content}
                onChange={(e) => setNewUpdate({...newUpdate, content: e.target.value})}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="Update content"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUpdate}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Add Update
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {updates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No updates yet. Check back soon!</p>
          </div>
        ) : (
          updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 relative group"
            >
              {isAdmin && (
                <button
                  onClick={() => handleDeleteUpdate(update.id)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-primary-600 dark:text-primary-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{update.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{update.content}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{update.date}</div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Updates;