import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import {
  FaAward, FaTrophy, FaTimes, FaChevronLeft, FaChevronRight,
  FaFilter
} from "react-icons/fa";

// ===== THEME STYLES =====
const themeStyles = {
  icy: {
    cardBg: "bg-white/15 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/25 hover:border-cyan-300/40 hover:shadow-cyan-400/20",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    button: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 border-cyan-400/40",
    badge: "bg-cyan-100/30 text-cyan-800 border-cyan-300/40",
    glow: "shadow-cyan-400/20",
    filterActive: "bg-cyan-500/30 text-cyan-800 border-cyan-400/60",
    lightboxBg: "bg-white/95 backdrop-blur-xl"
  },
  hot: {
    cardBg: "bg-yellow-50/15 backdrop-blur-xl border-yellow-300/20",
    cardHover: "hover:bg-yellow-50/25 hover:border-yellow-400/40 hover:shadow-yellow-400/20",
    text: "text-yellow-900",
    textSecondary: "text-yellow-800",
    accent: "text-yellow-600",
    button: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",
    badge: "bg-yellow-100/30 text-yellow-900 border-yellow-400/40",
    glow: "shadow-yellow-400/20",
    filterActive: "bg-yellow-500/30 text-yellow-900 border-yellow-500/60",
    lightboxBg: "bg-yellow-50/95 backdrop-blur-xl"
  },
  dark: {
    cardBg: "bg-gray-900/15 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/25 hover:border-blue-500/40 hover:shadow-blue-400/20",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    button: "bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",
    badge: "bg-blue-900/30 text-blue-200 border-blue-500/40",
    glow: "shadow-blue-400/20",
    filterActive: "bg-blue-600/30 text-blue-200 border-blue-500/60",
    lightboxBg: "bg-gray-900/95 backdrop-blur-xl"
  }
};

