import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill out all fields.');
      return;
    }
    console.log(form);
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <input 
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input 
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <textarea 
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
      <div className="flex justify-center mt-8 space-x-6 text-2xl">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaLinkedin />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300">
          <FaGithub />
        </a>
        <a href="mailto:email@example.com" className="hover:text-red-500">
          <FaEnvelope />
        </a>
      </div>
    </section>
  );
}

export default Contact;
