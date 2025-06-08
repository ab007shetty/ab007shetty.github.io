import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Intro from "./pages/Intro";
import LandingIcy from "./pages/LandingIcy";
import LandingHot from "./pages/LandingHot";
import LandingDark from "./pages/LandingDark";
import IcyThemeBackground from "./themes/IcyThemeBackground";
import HotThemeBackground from "./themes/HotThemeBackground";
import DarkThemeBackground from "./themes/DarkThemeBackground";
import ThemeCursors from "./components/ThemeCursors";
import ThemeWheel from "./components/ThemeWheel";
import Navbar from "./components/Navbar"; // Remove if not needed

function ThemeSwitchingLanding({ customCursor, setCustomCursor }) {
  const { theme } = useTheme();
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* TOP-LEFT ThemeWheel */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1010
        }}
      >
        <ThemeWheel customCursor={customCursor} setCustomCursor={setCustomCursor} />
      </div>
      {theme === "hot" && <LandingHot />}
      {theme === "dark" && <LandingDark />}
      {theme === "icy" && <LandingIcy />}
    </div>
  );
}

function Backgrounds() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "icy" && <IcyThemeBackground />}
      {theme === "hot" && <HotThemeBackground />}
      {theme === "dark" && <DarkThemeBackground />}
    </>
  );
}

function AppContent({ customCursor, setCustomCursor }) {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <Navbar /> {/* Remove if not needed */}
      {customCursor && <ThemeCursors />}
      <Backgrounds />
      <Routes>
        <Route
          path="/"
          element={<ThemeSwitchingLanding customCursor={customCursor} setCustomCursor={setCustomCursor} />}
        />
        <Route
          path="/home"
          element={<ThemeSwitchingLanding customCursor={customCursor} setCustomCursor={setCustomCursor} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  const [customCursor, setCustomCursor] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.cursor = customCursor ? "none" : "";
    return () => { document.body.style.cursor = ""; };
  }, [customCursor]);

  return (
    <ThemeProvider>
      <Router>
        {!introDone ? (
          <Intro
            customCursor={customCursor}
            setCustomCursor={setCustomCursor}
            onDone={() => setIntroDone(true)}
          />
        ) : (
          <AppContent
            customCursor={customCursor}
            setCustomCursor={setCustomCursor}
          />
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;