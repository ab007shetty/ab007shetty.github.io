import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeBackground from "./components/ThemeBackground";
import ThemeWheel from "./components/ThemeWheel";
import ThemeCursors from "./components/ThemeCursors";
import Intro from "./pages/Intro";
import Redirector from "./Redirector";

// Lazy load components that aren't immediately visible
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Contact = lazy(() => import("./pages/Contact"));

// Loading fallback component
const PageLoader = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
  </div>
));

// Theme styles for ScrollToTop (moved from Contact.js)
const themeStyles = {
  icy: {
    primaryButton: "bg-cyan-500 hover:bg-cyan-600 text-white",
  },
  hot: {
    primaryButton: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  dark: {
    primaryButton: "bg-blue-600 hover:bg-blue-700 text-white",
  }
};

// ScrollToTop component (moved from Contact.js)
const ScrollToTop = ({ theme, activeSection }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const styles = themeStyles[theme] || themeStyles.icy;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't show on landing page
  if (!showScrollTop || activeSection === "home") return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full ${styles.primaryButton} shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const { theme } = useTheme();
  const sectionRefs = SECTIONS.reduce((acc, { id }) => {
    acc[id] = useRef();
    return acc;
  }, {});

  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isLeavingLanding, setIsLeavingLanding] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set(['home']));

  // Preload sections progressively
  useEffect(() => {
    if (introDone) {
      // Start loading About immediately after intro
      const loadAbout = setTimeout(() => {
        setLoadedSections(prev => new Set([...prev, 'about']));
      }, 100);

      // Load other sections with slight delays
      const loadProjects = setTimeout(() => {
        setLoadedSections(prev => new Set([...prev, 'projects']));
      }, 500);

      const loadContact = setTimeout(() => {
        setLoadedSections(prev => new Set([...prev, 'contact']));
      }, 1000);

      // Load certifications last (likely has images)
      const loadCertifications = setTimeout(() => {
        setLoadedSections(prev => new Set([...prev, 'certifications']));
      }, 1500);

      return () => {
        clearTimeout(loadAbout);
        clearTimeout(loadProjects);
        clearTimeout(loadContact);
        clearTimeout(loadCertifications);
      };
    }
  }, [introDone]);

  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < offset) {
          current = id;
        }
      }
      
      setActiveSection(current);
      setIsLeavingLanding(current !== "home");
    };

    // Use passive listeners and throttle for better performance
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handler();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });
    handler(); // Initial call
    return () => window.removeEventListener("scroll", throttledHandler);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Use native smooth scrolling with better performance
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    document.body.style.cursor = customCursor ? "none" : "";
    return () => { document.body.style.cursor = ""; };
  }, [customCursor]);

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Enable smooth scrolling globally
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => { 
      document.body.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [introDone]);

  // Memoized section renderer
  const renderSection = React.useCallback((id, label) => {
    const shouldLoad = loadedSections.has(id);
    
    if (id === "home") {
      return (
        <div
          className={`flex w-full h-full items-center justify-center transition-all duration-700 ${
            isLeavingLanding
              ? "opacity-0 translate-y-24 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          <LandingPage />
        </div>
      );
    }

    if (!shouldLoad) {
      return <PageLoader />;
    }

    return (
      <Suspense fallback={<PageLoader />}>
        {id === "about" && <About />}
        {id === "projects" && <Projects />}
        {id === "certifications" && <Certifications />}
        {id === "contact" && (
          <div className="w-full">
            <Contact />
          </div>
        )}
      </Suspense>
    );
  }, [loadedSections, isLeavingLanding]);

  if (!introDone) {
    return <Intro onDone={() => setIntroDone(true)} />;
  }

  return (
    <>
      <ThemeBackground activeSection={activeSection} />
      {customCursor && <ThemeCursors />}
      
      <Navbar sections={SECTIONS} onNavClick={scrollToSection} />

      {/* ThemeWheel only on landing page */}
      {activeSection === "home" && (
        <div
          style={{
            position: "fixed",
            top: 32,
            left: 32,
            zIndex: 1010,
          }}
        >
          <ThemeWheel customCursor={customCursor} setCustomCursor={setCustomCursor} />
        </div>
      )}

      {/* ScrollToTop component - shows in all sections except home */}
      <ScrollToTop theme={theme} activeSection={activeSection} />

      {/* Optimized scrolling container */}
      <div
        className="relative"
        style={{ 
          scrollBehavior: "smooth",
          contain: "layout style paint"
        }}
      >
        {SECTIONS.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            ref={sectionRefs[id]}
            className={`min-h-screen flex items-center justify-center ${
              id === "contact" ? "pb-0" : ""
            }`}
            style={{
              scrollSnapAlign: "start",
              contain: "layout style paint"
            }}
          >
            {renderSection(id, label)}
          </section>
        ))}
      </div>
    </>
  );
}

// Memoized main Portfolio component
const MemoizedPortfolio = React.memo(Portfolio);

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MemoizedPortfolio />} />
          <Route path="/:slug" element={<Redirector />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}