import React from 'react';
import { motion } from 'framer-motion';

function Projects() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Project One" 
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Project One</h3>
            <p className="text-gray-600 dark:text-gray-300">Description of project one.</p>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Project Two" 
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Project Two</h3>
            <p className="text-gray-600 dark:text-gray-300">Description of project two.</p>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Project Three" 
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Project Three</h3>
            <p className="text-gray-600 dark:text-gray-300">Description of project three.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
