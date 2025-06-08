import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="w-40 h-40 rounded-full mb-6 md:mb-0 md:mr-6"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <div className="flex flex-wrap">
            <motion.span whileHover={{ scale: 1.1 }} className="m-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full">
              JavaScript
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }} className="m-2 px-3 py-1 bg-green-200 text-green-800 rounded-full">
              React
            </motion.span>
            <motion.span whileHover={{ scale: 1.1 }} className="m-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">
              CSS
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
