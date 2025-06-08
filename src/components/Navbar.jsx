import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaGraduationCap, FaEnvelope, FaUserTie } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi'; // for Skills icon, more unique than FaStar
import { useTheme } from '../ThemeContext';

const navItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/skills', label: 'Skills', icon: <GiSkills /> },
  { to: '/experience', label: 'Experience', icon: <FaUserTie /> },
  { to: '/education', label: 'Education', icon: <FaGraduationCap /> },
  { to: '/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  { to: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

// Theme styles for navbar backgrounds and hovers
const themeNavbarStyles = {
  icy: {
    bg: "bg-white/20 backdrop-blur-lg",
    border: "border border-cyan-400/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-cyan-100/40 hover:text-black",
    fill: "bg-cyan-100/75",
    outline: "ring-cyan-200",
  },
  hot: {
    bg: "bg-yellow-50/20 backdrop-blur-lg",
    border: "border border-yellow-400/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-yellow-100/40 hover:text-black",
    fill: "bg-yellow-100/70",
    outline: "ring-yellow-200",
  },
  dark: {
    bg: "bg-white/20 backdrop-blur-lg",
    border: "border border-gray-700/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-gray-200/60 hover:text-black",
    fill: "bg-gray-300/60",
    outline: "ring-gray-400",
  },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const themeStyle = themeNavbarStyles[theme] || themeNavbarStyles.icy;

  return (
    <>
      {/* Desktop navbar */}
      <nav
        className={`
          hidden sm:flex fixed top-3 left-1/2 z-40
          px-3 py-1.5 min-h-[36px]
          rounded-full shadow-lg transition-all duration-200
          ${themeStyle.bg}
          ${themeStyle.border}
          -translate-x-1/2
        `}
        style={{
          minWidth: 270,
          maxWidth: 800,
        }}
      >
        <div className="flex items-center space-x-1 text-base font-semibold w-full">
          {navItems.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  relative flex items-center gap-2 px-3 py-1.5 rounded-full transition font-semibold
                  cursor-pointer select-none
                  overflow-hidden
                  group
                  ${active
                    ? `${themeStyle.active} shadow`
                    : `${themeStyle.link} ${themeStyle.hover}`
                  }
                  focus:outline-none
                `}
                tabIndex={0}
                style={{ color: 'black' }}
              >
                {/* Animated fill on hover using ::before pseudo */}
                <span
                  className={`
                    absolute inset-0 z-0 rounded-full pointer-events-none
                    transition-all duration-300
                    scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100
                    origin-left
                    ${themeStyle.fill}
                  `}
                  style={{
                    transitionProperty: 'transform, background, opacity',
                  }}
                />
                <span className="relative z-10 text-lg">{icon}</span>
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navbar toggle */}
      <div className="sm:hidden fixed top-4 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`
            text-2xl bg-white/20 rounded-full p-2 shadow-md border border-white/20
            text-black
            backdrop-blur-xl
          `}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile: Frosted glass drawer background */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'backdrop-blur-xl bg-black/30' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Mobile drawer */}
      <div
        className={`
          sm:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs z-50
          rounded-l-2xl border-l px-6 py-8 shadow-2xl
          ${themeStyle.bg} ${themeStyle.border}
          ${menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}
          transition-transform duration-300
        `}
        style={{
          minWidth: 220,
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-lg bg-white/40 rounded-full p-1 hover:bg-white/70 text-black"
        >
          <FaTimes />
        </button>
        <nav className="flex flex-col items-start space-y-4 mt-10">
          {navItems.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`
                  relative flex items-center gap-3 px-3 py-2 rounded-xl font-semibold w-full
                  transition
                  cursor-pointer select-none
                  group
                  overflow-hidden
                  ${active
                    ? `${themeStyle.active} shadow`
                    : `${themeStyle.link} ${themeStyle.hover}`
                  }
                  focus:outline-none
                `}
                tabIndex={0}
                style={{ color: 'black' }}
              >
                <span
                  className={`
                    absolute inset-0 z-0 rounded-xl pointer-events-none
                    transition-all duration-300
                    scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100
                    origin-left
                    ${themeStyle.fill}
                  `}
                  style={{
                    transitionProperty: 'transform, background, opacity',
                  }}
                />
                <span className="relative z-10 text-xl">{icon}</span>
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navbar;