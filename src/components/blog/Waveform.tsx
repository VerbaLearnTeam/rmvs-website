"use client";

import { useEffect, useRef } from "react";

interface WaveformProps {
  progress: number;
  onClick?: (pct: number) => void;
}

export default function Waveform({ progress, onClick }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barsRef = useRef<number[]>([]);

  useEffect(() => {
    barsRef.current = Array.from({ length: 80 }, () => 0.15 + Math.random() * 0.85);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const bars = barsRef.current;
    const barW = w / bars.length;
    const gap = 2;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < bars.length; i++) {
      const barH = bars[i] * h * 0.8;
      const x = i * barW;
      const y = (h - barH) / 2;
      const pct = (i / bars.length) * 100;

      ctx.fillStyle =
        pct <= progress
          ? "rgba(34, 211, 238, 0.7)"
          : "rgba(136, 160, 185, 0.2)";
      ctx.fillRect(x + gap / 2, y, barW - gap, barH);
    }
  }, [progress]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    onClick(pct);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full cursor-pointer"
      style={{ height: 48 }}
      aria-hidden="true"
    />
  );
}
