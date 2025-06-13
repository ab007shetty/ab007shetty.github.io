import React, { useState, useEffect } from "react";
import { FaSnowflake, FaFire, FaMoon } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

// Helper: arc path only (not sector), for smooth edges
function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  // Convert angles to radians
  const startRad = (Math.PI / 180) * startAngle;
  const endRad = (Math.PI / 180) * endAngle;
  // Outer arc start/end
  const x1 = cx + rOuter * Math.cos(startRad);
  const y1 = cy + rOuter * Math.sin(startRad);
  const x2 = cx + rOuter * Math.cos(endRad);
  const y2 = cy + rOuter * Math.sin(endRad);
  // Inner arc start/end (reverse direction)
  const x3 = cx + rInner * Math.cos(endRad);
  const y3 = cy + rInner * Math.sin(endRad);
  const x4 = cx + rInner * Math.cos(startRad);
  const y4 = cy + rInner * Math.sin(startRad);

  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M", x1, y1,
    "A", rOuter, rOuter, 0, largeArc, 1, x2, y2,
    "L", x3, y3,
    "A", rInner, rInner, 0, largeArc, 0, x4, y4,
    "Z"
  ].join(" ");
}

const themeOrder = ["icy", "hot", "dark"];
const themeColors = {
  icy: "#67e8f9",
  hot: "#fde047",
  dark: "#64748b",
};
const themeIcons = {
  icy: <FaSnowflake />,
  hot: <FaFire />,
  dark: <FaMoon />,
};

export default function ThemeWheelArc({
  customCursor,
  setCustomCursor,
  introSpinning = false,
  disableCursorToggle = false,
}) {
  const { theme, setTheme } = useTheme();

  // Responsive size
  const [size, setSize] = useState(window.innerWidth <= 750 ? 90 : 180);
  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth <= 750 ? 90 : 180);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CENTER = size / 2;
  const OUTER_RADIUS = size * 0.44;
  const ARC_THICKNESS = size * 0.17;
  const INNER_RADIUS = OUTER_RADIUS - ARC_THICKNESS;
  const angles = [0, 120, 240];

  const AB_LOGO_GRADIENT = customCursor
    ? "radial-gradient(circle, #22c55e 0%, #16a34a 100%)"
    : "radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)";

  const centerBg =
    theme === "icy"
      ? "radial-gradient(circle at 60% 40%, #e0faff 65%, #67e8f9 100%)"
      : theme === "hot"
      ? "radial-gradient(circle at 40% 60%, #fffbe5 60%, #fde047 100%)"
      : "radial-gradient(circle at 30% 70%, #f1f5f9 60%, #64748b 100%)";

  // Border for center button: green if customCursor is ON, else theme color.
  const centerBorderColor = customCursor ? "#22c55e" : themeColors[theme];

  return (
    <div style={{width:size, height:size, position:"relative", margin:8, userSelect:"none"}}>
      <svg width={size} height={size} style={{position:"absolute",left:0,top:0,zIndex:1}}>
        {themeOrder.map((t, i) => {
          // Each arc is 120deg, with a small gap (3deg) between arcs for smoothness
          const gap = 3;
          const angleStart = angles[i] - 60 + gap / 2;
          const angleEnd = angles[i] + 60 - gap / 2;
          const path = describeArc(
            CENTER, CENTER, OUTER_RADIUS, INNER_RADIUS,
            angleStart, angleEnd
          );
          // Thicker, crisp outline for arc (on top of main arc)
          return (
            <g key={t}>
              <path
                d={path}
                fill={theme === t ? themeColors[t] : "#f8fafc"}
                stroke={themeColors[t]}
                strokeWidth={size * 0.013}
                style={{
                  // No glow, just crisp color
                  transition: "all 0.23s cubic-bezier(.1,1.3,.7,1.1)",
                  cursor: theme === t ? "default" : "pointer"
                }}
                onClick={() => setTheme(t)}
              />
              {/* Crisp, thicker border for arc edge */}
              <path
                d={path}
                fill="none"
                stroke={themeColors[t]}
                strokeWidth={size * 0.027}
                style={{
                  opacity: 0.8,
                  pointerEvents: "none"
                }}
              />
            </g>
          );
        })}
      </svg>
      {/* Center icon of selected with theme color background and custom cursor toggle */}
      <button
        aria-label="Toggle custom cursor"
        title={customCursor ? "Disable custom cursor" : "Enable custom cursor"}
        onClick={e => {
          e.stopPropagation();
          if (!disableCursorToggle && setCustomCursor) setCustomCursor(v => !v);
        }}
        style={{
          position: "absolute",
          left: CENTER - size*0.17,
          top: CENTER - size*0.17,
          width: size*0.34,
          height: size*0.34,
          borderRadius: "50%",
          border: `3.5px solid ${centerBorderColor}`,
          background: centerBg,
          color: themeColors[theme],
          fontWeight: 900,
          fontSize: size*0.18,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          boxShadow: customCursor
            ? "0 0 12px #22c55e88, 0 2px 10px #15803d44"
            : `0 0 12px ${themeColors[theme]}44`,
          zIndex: 2,
          outline: "none",
          cursor: disableCursorToggle ? "not-allowed" : "pointer",
          userSelect: "none",
          transition: "all 0.22s cubic-bezier(.22,1.2,.6,1.2)"
        }}
        disabled={disableCursorToggle}
      >
        {themeIcons[theme]}
      </button>
      <style>
        {`
        @media (max-width: 750px) {
          .themewheel-responsive {
            width: 90px !important;
            height: 90px !important;
            min-width: 60px !important;
            min-height: 60px !important;
          }
        }
        `}
      </style>
    </div>
  );
}