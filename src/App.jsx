import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import SocialsAndEmail from "./components/SocialsAndEmail";
import LandingContent from "./pages/LandingContent";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ThemeBackground from "./components/ThemeBackground";
import ThemeWheel from "./components/ThemeWheel";
import ThemeCursors from "./components/ThemeCursors";
import Intro from "./pages/Intro";
import { ThemeProvider } from "./ThemeContext";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const sectionRefs = SECTIONS.reduce((acc, { id }) => {
    acc[id] = useRef();
    return acc;
  }, {});

  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isLeavingLanding, setIsLeavingLanding] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);

  // Scroll spy: update activeSection based on scroll
  useEffect(() => {
    function handler() {
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
    }
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function scrollToSection(id) {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Hide default cursor if customCursor is enabled
  useEffect(() => {
    document.body.style.cursor = customCursor ? "none" : "";
    return () => { document.body.style.cursor = ""; };
  }, [customCursor]);

  // Prevent scrolling during intro
  useEffect(() => {
    if (!introDone) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [introDone]);

  return (
    <ThemeProvider>
      <ThemeBackground activeSection={activeSection} />
      {customCursor && <ThemeCursors />}
      {!introDone ? (
        <Intro onDone={() => setIntroDone(true)} />
      ) : (
        <>
          <Navbar sections={SECTIONS} onNavClick={scrollToSection} />
          {/* ThemeWheel at the top only on landing (home) section */}
          {activeSection === "home" && (
            <div style={{
              position: "fixed",
              top: 32,  // 32px margin from top
              left: 32, // 32px margin from left
              zIndex: 1010
            }}>
              <ThemeWheel customCursor={customCursor} setCustomCursor={setCustomCursor} />
            </div>
          )}
          {/* SocialsAndEmail only on landing (home) section 
          {activeSection === "home" && <SocialsAndEmail />} */}
          <div className="snap-y snap-mandatory overflow-y-auto min-h-screen" style={{ scrollBehavior: "smooth" }}>
            {SECTIONS.map(({ id, label }) => (
              <section
                key={id}
                id={id}
                ref={sectionRefs[id]}
                className={`min-h-screen flex items-center justify-center snap-start ${
                  id === "contact" ? "pb-0" : ""
                }`}
              >
                {id === "home" ? (
                  <div className={`flex w-full h-full items-center justify-center transition-all duration-700 ${isLeavingLanding ? "opacity-0 translate-y-24 pointer-events-none" : "opacity-100 translate-y-0"}`}>
                    <LandingContent />
                  </div>
                ) : id === "about" ? (
                  <About />
                ) : id === "projects" ? (
                  <Projects />
                ) : id === "certifications" ? (
                  <Certifications />
                ) : id === "contact" ? (
                  <div className="w-full">
                    <Contact />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-4">{label}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-200">Your {label} content goes here.</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}
    </ThemeProvider>
  );
}