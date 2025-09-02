import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const arcColors = ["#67e8f9", "#fde047", "#64748b"];

const ArcWaves = React.memo(({ size = 110, duration = 0.19 }) => (
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
));

const Intro = ({ onDone }) => {
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    // Just show spinner for 2 seconds, then complete
    const timer = setTimeout(() => {
      setIsSpinning(false);
      // Small delay to ensure smooth transition
      setTimeout(() => {
        onDone?.();
      }, 100);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {isSpinning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "rgba(18, 22, 28, 0.94)",
            willChange: "opacity",
          }}
        >
          <ArcWaves size={110} duration={0.19} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Intro);