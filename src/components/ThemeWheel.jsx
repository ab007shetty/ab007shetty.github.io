import React, { useState, useRef, useEffect } from "react";
import { FaSnowflake, FaFire, FaMoon } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

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

export default function ThemeWheel({
  customCursor,
  setCustomCursor,
  introSpinning = false,
  disableCursorToggle = false,
}) {
  const { theme, setTheme } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [spinning, setSpinning] = useState(!introSpinning);
  const rafRef = useRef();
  const lastTimestamp = useRef(Date.now());
  const introStart = useRef(null);

  // Spinner logic with accelerating spin in intro
  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      const now = Date.now();
      let increment = 0.05 * (now - lastTimestamp.current);
      if (introSpinning) {
        if (!introStart.current) introStart.current = now;
        const elapsed = (now - introStart.current) / 1000;
        let speedFactor = Math.min(1 + elapsed * 7, 18);
        increment *= speedFactor;
      }
      setRotation((r) => r + increment);
      lastTimestamp.current = now;
      rafRef.current = requestAnimationFrame(animate);
    }
    if ((spinning || introSpinning) && !snapping) {
      lastTimestamp.current = Date.now();
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spinning, snapping, introSpinning]);

  useEffect(() => {
    if (!introSpinning) setSpinning(true);
    else setSpinning(false);
  }, [introSpinning]);

  // Snap to arm on click
  function handleSelectArm(idx) {
    if (snapping || introSpinning) return;
    setSnapping(true);
    const armAngles = themeOrder.map(
      (_, i) => (i * 120 + (rotation % 360) + 360) % 360
    );
    const currentAngle = armAngles[idx];
    let delta;
    if (currentAngle <= 180) {
      delta = -currentAngle;
    } else {
      delta = 360 - currentAngle;
    }
    setRotation((r) => r + delta);
    setTimeout(() => {
      setTheme(themeOrder[idx]);
      setSnapping(false);
    }, 400);
  }

  // Responsive size
  // Default: 180px; Mobile: 75px
  const [size, setSize] = useState(180);
  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth <= 750 ? 75 : 180);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SIZE = size;
  const CENTER = SIZE / 2;
  const ARM_RADIUS = SIZE * 0.34;
  const ARM_CIRCLE_RADIUS = SIZE * 0.15;
  const ARM_BTN_SIZE = SIZE * 0.22;
  const CENTER_RADIUS = SIZE * 0.16;
  const BEARING_RADIUS = SIZE * 0.083;

  const arms = themeOrder.map((t, idx) => {
    const angle = idx * 120 - 90; // Top arm at -90deg
    const rad = (angle * Math.PI) / 180;
    const cx = CENTER + ARM_RADIUS * Math.cos(rad);
    const cy = CENTER + ARM_RADIUS * Math.sin(rad);
    return { t, cx, cy, idx, angle, rad };
  });

  const AB_LOGO_GRADIENT = customCursor
    ? "radial-gradient(circle, #22c55e 60%, #15803d 100%)"
    : "radial-gradient(circle, #ed1c24 60%, #a60b0f 100%)";

  function handleLogoClick(e) {
    e.stopPropagation();
    if (!disableCursorToggle && setCustomCursor) setCustomCursor((v) => !v);
  }

  const getArmHighlight = (t) =>
    theme === t
      ? {
          boxShadow: `0 0 14px 4px ${themeColors[t]}bb, 0 0 0 3px ${themeColors[t]}44`,
          border: `3px solid ${themeColors[t]}`,
          background: "#fff",
          transform: "scale(1.08)",
          zIndex: 5,
        }
      : {
          boxShadow: `0 0 7px 0 ${themeColors[t]}33`,
          border: `2px solid ${themeColors[t]}`,
          background: "#f1f5f9cc",
        };

  function SpinnerArm({ t, idx, rad }) {
    const armLen = ARM_RADIUS - CENTER_RADIUS + 4;
    const motifX = CENTER + (armLen / 2) * Math.cos(rad);
    const motifY = CENTER + (armLen / 2) * Math.sin(rad);

    let motif = null;
    if (t === "icy") {
      motif = (
        <g>
          <g
            transform={`translate(${motifX},${motifY}) scale(${size <= 75 ? 0.42 : 0.65})`}
            opacity="0.7"
          >
            <g stroke="#e0fcff" strokeWidth="1.6" strokeLinecap="round">
              <line x1="0" y1="-7" x2="0" y2="7" />
              <line x1="-7" y1="0" x2="7" y2="0" />
              <line x1="-5" y1="-5" x2="5" y2="5" />
              <line x1="5" y1="-5" x2="-5" y2="5" />
            </g>
          </g>
        </g>
      );
    } else if (t === "hot") {
      motif = (
        <g>
          <circle
            cx={motifX}
            cy={motifY}
            r={size <= 75 ? 3 : 7}
            fill="url(#hotArmGrad)"
            stroke="#ffe047"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      );
    } else if (t === "dark") {
      motif = (
        <g>
          <path
            d={`
              M ${motifX - (size <= 75 ? 3.5 : 7)} ${motifY}
              a ${size <= 75 ? 3.5 : 7} ${size <= 75 ? 3.5 : 7} 0 1 0 ${size <= 75 ? 7 : 14} 0
              a ${size <= 75 ? 2.5 : 5} ${size <= 75 ? 3.5 : 7} 0 1 1 -${size <= 75 ? 7 : 14} 0
            `}
            fill="#fff"
            opacity="0.22"
          />
        </g>
      );
    }

    return (
      <g>
        <defs>
          <linearGradient id="armGradicy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c0f7ff" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <linearGradient id="armGradhot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff799" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="armGraddark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#23272e" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <path
          d={`
            M ${CENTER + (CENTER_RADIUS - 7) * Math.cos(rad)} ${CENTER + (CENTER_RADIUS - 7) * Math.sin(rad)}
            Q ${CENTER + (armLen / 2) * Math.cos(rad) + 10 * Math.cos(rad - Math.PI / 2)} ${CENTER + (armLen / 2) * Math.sin(rad) + 10 * Math.sin(rad - Math.PI / 2)}
              ${CENTER + (armLen) * Math.cos(rad)} ${CENTER + (armLen) * Math.sin(rad)}
            Q ${CENTER + (armLen / 2) * Math.cos(rad) - 10 * Math.cos(rad - Math.PI / 2)} ${CENTER + (armLen / 2) * Math.sin(rad) - 10 * Math.sin(rad - Math.PI / 2)}
              ${CENTER + (CENTER_RADIUS - 7) * Math.cos(rad)} ${CENTER + (CENTER_RADIUS - 7) * Math.sin(rad)}
            Z
          `}
          fill={
            t === "icy"
              ? "url(#armGradicy)"
              : t === "hot"
              ? "url(#armGradhot)"
              : "url(#armGraddark)"
          }
          stroke="#222"
          strokeWidth={size <= 75 ? 1 : 2}
          style={{ filter: "drop-shadow(0 0 6px #2224)" }}
        />
        {motif}
      </g>
    );
  }

  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        minWidth: 60,
        minHeight: 60,
        userSelect: "none",
        position: "relative",
      }}
      className="themewheel-responsive"
      onMouseEnter={() => !introSpinning && setSpinning(false)}
      onMouseLeave={() => !introSpinning && setSpinning(true)}
    >
      {/* Fidget spinner body w/ thick themed arms */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 1,
          transform: `rotate(${rotation}deg)`,
          transition: snapping
            ? "transform 0.45s cubic-bezier(.12,.94,.51,1.21)"
            : "none",
        }}
      >
        {/* Themed thick arms */}
        {arms.map(({ t, idx, rad }) => (
          <SpinnerArm key={t} t={t} idx={idx} rad={rad} />
        ))}
        {/* End circles for spinner arms */}
        {arms.map(({ cx, cy, t }, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={ARM_CIRCLE_RADIUS}
            fill={themeColors[t]}
            stroke="#222"
            strokeWidth={size <= 75 ? 1.5 : 3}
            style={{ filter: "drop-shadow(0 0 4px #2226)" }}
          />
        ))}
        {/* Bearings (black rings) inside each arm */}
        {arms.map(({ cx, cy }, i) => (
          <circle
            key={i + "bearing"}
            cx={cx}
            cy={cy}
            r={ARM_CIRCLE_RADIUS - (size <= 75 ? 4.5 : 8)}
            fill="#111"
            stroke="#333"
            strokeWidth={size <= 75 ? 0.8 : 2}
          />
        ))}
        {/* Bearings holes (white) */}
        {arms.map(({ cx, cy }, i) => (
          <circle
            key={i + "hole"}
            cx={cx}
            cy={cy}
            r={ARM_CIRCLE_RADIUS - (size <= 75 ? 8.5 : 15)}
            fill="#fff"
          />
        ))}
        {/* Center core */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CENTER_RADIUS}
          fill="#e53935"
          stroke="#b71c1c"
          strokeWidth={size <= 75 ? 2 : 4}
        />
        {/* Center "bearing" accent */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={BEARING_RADIUS}
          fill="#d32f2f"
          stroke="#900"
          strokeWidth={size <= 75 ? 1.1 : 2}
        />
      </svg>
      {/* Theme icons as buttons */}
      <div
        style={{
          width: SIZE,
          height: SIZE,
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "auto",
          zIndex: 3,
          willChange: "transform",
          transform: `rotate(${rotation}deg)`,
          transition: snapping
            ? "transform 0.45s cubic-bezier(.12,.94,.51,1.21)"
            : "none",
        }}
      >
        {arms.map(({ t, cx, cy, idx }) => (
          <button
            key={t}
            aria-label={t}
            style={{
              position: "absolute",
              left: cx - ARM_BTN_SIZE / 2,
              top: cy - ARM_BTN_SIZE / 2,
              width: ARM_BTN_SIZE,
              height: ARM_BTN_SIZE,
              fontSize: ARM_BTN_SIZE * 0.82,
              color: themeColors[t],
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: theme === t || introSpinning ? "default" : "pointer",
              outline: "none",
              ...getArmHighlight(t),
              pointerEvents: introSpinning ? "none" : "auto",
              background: theme === t ? "#fff" : "#f8fafc",
            }}
            tabIndex={theme === t || introSpinning ? -1 : 0}
            disabled={theme === t || introSpinning}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectArm(idx);
            }}
          >
            {themeIcons[t]}
          </button>
        ))}
      </div>
      {/* Center "AB" logo, toggle cursor */}
      <button
        aria-label="Toggle Cursor"
        title="Toggle custom cursor"
        onClick={handleLogoClick}
        style={{
          position: "absolute",
          left: CENTER - (size <= 75 ? 15 : 22),
          top: CENTER - (size <= 75 ? 15 : 22),
          width: size <= 75 ? 30 : 44,
          height: size <= 75 ? 30 : 44,
          fontWeight: 900,
          fontSize: size <= 75 ? 14 : 22,
          letterSpacing: "-0.06em",
          color: "#fff",
          background: AB_LOGO_GRADIENT,
          border: customCursor ? "2.5px solid #fff" : "2.5px solid #666",
          boxShadow: customCursor
            ? "0 0 12px #22c55e88, 0 2px 10px #15803d44"
            : "0 0 12px #ed1c2477, 0 2px 10px #ab0e0e44",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          cursor: disableCursorToggle ? "not-allowed" : "pointer",
          transition:
            "box-shadow .25s, border .25s, background .25s, color .25s",
          fontFamily:
            "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
          textShadow: customCursor
            ? "0 2px 8px #22c55e88, 0 1px 4px #fff9"
            : "0 2px 8px #ed1c2488, 0 1px 4px #fff9",
          outline: "none",
          userSelect: "none",
        }}
      >
        AB
      </button>
      <style>
        {`
        @media (max-width: 750px) {
          .themewheel-responsive {
            width: 75px !important;
            height: 75px !important;
            min-width: 60px !important;
            min-height: 60px !important;
          }
        }
        `}
      </style>
    </div>
  );
}