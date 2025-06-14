import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./LandingPage";

const FADE_DURATION = 0.5;
const arcColors = ["#67e8f9", "#fde047", "#64748b"];

const ArcWaves = ({ size = 110, duration = 0.19 }) => (
  <div
    style={{
      width: size,
      height: size,
      position: "relative",
      willChange: "transform, opacity",
      contain: "layout style paint",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    }}
  >
    {arcColors.map((color, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          borderTop: `${size * 0.12}px solid ${color}`,
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          background: "transparent",
          transform: `rotate(${i * 120}deg)`,
          top: 0,
          left: 0,
          opacity: 0.95,
          zIndex: 2,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
        animate={{
          rotate: [i * 120, i * 120 + 360],
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear",
          delay: i * (duration / 2.5),
        }}
      />
    ))}
  </div>
);

const Intro = ({ onDone }) => {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => setPhase("fade"), 2400);
      return () => clearTimeout(timer);
    }
    if (phase === "fade") {
      const timer = setTimeout(() => setPhase("landing"), FADE_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[9999]">
      <AnimatePresence>
        {(phase === "intro" || phase === "fade") && (
          <motion.div
            key="waves"
            className="flex items-center justify-center absolute inset-0"
            initial={{ opacity: 1, scale: 1 }}
            animate={
              phase === "fade"
                ? { opacity: 0, scale: 0.38 }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.38 }}
            transition={{ duration: FADE_DURATION, ease: "easeIn" }}
            style={{
              zIndex: 10000,
              background: "rgba(18, 22, 28, 0.94)",
              willChange: "opacity, transform",
            }}
          >
            <ArcWaves size={110} duration={0.19} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "landing" ? 1 : 0 }}
        transition={{ duration: 0.30, ease: "easeOut" }}
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
        <LandingPage />
      </motion.div>
    </div>
  );
};

export default Intro;