import React, { useState, useEffect, useRef } from "react";
import { FaAward, FaTrophy, FaTimes, FaChevronLeft, FaChevronRight,
  FaFilter
} from "react-icons/fa";
import { useTheme } from "../ThemeContext";

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

// ========== MODAL PORTAL ==========
const ModalPortal = ({ children, isOpen }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Create modal root element
    let modalDiv = document.getElementById('modal-root');
    if (!modalDiv) {
      modalDiv = document.createElement('div');
      modalDiv.id = 'modal-root';
      modalDiv.style.position = 'fixed';
      modalDiv.style.top = '0';
      modalDiv.style.left = '0';
      modalDiv.style.width = '100vw';
      modalDiv.style.height = '100vh';
      modalDiv.style.zIndex = '999999';
      modalDiv.style.pointerEvents = 'none';
      document.body.appendChild(modalDiv);
    }
    setModalRoot(modalDiv);

    return () => {
      // Clean up when component unmounts
      const existingModalDiv = document.getElementById('modal-root');
      if (existingModalDiv && !existingModalDiv.hasChildNodes()) {
        document.body.removeChild(existingModalDiv);
      }
    };
  }, []);

  useEffect(() => {
    if (modalRoot) {
      modalRoot.style.pointerEvents = isOpen ? 'auto' : 'none';
    }
  }, [isOpen, modalRoot]);

  if (!modalRoot || !isOpen) return null;

  // Create portal-like behavior by directly manipulating the modal root
  modalRoot.innerHTML = '';
  const portalDiv = document.createElement('div');
  modalRoot.appendChild(portalDiv);

  // Render children into the portal div using dangerouslySetInnerHTML alternative
  const PortalContent = () => children;
  
  return modalRoot ? (
    <div 
      ref={(ref) => {
        if (ref && modalRoot) {
          modalRoot.innerHTML = '';
          modalRoot.appendChild(ref);
        }
      }}
    >
      <PortalContent />
    </div>
  ) : null;
};

