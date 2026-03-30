"use client";

import { useEffect, useRef } from "react";

interface Ribbon {
  yBase: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  color: string;
  opacity: number;
  width: number;
  freq2: number;
  amp2: number;
}

interface GlowSpot {
  x: number;
  y: number;
  radius: number;
  color: string;
  baseOpacity: number;
  pulseSpeed: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  pulseSpeed: number;
  phase: number;
}

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    window.addEventListener("resize", debouncedResize);

    const cyanColors = [
      "rgb(6, 182, 212)",
      "rgb(34, 211, 238)",
      "rgb(8, 145, 178)",
      "rgb(14, 116, 144)",
      "rgb(22, 189, 220)",
    ];

    const ribbons: Ribbon[] = [
      { yBase: 0.2, amplitude: 80, wavelength: 900, speed: 0.0003, phase: 0, color: cyanColors[0], opacity: 0.05, width: 260, freq2: 0.0015, amp2: 30 },
      { yBase: 0.35, amplitude: 100, wavelength: 750, speed: 0.00025, phase: 1.2, color: cyanColors[1], opacity: 0.04, width: 220, freq2: 0.002, amp2: 40 },
      { yBase: 0.5, amplitude: 60, wavelength: 1100, speed: 0.0004, phase: 2.5, color: cyanColors[2], opacity: 0.06, width: 280, freq2: 0.0012, amp2: 25 },
      { yBase: 0.65, amplitude: 120, wavelength: 800, speed: 0.00035, phase: 3.8, color: cyanColors[3], opacity: 0.035, width: 240, freq2: 0.0018, amp2: 35 },
      { yBase: 0.8, amplitude: 50, wavelength: 1000, speed: 0.0002, phase: 5.1, color: cyanColors[4], opacity: 0.07, width: 200, freq2: 0.0025, amp2: 20 },
    ];

    const glowSpots: GlowSpot[] = [
      { x: 0.15, y: 0.2, radius: 350, color: cyanColors[0], baseOpacity: 0.02, pulseSpeed: 0.0008, phase: 0 },
      { x: 0.5, y: 0.4, radius: 400, color: cyanColors[1], baseOpacity: 0.025, pulseSpeed: 0.0006, phase: 1.5 },
      { x: 0.8, y: 0.25, radius: 300, color: cyanColors[2], baseOpacity: 0.02, pulseSpeed: 0.001, phase: 3.0 },
      { x: 0.3, y: 0.7, radius: 280, color: cyanColors[3], baseOpacity: 0.015, pulseSpeed: 0.0007, phase: 4.2 },
      { x: 0.7, y: 0.75, radius: 320, color: cyanColors[4], baseOpacity: 0.03, pulseSpeed: 0.0009, phase: 5.5 },
    ];

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.3 + Math.random() * 1.2,
      opacity: 0.1 + Math.random() * 0.2,
      speed: 0.0001 + Math.random() * 0.0003,
      wobbleSpeed: 0.001 + Math.random() * 0.002,
      wobbleAmp: 0.002 + Math.random() * 0.005,
      pulseSpeed: 0.002 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const draw = () => {
      if (document.hidden || reducedMotion.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      time++;
      ctx.clearRect(0, 0, w, h);

      for (const spot of glowSpots) {
        const pulse = Math.sin(time * spot.pulseSpeed + spot.phase) * 0.5 + 0.5;
        const opacity = spot.baseOpacity * (0.6 + pulse * 0.4);
        const grad = ctx.createRadialGradient(
          spot.x * w, spot.y * h, 0,
          spot.x * w, spot.y * h, spot.radius
        );
        grad.addColorStop(0, spot.color.replace("rgb", "rgba").replace(")", `, ${opacity})`));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(spot.x * w - spot.radius, spot.y * h - spot.radius, spot.radius * 2, spot.radius * 2);
      }

      for (const r of ribbons) {
        const yCenter = r.yBase * h;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y1 = Math.sin((x / r.wavelength) * Math.PI * 2 + time * r.speed + r.phase) * r.amplitude;
          const y2 = Math.sin((x * r.freq2) + time * r.speed * 1.3 + r.phase + 1) * r.amp2;
          const y = yCenter + y1 + y2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const grad = ctx.createLinearGradient(0, yCenter - r.width / 2, 0, yCenter + r.width / 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, r.color.replace("rgb", "rgba").replace(")", `, ${r.opacity})`));
        grad.addColorStop(0.5, r.color.replace("rgb", "rgba").replace(")", `, ${r.opacity * 1.2})`));
        grad.addColorStop(0.7, r.color.replace("rgb", "rgba").replace(")", `, ${r.opacity})`));
        grad.addColorStop(1, "transparent");

        ctx.strokeStyle = grad;
        ctx.lineWidth = r.width;
        ctx.stroke();
      }

      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(time * p.wobbleSpeed + p.phase) * p.wobbleAmp * 0.01;

        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }

        const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.5 + 0.5;
        const opacity = p.opacity * (0.5 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
      mq.removeEventListener("change", handler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    />
  );
}
