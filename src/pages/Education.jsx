import React from 'react';

function Education() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <ul className="border-l-2 border-green-500 pl-4">
        <li className="mb-8">
          <h3 className="text-xl font-semibold">M.S. in Computer Science</h3>
          <p className="text-gray-600">University of Example, 2020</p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">B.S. in Information Technology</h3>
          <p className="text-gray-600">College of Examples, 2018</p>
        </li>
      </ul>
    </section>
  );
}

export default Education;
