import React from 'react';

function Qualifications() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">Qualifications</h2>
      <ul className="border-l-2 border-blue-500 pl-4">
        <li className="mb-8">
          <h3 className="text-xl font-semibold">2023 - Present: Senior Developer at XYZ Company</h3>
          <p className="text-gray-600">Leading a team of developers in building scalable web applications.</p>
        </li>
        <li className="mb-8">
          <h3 className="text-xl font-semibold">2020 - 2023: Mid-Level Developer at ABC Corp</h3>
          <p className="text-gray-600">Worked on front-end development and UI/UX design.</p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">2018 - 2020: Junior Developer at Tech Startup</h3>
          <p className="text-gray-600">Assisted in development of mobile-friendly websites.</p>
        </li>
      </ul>
    </section>
  );
}

export default Qualifications;
