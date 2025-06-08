import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

function useCursorPos() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return pos;
}

function SnowballCursor() {
  const pos = useCursorPos();
  return (
    <>
      <div
        style={{
          left: pos.x - 18,
          top: pos.y - 18,
          pointerEvents: "none",
        }}
        className="fixed z-[10000] w-9 h-9 rounded-full bg-white/90 shadow-lg blur-[1px] border-[2.5px] border-cyan-100/90"
      />
      <div
        style={{
          left: pos.x - 10,
          top: pos.y - 10,
          pointerEvents: "none",
        }}
        className="fixed z-[10001] w-5 h-5 rounded-full bg-white border-[1.5px] border-cyan-100 shadow"
      />
    </>
  );
}

function SunCursor() {
  const pos = useCursorPos();
  return (
    <>
      <div
        style={{
          left: pos.x - 18,
          top: pos.y - 18,
          pointerEvents: "none",
        }}
        className="fixed z-[10000] w-9 h-9 rounded-full bg-yellow-300 opacity-90 shadow-2xl blur-[1.5px] border-[2.5px] border-yellow-500"
      />
      <div
        style={{
          left: pos.x - 8,
          top: pos.y - 8,
          pointerEvents: "none",
        }}
        className="fixed z-[10001] w-4 h-4 rounded-full bg-yellow-400 border-[1.5px] border-yellow-500 shadow"
      />
    </>
  );
}

function MoonCursor() {
  const pos = useCursorPos();
  return (
    <>
      <div
        style={{
          left: pos.x - 18,
          top: pos.y - 18,
          pointerEvents: "none",
        }}
        className="fixed z-[10000] w-9 h-9 rounded-full bg-blue-200/80 shadow-2xl blur-[2px] border-[2px] border-blue-300"
      />
      <div
        style={{
          left: pos.x - 8,
          top: pos.y - 8,
          pointerEvents: "none",
        }}
        className="fixed z-[10001] w-4 h-4 rounded-full bg-white border-[1px] border-blue-200 shadow"
      />
    </>
  );
}

const ThemeCursors = () => {
  const { theme } = useTheme();
  if (theme === "hot") return <SunCursor />;
  if (theme === "dark") return <MoonCursor />;
  return <SnowballCursor />;
};

export default ThemeCursors;