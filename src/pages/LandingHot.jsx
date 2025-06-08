import React from "react";
import HotThemeBackground from "../themes/HotThemeBackground";
import Navbar from "../components/Navbar";
import { useTheme } from "../ThemeContext";
import LandingContent from "./LandingContent";

const LandingHot = () => {
  // You can use theme if needed
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <HotThemeBackground />
      <Navbar />
      <LandingContent accent="hot" />
    </div>
  );
};

export default LandingHot;