// ========== MODAL COMPONENT ==========
const Modal = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      // Disable body scroll and hide overflow
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      document.documentElement.style.overflow = 'hidden';
      
      // Create and add modal container
      const modalContainer = document.getElementById('certificate-modal-container');
      if (!modalContainer) {
        const container = document.createElement('div');
        container.id = 'certificate-modal-container';
        container.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 2147483647 !important;
          pointer-events: auto !important;
          width: 100vw !important;
          height: 100vh !important;
        `;
        document.body.appendChild(container);
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      
      // Remove modal container
      const modalContainer = document.getElementById('certificate-modal-container');
      if (modalContainer) {
        document.body.removeChild(modalContainer);
      }
    }

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      
      const modalContainer = document.getElementById('certificate-modal-container');
      if (modalContainer) {
        try {
          document.body.removeChild(modalContainer);
        } catch (e) {
          // Container might already be removed
        }
      }
    };
  }, [isOpen, mounted]);

  if (!mounted || !isOpen) return null;

  return null; // This component just manages the DOM, content is rendered by CertificateLightbox
};

// ========== CERTIFICATE LIGHTBOX ==========
const CertificateLightbox = ({ certificates, index, isOpen, onClose, onPrev, onNext }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape, true);
    return () => {
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!mounted) return;

    const modalContainer = document.getElementById('certificate-modal-container');
    
    if (isOpen && index !== null && certificates[index] && modalContainer) {
      const certificate = certificates[index];
      
      // Create modal content
      modalContainer.innerHTML = `
        <div style="
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 1rem !important;
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(4px) !important;
        " id="modal-backdrop">
          <div style="
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 1rem !important;
            max-width: 80rem !important;
            width: 100% !important;
            max-height: 97vh !important;
            overflow: hidden !important;
            position: relative !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          " id="modal-content">
            
            <!-- Close Button -->
            <button id="modal-close" style="
              position: absolute !important;
              top: 1rem !important;
              right: 1rem !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.5rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: pointer !important;
              font-size: 1.25rem !important;
              width: 2.5rem !important;
              height: 2.5rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">×</button>
            
            <!-- Previous Button -->
            <button id="modal-prev" ${index === 0 ? 'disabled' : ''} style="
              position: absolute !important;
              left: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.75rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: ${index === 0 ? 'not-allowed' : 'pointer'} !important;
              font-size: 1.25rem !important;
              width: 3rem !important;
              height: 3rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              opacity: ${index === 0 ? '0.4' : '1'} !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">‹</button>
            
            <!-- Next Button -->
            <button id="modal-next" ${index === certificates.length - 1 ? 'disabled' : ''} style="
              position: absolute !important;
              right: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 20 !important;
              background: rgba(255, 255, 255, 0.9) !important;
              color: #374151 !important;
              padding: 0.75rem !important;
              border-radius: 50% !important;
              border: none !important;
              cursor: ${index === certificates.length - 1 ? 'not-allowed' : 'pointer'} !important;
              font-size: 1.25rem !important;
              width: 3rem !important;
              height: 3rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              transition: all 0.2s !important;
              opacity: ${index === certificates.length - 1 ? '0.4' : '1'} !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            ">›</button>
              
              <!-- Certificate Image -->
              <div style="
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              ">
                <div style="
                  position: relative !important;
                  width: 100% !important;
                  max-width: 55rem !important;
                  aspect-ratio: 33/25 !important;
                  background: white !important;
                  border-radius: 0.75rem !important;
                  overflow: hidden !important;
                  border: 1px solid #e5e7eb !important;
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                ">
                  <img
                    src="${certificate.image}"
                    alt="${certificate.title}"
                    style="
                      position: absolute !important;
                      top: 0 !important;
                      left: 0 !important;
                      width: 100% !important;
                      height: 100% !important;
                      object-fit: cover !important;
                    "
                  />
                </div>
              </div>
              
              <!-- Navigation Info -->
              <div style="
                text-align: center !important;
                margin-top: 1.5rem !important;
                color: #6b7280 !important;
                font-size: 0.875rem !important;
              ">
                ${index + 1} of ${certificates.length}
              </div>
            </div>
          </div>
        </div>
      `;

      // Add event listeners
      const backdrop = modalContainer.querySelector('#modal-backdrop');
      const closeBtn = modalContainer.querySelector('#modal-close');
      const prevBtn = modalContainer.querySelector('#modal-prev');
      const nextBtn = modalContainer.querySelector('#modal-next');
      const content = modalContainer.querySelector('#modal-content');

      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) {
            onClose();
          }
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onClose();
        });
      }

      if (prevBtn && index > 0) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onPrev();
        });
      }

      if (nextBtn && index < certificates.length - 1) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          onNext();
        });
      }

      if (content) {
        content.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else if (modalContainer) {
      modalContainer.innerHTML = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      if (modalContainer) {
        modalContainer.innerHTML = '';
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, index, certificates, onClose, onPrev, onNext, mounted]);

  return <Modal isOpen={isOpen} onClose={onClose} />;
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

  // Function to get count for each category
  const getCategoryCount = (category) => {
    if (category === "All") {
      return certificates.length;
    }
    return certificates.filter(cert => cert.category === category).length;
  };

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
  const prevLightbox = () => { if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1); };
  const nextLightbox = () => { if (selectedIndex < filteredCertificates.length - 1) setSelectedIndex(selectedIndex + 1); };

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
              <span className={`ml-2 inline-block px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  activeFilter === category 
                    ? 'bg-white/20 text-current' 
                    : 'bg-black/10 text-current'
                }`}>
                  {getCategoryCount(category)}
                </span>
              {activeFilter === category && (
                <span className="ml-2 inline-block text-xs font-bold text-green-600">✓</span>
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