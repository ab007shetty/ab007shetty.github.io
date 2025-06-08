import React, { useRef, useEffect, useState } from "react";

// --- Starfield generator ---
function drawStars(ctx, width, height, starCount = 80) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7;
    const r = Math.random() * 1.3 + 0.3;
    const opacity = Math.random() * 0.6 + 0.25;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#fff";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

// --- Moon SVG ---
function MoonSVG({ style }) {
  return (
    <svg width="180" height="180" style={style} viewBox="0 0 180 180" fill="none">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7f9fa" stopOpacity="1" />
          <stop offset="55%" stopColor="#e3eaf4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b7c2d8" stopOpacity="0.2" />
        </radialGradient>
        <filter id="moonblur" x="-20" y="-20" width="220" height="220">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <circle cx="90" cy="70" r="66" fill="url(#moonGlow)" filter="url(#moonblur)" />
      <circle cx="90" cy="70" r="58" fill="#f9fafc" stroke="#e3eaf4" strokeWidth="2" />
      <ellipse cx="110" cy="65" rx="10" ry="4.5" fill="#e6e8ed" opacity="0.18"/>
      <ellipse cx="70" cy="82" rx="5.5" ry="2.5" fill="#e6e8ed" opacity="0.11"/>
      <ellipse cx="105" cy="85" rx="3.5" ry="1.1" fill="#e6e8ed" opacity="0.12"/>
      <ellipse cx="80" cy="62" rx="2.8" ry="1.3" fill="#c8cdd8" opacity="0.09"/>
      <ellipse cx="95" cy="60" rx="1.7" ry="1.2" fill="#b0bed7" opacity="0.12"/>
    </svg>
  );
}

// --- Moon Ray ---
function MoonRay() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "58%",
        width: "120vw",
        height: "140px",
        background:
          "linear-gradient(94deg, rgba(200,220,255,0.12) 0%, rgba(255,255,255,0.24) 58%, rgba(200,220,255,0.10) 100%)",
        filter: "blur(22px)",
        borderRadius: "70px",
        transform: "translate(-50%, -50%) rotate(-13deg)",
        zIndex: 3,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}

// --- Mountain Silhouette (surface) ---
function MountainSilhouette({ width = 1920, height = 120 }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    >
      <defs>
        <linearGradient id="moonEdge" x1="0" y1="0" x2="0" y2={height}>
          <stop offset="0%" stopColor="#bcc6e0" stopOpacity="0.26" />
          <stop offset="40%" stopColor="#101a2a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#101a2a" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path
        d={`
          M0,90
          Q420,10 810,70
          Q1200,110 1920,44
          L${width},${height} L0,${height} Z
        `}
        fill="url(#moonEdge)"
      />
    </svg>
  );
}

// --- Comets: always from top, long visible tail, sharp small head ---
const COMET_COUNT = 3;
function randomCometConfig() {
  const length = Math.random() * 60 + 90;
  const thickness = Math.random() * 0.6 + 1.1;
  const headRadius = thickness * 1.7;
  const speed = Math.random() * 0.025 + 0.035;
  const startX = Math.random() * window.innerWidth * 0.99;
  const startY = Math.random() * 8 + 1;
  const opacity = Math.random() * 0.09 + 0.70;
  return {
    x: startX,
    y: startY,
    length,
    thickness,
    headRadius,
    speed,
    opacity,
  };
}

function useCometStreaks() {
  const [comets, setComets] = useState(() =>
    Array.from({ length: COMET_COUNT }, randomCometConfig)
  );
  useEffect(() => {
    let running = true;
    let lastTime = performance.now();
    function animate(now) {
      const dt = now - lastTime;
      lastTime = now;
      setComets(current =>
        current.map((comet) => {
          const delta = comet.speed * dt;
          let newX = comet.x + delta;
          let newY = comet.y + delta;
          if (
            newX > window.innerWidth + 30 ||
            newY > window.innerHeight * 0.34 + 30
          ) {
            return randomCometConfig();
          }
          return { ...comet, x: newX, y: newY };
        })
      );
      if (running) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { running = false; };
  }, []);
  return comets;
}

function CometStreaks() {
  const comets = useCometStreaks();
  return (
    <>
      {comets.map((c, i) => {
        const dx = c.length * Math.cos(Math.PI / 4);
        const dy = c.length * Math.sin(Math.PI / 4);
        const x1 = 0, y1 = c.headRadius;
        const x2 = dx, y2 = dy + c.headRadius;

        return (
          <svg
            key={i}
            style={{
              position: "fixed",
              left: c.x,
              top: c.y,
              zIndex: 14,
              pointerEvents: "none",
              opacity: c.opacity,
              transition: "none",
            }}
            width={dx + c.headRadius * 2.2}
            height={dy + c.headRadius * 2.2}
          >
            <defs>
              <linearGradient id={`comet-tail-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#95e5ff" stopOpacity="0.01" />
                <stop offset="35%" stopColor="#bdf2ff" stopOpacity="0.30" />
                <stop offset="80%" stopColor="#e9f7ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e9f7ff" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={`comet-head-${i}`} cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="35%" stopColor="#b6e9ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#bdf2ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#comet-tail-${i})`}
              strokeWidth={c.thickness}
              strokeLinecap="round"
              style={{
                filter: "blur(0.3px) drop-shadow(0 0 5px #bdf2ff88)"
              }}
            />
            <circle
              cx={x2}
              cy={y2}
              r={c.headRadius}
              fill={`url(#comet-head-${i})`}
              style={{
                filter: "blur(0.3px) drop-shadow(0 0 10px #fff)"
              }}
            />
          </svg>
        );
      })}
    </>
  );
}

const DarkThemeBackground = () => {
  const canvasRef = useRef(null);

  // Always fit canvas to viewport, redraw stars on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resizeAndDraw() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      drawStars(ctx, canvas.width, canvas.height);
    }
    resizeAndDraw();
    window.addEventListener("resize", resizeAndDraw);
    return () => window.removeEventListener("resize", resizeAndDraw);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 70% 16%, #2a375a 0px, #101a2a 90%, #070e1e 100%)",
        transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      {/* Star field */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Moon */}
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 50,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <MoonSVG />
      </div>
      <MoonRay />
      <MountainSilhouette />
      <CometStreaks />
    </div>
  );
};

export default DarkThemeBackground;