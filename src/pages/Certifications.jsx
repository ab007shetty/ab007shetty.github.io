import React from 'react';
import { motion } from 'framer-motion';

function Certifications() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">Certifications</h2>
      <div className="flex flex-wrap">
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          className="m-2 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        >
          <h3 className="font-semibold">Certification A</h3>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          className="m-2 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        >
          <h3 className="font-semibold">Certification B</h3>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          className="m-2 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
        >
          <h3 className="font-semibold">Certification C</h3>
        </motion.div>
      </div>
    </section>
  );
}

export default Certifications;
