import React from "react";
import DarkThemeBackground from "../themes/DarkThemeBackground";
import Navbar from "../components/Navbar";
import { useTheme } from "../ThemeContext";
import LandingContent from "./LandingContent";

const LandingDark = () => {
  // You can keep theme and setTheme if needed for other things, but not for ThemeWheel here
  return (
    <div className="relative w-full h-screen overflow-hidden text-white ">
      <DarkThemeBackground />
      <Navbar />
      <LandingContent accent="dark" />
    </div>
  );
};

export default LandingDark;