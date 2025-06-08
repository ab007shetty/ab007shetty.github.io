import React, { useRef, useEffect, useState } from "react";

const SNOWFLAKE_COUNT = 90;
const FLOOR_INITIAL_HEIGHT = 90;
const WAVE_AMPLITUDE = 22;
const WAVE_FREQUENCY = 1.5;
const ACCUM_RADIUS = 8; // px

function smoothSurface(surface, passes = 2) {
  // Simple smoothing by averaging with neighbors
  for (let p = 0; p < passes; ++p) {
    const tmp = surface.slice();
    for (let i = 1; i < surface.length - 1; ++i) {
      tmp[i] = (surface[i - 1] + surface[i] + surface[i + 1]) / 3;
    }
    for (let i = 1; i < surface.length - 1; ++i) surface[i] = tmp[i];
  }
}

const IcyThemeBackground = () => {
  const canvasRef = useRef();
  const [surfaceArr, setSurfaceArr] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Snow surface: y value for each x
    let surface = [];
    let baseline = height - FLOOR_INITIAL_HEIGHT;
    let wavePhase = 0;

    function initSurface() {
      surface = [];
      wavePhase = Date.now() / 9000;
      for (let x = 0; x < width; x++) {
        surface[x] =
          baseline +
          Math.sin((x / width) * WAVE_FREQUENCY * Math.PI * 2 + wavePhase) *
            WAVE_AMPLITUDE;
      }
      setSurfaceArr(surface.slice());
    }

    let snowflakes = Array.from({ length: SNOWFLAKE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r: Math.random() * 2.5 + 1.2,
      d: Math.random() * 1.2 + 0.7,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      baseline = height - FLOOR_INITIAL_HEIGHT;
      initSurface();
      snowflakes = Array.from({ length: SNOWFLAKE_COUNT }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        r: Math.random() * 2.5 + 1.2,
        d: Math.random() * 1.2 + 0.7,
        opacity: Math.random() * 0.7 + 0.2,
      }));
    }

    function drawGradient() {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#b6e1fc");
      gradient.addColorStop(0.45, "#e0f7fa");
      gradient.addColorStop(1, "#203a43");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Mountain is a distant, low, wide shape
    function drawMountain() {
      ctx.save();
      ctx.beginPath();
      const baseY = Math.min(...surface) - 120;
      ctx.moveTo(0, baseY + 40);
      ctx.bezierCurveTo(
        width * 0.2, baseY - 30,
        width * 0.4, baseY - 10,
        width * 0.7, baseY - 40
      );
      ctx.bezierCurveTo(
        width * 0.9, baseY - 70,
        width * 1.0, baseY + 60,
        width, baseY + 20
      );
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.globalAlpha = 0.46;
      ctx.filter = "blur(2.2px)";
      const grad = ctx.createLinearGradient(0, baseY - 70, 0, height);
      grad.addColorStop(0, "#e0f7fa");
      grad.addColorStop(0.4, "#b6e1fc");
      grad.addColorStop(1, "#7ca2cd");
      ctx.fillStyle = grad;
      ctx.shadowColor = "#b6e1fc";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.filter = "none";
      ctx.restore();
    }

    function drawFloor() {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, surface[0]);
      for (let x = 1; x < width; x++) {
        ctx.lineTo(x, surface[x]);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.globalAlpha = 0.97;
      ctx.fillStyle = "#f8fbff";
      ctx.shadowColor = "#e9f6ff";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawSnowflakes() {
      ctx.save();
      for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.globalAlpha = f.opacity;
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
      ctx.restore();
    }

    function updateSnowflakes() {
      let changed = false;
      for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        f.y += f.d;
        f.x += Math.sin(f.y * 0.008) * 0.3;

        // Clamp x for array bounds
        const sx = Math.max(ACCUM_RADIUS, Math.min(width - ACCUM_RADIUS - 1, Math.floor(f.x)));
        // Floor at this x
        const floorAtX = surface[sx] ?? (height - FLOOR_INITIAL_HEIGHT);

        if (f.y + f.r >= floorAtX) {
          changed = true;
          // Accumulate snow locally with a gaussian-like spread
          for (let dx = -ACCUM_RADIUS; dx <= ACCUM_RADIUS; dx++) {
            const idx = sx + dx;
            if (idx >= 0 && idx < width) {
              // Gaussian falloff for smoothness
              const falloff = Math.exp(-(dx * dx) / (2 * ACCUM_RADIUS));
              surface[idx] -= f.r * falloff * 1.2;
            }
          }
          // Respawn snowflake at top
          snowflakes[i] = {
            ...f,
            x: Math.random() * width,
            y: -5,
            r: Math.random() * 2.5 + 1.2,
            d: Math.random() * 1.2 + 0.7,
            opacity: Math.random() * 0.7 + 0.2,
          };
        }
      }
      if (changed) {
        smoothSurface(surface, 4);
        setSurfaceArr(surface.slice());
      }
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawGradient();
      drawMountain();
      drawFloor();
      drawSnowflakes();
      updateSnowflakes();
      animationId = requestAnimationFrame(animate);
    }

    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    }

    resizeCanvas();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default IcyThemeBackground;