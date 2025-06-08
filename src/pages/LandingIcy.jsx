import React from "react";
import IcyThemeBackground from "../themes/IcyThemeBackground";
import Navbar from "../components/Navbar";
import { useTheme } from "../ThemeContext";
import LandingContent from "./LandingContent";

const LandingIcy = () => {
  // You can keep theme and setTheme if needed for other things, but not for ThemeWheel here
  return (
    <div className="relative w-full h-screen overflow-hidden text-white ">
      <IcyThemeBackground />
      <Navbar />
      <LandingContent accent="icy" />
    </div>
  );
};

export default LandingIcy;