// ======= CERTIFICATES DATA =======
const certificates = [
  {
    id: 1,
    title: "Google IT Support",
    organization: "Google",
    category: "Professional",
    skills: ["Network Protocols", "Cybersecurity", "Operating Systems"],
    image: "/images/it-support.jpg"
  },
  {
    id: 2,
    title: "IBM Cybersecurity Analyst",
    organization: "IBM",
    category: "Professional",
    skills: ["Pen testing", "forensics", "Incident Response"],
    image: "/images/cybersecurity.png"
  },
  {
    id: 3,
    title: "Cloud Architecture with Google Cloud",
    organization: "Google Cloud",
    category: "Professional",
    skills: ["Containerization", "Cloud Services", "Prompt Engineering"],
    image: "/images/google-cloud.jpg"
  },
  {
    id: 4,
    title: "Full-Stack Web Development with React Specialization",
    organization: "The Hong Kong University of Science and Technology",
    category: "Specialization",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "Bootstrap"],
    image: "/images/react.png"
  },
  {
    id: 5,
    title: "Python for Everybody",
    organization: "University of Michigan",
    category: "Specialization",
    skills: ["Data Structures", "Web Scrapping", "Visualizing"],
    image: "/images/py.png"
  },
  {
    id: 6,
    title: "Django for Everybody",
    organization: "University of Michigan",
    category: "Specialization",
    skills: ["Django", "PythonAnywhere", "JSON", "SQLite"],
    image: "/images/django.jpg"
  },
  {
    id: 7,
    title: "Web Design for Everybody",
    organization: "University of Michigan",
    category: "Specialization",
    skills: ["Wireframing", "Responsive Design"],
    image: "/images/web-design.jpg"
  },
  {
    id: 8,
    title: "Modern Big Data Analysis with SQL",
    organization: "Cloudera",
    category: "Specialization",
    skills: ["Hadoop", "Hive", "Spark", "SQL"],
    image: "/images/big-data.jpg"
  },
  {
    id: 9,
    title: "Blockchain",
    organization: "University at Buffalo",
    category: "Specialization",
    skills: ["Blockchain", "Distributed Systems"],
    image: "/images/blockchain.png"
  },
  {
    id: 10,
    title: "Narrative Economics",
    organization: "Yale University, Stanford Online",
    category: "Course",
    skills: ["Socioeconomics", "Consumer Behaviour"],
    image: "/images/economy.png"
  },
  {
    id: 11,
    title: "Machine Learning",
    organization: "Stanford Online",
    category: "Course",
    skills: ["Machine Learning", "AI"],
    image: "/images/ml.png"
  },
  {
    id: 12,
    title: "Introduction to Psychology",
    organization: "Yale University",
    category: "Course",
    skills: ["Critical Thinking", "Psychology"],
    image: "/images/psychology.jpg"
  },
  {
    id: 13,
    title: "Infosys certified Google Cloud Digital Leader",
    organization: "Infosys",
    category: "Infosys",
    skills: ["Google Cloud"],
    image: "/images/infy-gcp-leader.png"
  },
  {
    id: 14,
    title: "Infosys Certified Front End Web Developer",
    organization: "Infosys",
    category: "Infosys",
    skills: ["Front End Web Development"],
    image: "/images/infy-frontend.png"
  },
  {
    id: 15,
    title: "Infosys Certified Cloud Beginner",
    organization: "Infosys",
    category: "Infosys",
    skills: ["Cloud Computing", "Cloud Fundamentals"],
    image: "/images/infy-cloud.png"
  },
  {
    id: 16,
    title: "Hackothsav",
    organization: "SMVITM",
    category: "Others",
    skills: ["MERN Stack", "Hackathon"],
    image: "/images/hackothsav.png"
  },
  {
    id: 17,
    title: "SSLC District Topper",
    organization: "SMVITM",
    category: "Others",
    skills: ["SSLC", "Topper"],
    image: "/images/sslc.jpg"
  },
  {
    id: 18,
    title: "Entrepreneurship Awareness Camp",
    organization: "Entrepreneurship Development Institute of India",
    category: "Others",
    skills: ["Entrepreneurship Awareness"],
    image: "/images/entrepreneurship.jpg"
  },
  {
    id: 19,
    title: "Web Development Internship",
    organization: "Inmovidu",
    category: "Others",
    skills: ["Web Development", "Internship"],
    image: "/images/internship.png"
  },
  {
    id: 20,
    title: "Technical Quiz",
    organization: "SMVITM",
    category: "Others",
    skills: ["Technical Quiz"],
    image: "/images/quiz.jpg"
  },
  {
    id: 21,
    title: "Build a Face Recognition Application using Python",
    organization: "GUVI",
    category: "Others",
    skills: ["Python", "Face Recognition"],
    image: "/images/guvi.png"
  }
];

// ========== COMPONENTS ==========

