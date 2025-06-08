import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeWheel from "../components/ThemeWheel";
import LandingIcy from "./LandingIcy";

const FADE_DURATION = 1;

const Intro = ({ customCursor, setCustomCursor, onDone }) => {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => setPhase("fade"), 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "fade") {
      const timer = setTimeout(() => setPhase("landing"), FADE_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Intro spinner overlay */}
      <AnimatePresence>
        {(phase === "intro" || phase === "fade") && (
          <motion.div
            key="wheel"
            className="flex items-center justify-center absolute inset-0"
            initial={{ opacity: 1, scale: 1 }}
            animate={
              phase === "fade"
                ? { opacity: 0, scale: 0.3 }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: FADE_DURATION, ease: "easeIn" }}
            style={{
              zIndex: 10000,
              background: "rgba(18, 22, 28, 0.94)", // Dark, semi-opaque
            }}
          >
            <ThemeWheel
              customCursor={customCursor}
              setCustomCursor={setCustomCursor}
              introSpinning={true}
              disableCursorToggle={true}
              // Optional: pass a prop for extra smoothness if ThemeWheel supports it
              spinSpeed={0.045} // slightly slower for more fluid spin (tweak as needed)
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing content is always rendered, just fade it in */}
      <motion.div
        key="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "landing" ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: phase === "landing" ? "auto" : "none",
        }}
        onAnimationComplete={() => {
          if (phase === "landing" && onDone) onDone();
        }}
      >
        <LandingIcy />
      </motion.div>
    </div>
  );
};

export default Intro;