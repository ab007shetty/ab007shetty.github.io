import React from "react";

// Sun with animated rays, top right
const HotThemeBackground = ({ visible = true }) => (
  <div
    className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
    aria-hidden="true"
    style={{
      background: "linear-gradient(180deg, #ffe680 0%, #ffb347 60%, #ff8960 100%)",
      transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
    }}
  >
    {/* Sun and rays */}
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* Rays */}
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x="205"
          y="20"
          width="10"
          height="70"
          rx="5"
          fill="#ffe680"
          opacity="0.85"
          style={{
            transform: `rotate(${i * 30}deg)`,
            transformOrigin: "210px 210px",
            animation: "sunray-rotate 5s linear infinite",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
      {/* Sun core */}
      <circle
        cx="210"
        cy="210"
        r="70"
        fill="#fffde1"
        filter="url(#sunblur)"
      />
      <circle
        cx="210"
        cy="210"
        r="64"
        fill="#ffe36e"
      />
      <defs>
        <filter id="sunblur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
    </svg>
    {/* Sun ray animation */}
    <style>
      {`
      @keyframes sunray-rotate {
        0% { opacity: 0.85; }
        50% { opacity: 0.4; }
        100% { opacity: 0.85; }
      }
      `}
    </style>
    {/* Optional: Ground heatwave effect */}
    <svg
      width="100%"
      height="180"
      viewBox="0 0 1920 180"
      fill="none"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    >
      <defs>
        <linearGradient id="heatwave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff6b0" />
          <stop offset="80%" stopColor="#ffcd82" />
          <stop offset="100%" stopColor="#ffb347" />
        </linearGradient>
      </defs>
      <path
        d="
          M0,100
          Q480,160 960,120
          Q1440,80 1920,130
          L1920,180 L0,180 Z
        "
        fill="url(#heatwave)"
        opacity="1"
      />
    </svg>
  </div>
);

export default HotThemeBackground;