const CertificateLightbox = ({ certificates, index, isOpen, onClose, onPrev, onNext }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  if (!isOpen || index === null) return null;
  const certificate = certificates[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`${styles.lightboxBg} border rounded-2xl max-w-5xl w-full overflow-hidden relative`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/100 transition p-2 rounded-full text-xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <button
          onClick={onPrev}
          disabled={index === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/100 p-2 rounded-full text-xl ${index === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={onNext}
          disabled={index === certificates.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/100 p-2 rounded-full text-xl ${index === certificates.length - 1 ? "opacity-40 cursor-not-allowed" : ""}`}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-full flex items-center justify-center">
            <div className="relative w-full max-w-[880px] aspect-[33/25] bg-white rounded-xl overflow-hidden border">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  aspectRatio: "33/25",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate, onClick, index }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
        ${styles.cardBg} ${styles.cardHover} border rounded-2xl p-3 cursor-pointer
        transition-all duration-500 transform ${styles.glow} shadow-lg
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        hover:scale-105
      `}
      onClick={() => onClick(index)}
      style={{ transitionDelay: `${index * 50}ms`, minWidth: 0 }}
      title={certificate.title}
    >
      <div className="flex items-center">
        <div className="w-36 h-[110px] min-w-[9rem] rounded-xl overflow-hidden bg-white border flex items-center justify-center mr-4 relative aspect-[33/25]">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              aspectRatio: "33/25",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between h-full min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full border font-bold border-dashed ${styles.accent} bg-white/20 text-xs tracking-wide`}>
              {certificate.category}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {certificate.skills && certificate.skills.map((skill, i) => (
              <span key={i} className={`${styles.badge} border px-2 py-0.5 rounded-xl text-xs`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className={`font-bold ${styles.text} text-lg leading-tight mb-1`}>{certificate.title}</h3>
        <p className={`${styles.accent} font-semibold text-sm`}>{certificate.organization}</p>
      </div>
    </div>
  );
};

const Certifications = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;

  // Show Professional certificates by default
  const [activeFilter, setActiveFilter] = useState("Professional");
  const [filteredCertificates, setFilteredCertificates] = useState(
  certificates.filter(cert => cert.category === "Professional")
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef(null);

  const allowedCategories = Array.from(
    new Set(certificates.map(cert => cert.category))
  );
  const categories = ["All", ...allowedCategories];

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter(cert => cert.category === activeFilter));
    }
  }, [activeFilter]);

  const handleFilter = (category) => setActiveFilter(category);
  const openLightbox = (idx) => { setSelectedIndex(idx); setIsLightboxOpen(true); };
  const closeLightbox = () => { setIsLightboxOpen(false); setSelectedIndex(null); };
  const prevLightbox = (e) => { e.stopPropagation(); if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1); };
  const nextLightbox = (e) => { e.stopPropagation(); if (selectedIndex < filteredCertificates.length - 1) setSelectedIndex(selectedIndex + 1); };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div id="certifications" ref={sectionRef} className="pt-[120px] -mt-[120px]"></div>
        <div className="text-center mb-8">
          <h1
            className={`pt-10 text-4xl sm:text-5xl font-bold ${styles.text} mb-4 flex flex-wrap items-center justify-center gap-2 break-words`}
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              minWidth: 0,
              maxWidth: "100%",
              whiteSpace: "normal"
            }}
          >
            <FaTrophy className={`shrink-0 ${styles.accent}`} style={{ fontSize: "1.2em" }} />
            <span style={{ minWidth: 0, maxWidth: "100%" }}>Certifications</span>
          </h1>
          <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto`}>
            This is Exactly how I spent my time during the Corona Pandemic.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <span className="flex items-center gap-2">
            <FaFilter className={`${styles.textSecondary}`} />
            <span className={`${styles.text} font-medium`}>Filter by:</span>
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`
                px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300
                ${activeFilter === category 
                  ? styles.filterActive + " ring-2 ring-offset-2 ring-cyan-400"
                  : `${styles.button} hover:scale-105`
                }
              `}
            >
              {category}
              {activeFilter === category && (
                <span className="ml-2 inline-block align-middle text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onClick={openLightbox}
              index={index}
            />
          ))}
        </div>
        {filteredCertificates.length === 0 && (
          <div className="text-center py-20">
            <div className={`text-6xl ${styles.textSecondary} mb-4`}>🔍</div>
            <h3 className={`text-2xl font-bold ${styles.text} mb-2`}>No certificates found</h3>
            <p className={`${styles.textSecondary}`}>
              Try adjusting your filters to see more certificates.
            </p>
          </div>
        )}
        <CertificateLightbox
          certificates={filteredCertificates}
          index={selectedIndex}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      </div>
      {/* Only clamp overflow-x on mobile for horizontal scroll issues */}
      <style>{`
        @media (max-width: 767px) {
          .max-w-7xl, .grid, .flex, .certifications-section {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
          }
          h1, .certifications-title {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .grid > div {
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Certifications;