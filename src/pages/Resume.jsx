import React from 'react';

function Resume() {
  return (
    <section className="container mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Resume</h2>
      <p className="mb-6">You can download my resume below:</p>
      <a 
        href="/resume.pdf" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download Resume
      </a>
      {/* Optionally, you can embed a PDF preview or image of the resume */}
    </section>
  );
}

export default Resume;
