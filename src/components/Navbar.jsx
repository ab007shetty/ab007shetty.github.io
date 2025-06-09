import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaProjectDiagram, FaGraduationCap, FaEnvelope, FaUserTie } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { useTheme } from "../ThemeContext";

// Section icons for nav
const sectionIcons = {
  home: <FaHome />,
  skills: <GiSkills />,
  experience: <FaUserTie />,
  education: <FaGraduationCap />,
  projects: <FaProjectDiagram />,
  contact: <FaEnvelope />,
};

// Theme styles for nav
const themeNavbarStyles = {
  icy: {
    bg: "bg-white/20 backdrop-blur-lg",
    border: "border border-cyan-400/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-cyan-100/40 hover:text-black",
    fill: "bg-cyan-100/75",
    outline: "ring-cyan-400",
    highlight: "bg-cyan-400/70",
  },
  hot: {
    bg: "bg-yellow-50/20 backdrop-blur-lg",
    border: "border border-yellow-400/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-yellow-100/40 hover:text-black",
    fill: "bg-yellow-100/70",
    outline: "ring-yellow-400",
    highlight: "bg-yellow-400/70",
  },
  dark: {
    bg: "bg-white/20 backdrop-blur-lg",
    border: "border border-gray-700/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-gray-200/60 hover:text-black",
    fill: "bg-gray-300/60",
    outline: "ring-gray-400",
    highlight: "bg-blue-600/70",
  },
};

export default function Navbar({ sections = [], onNavClick }) {
  const { theme } = useTheme();
  const themeStyle = themeNavbarStyles[theme] || themeNavbarStyles.icy;
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "home");
  const navRefs = useRef({});

  // Scroll spy: update activeSection based on scroll
  useEffect(() => {
    function handler() {
      const offset = window.innerHeight / 3;
      let current = sections[0]?.id || "home";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < offset) {
          current = id;
        }
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  // Animated highlight using transform for smoothness
  const [highlightStyle, setHighlightStyle] = useState({});
  useEffect(() => {
    const el = navRefs.current[activeSection];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();
      setHighlightStyle({
        transform: `translateX(${rect.left - parentRect.left}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transition: "transform 0.5s cubic-bezier(.65,-0.01,.27,1.01), width 0.45s cubic-bezier(.65,-0.01,.27,1.01), background 0.38s",
      });
    }
  }, [activeSection, sections]);

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop navbar */}
      <nav
        className={`
          hidden sm:flex fixed top-3 left-1/2 z-50
          px-3 py-1.5 min-h-[36px]
          rounded-full shadow-lg transition-all duration-200
          ${themeStyle.bg}
          ${themeStyle.border}
          -translate-x-1/2
        `}
        style={{ minWidth: 270, maxWidth: 800 }}
      >
        <div className="relative flex items-center space-x-1 text-base font-semibold w-full">
          {/* Animated highlight */}
          <span
            className={`absolute rounded-full z-0 pointer-events-none ${themeStyle.highlight}`}
            style={{
              ...highlightStyle,
              boxShadow: "0 0 0 2px rgba(0,0,0,0.08)",
              position: "absolute",
              willChange: "transform,width",
            }}
          />
          {sections.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                ref={el => (navRefs.current[id] = el)}
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  setMenuOpen(false);
                  onNavClick && onNavClick(id);
                }}
                className={`
                  relative flex items-center gap-2 px-3 py-1.5 rounded-full transition font-semibold
                  cursor-pointer select-none overflow-hidden group bg-transparent
                  ${active
                    ? `shadow ring-2 ${themeStyle.outline} z-10`
                    : `${themeStyle.link} ${themeStyle.hover}`
                  }
                  focus:outline-none
                `}
                tabIndex={0}
                style={{ color: "black", background: "transparent" }}
              >
                {/* Animated fill on hover */}
                <span
                  className={`
                    absolute inset-0 z-0 rounded-full pointer-events-none
                    transition-all duration-250
                    scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100
                    origin-left
                    ${themeStyle.fill}
                  `}
                  style={{
                    transitionProperty: 'transform, background, opacity',
                  }}
                />
                <span className="relative z-10 text-lg">{sectionIcons[id]}</span>
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navbar Toggle Button */}
      <div className="sm:hidden fixed top-4 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`
            text-2xl bg-white/20 rounded-full p-2 shadow-md border border-white/20
            text-black
            backdrop-blur-xl
          `}
        >
          {menuOpen ? (
            <svg width={22} height={22} viewBox="0 0 22 22">
              <line x1="5" y1="5" x2="17" y2="17" stroke="black" strokeWidth={2} />
              <line x1="17" y1="5" x2="5" y2="17" stroke="black" strokeWidth={2} />
            </svg>
          ) : (
            <svg width={22} height={22} viewBox="0 0 22 22">
              <rect x="4" y="6" width="14" height="2" rx="1" fill="black" />
              <rect x="4" y="14" width="14" height="2" rx="1" fill="black" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'backdrop-blur-xl bg-black/30' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Mobile Drawer */}
      <div
        className={`
          sm:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs z-50
          rounded-l-2xl border-l px-6 py-8 shadow-2xl
          ${themeStyle.bg} ${themeStyle.border}
          ${menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}
          transition-transform duration-300
        `}
        style={{ minWidth: 220 }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-lg bg-white/40 rounded-full p-1 hover:bg-white/70 text-black"
        >
          <svg width={22} height={22} viewBox="0 0 22 22">
            <line x1="5" y1="5" x2="17" y2="17" stroke="black" strokeWidth={2} />
            <line x1="17" y1="5" x2="5" y2="17" stroke="black" strokeWidth={2} />
          </svg>
        </button>
        <nav className="flex flex-col items-start space-y-4 mt-10">
          {sections.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  setMenuOpen(false);
                  onNavClick && onNavClick(id);
                }}
                className={`
                  relative flex items-center gap-3 px-3 py-2 rounded-xl font-semibold w-full
                  transition
                  cursor-pointer select-none
                  group
                  overflow-hidden
                  ${active
                    ? `shadow ring-2 ${themeStyle.outline} ${themeStyle.highlight} z-10`
                    : `${themeStyle.link} ${themeStyle.hover}`
                  }
                  focus:outline-none
                `}
                tabIndex={0}
                style={{ color: 'black' }}
              >
                <span className="relative z-10 text-xl">{sectionIcons[id]}</span>
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}