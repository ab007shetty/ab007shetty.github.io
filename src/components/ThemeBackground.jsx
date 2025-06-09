import React from "react";
import { useTheme } from "../ThemeContext";
import IcyThemeBackground from "../themes/IcyThemeBackground";
import HotThemeBackground from "../themes/HotThemeBackground";
import DarkThemeBackground from "../themes/DarkThemeBackground";

export default function ThemeBackground({ activeSection }) {
  const { theme } = useTheme();

  // Landing page: animated backgrounds
  if (activeSection === "home") {
    if (theme === "hot") return <HotThemeBackground />;
    if (theme === "dark") return <DarkThemeBackground />;
    return <IcyThemeBackground />;
  }

  // Hot: glossy gold
  if (theme === "hot") {
    return (
      <div className="fixed inset-0 -z-10 transition-all duration-700"
        style={{
          background: "linear-gradient(135deg, #fffbe6 0%, #fff4cc 60%, #ffe4a3 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      />
    );
  }

  // Dark: bluish dark
  if (theme === "dark") {
    return (
      <div className="fixed inset-0 -z-10 transition-all duration-700"
        style={{
          background: "linear-gradient(135deg, #101a2b 0%, #223053 60%, #0c1726 100%)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
        }}
      />
    );
  }

  // Icy: glossy snowy white with a hint of teal, strong gloss
  return (
    <div className="fixed inset-0 w-full h-full -z-10 transition-all duration-700 pointer-events-none select-none">
      {/* Main background: mostly white, a hint of teal */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(120deg, #fafdff 0%, #e5fafd 50%, #d5f6fe 100%)
          `,
          opacity: 1,
          WebkitBackdropFilter: "blur(52px) brightness(1.13)",
          backdropFilter: "blur(52px) brightness(1.13)",
          transition: "all 0.7s cubic-bezier(.45,.8,.55,1)",
        }}
      />
      {/* Strong white gloss ellipse for the "frosted" effect */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "17%",
          width: "65vw",
          height: "32vh",
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.11) 85%)",
          opacity: 0.73,
          filter: "blur(28px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Subtle teal gloss at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "30%",
          width: "55vw",
          height: "13vh",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(103,232,249,0.16) 0%, rgba(103,232,249,0) 80%)",
          opacity: 0.92,
          filter: "blur(17px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}