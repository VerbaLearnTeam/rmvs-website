"use client";

import { useEffect, useRef } from "react";
import { locations } from "@/data/locations";

function latLngToXYZ(lat: number, lng: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

export default function GlobeDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = 360;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 40;
    let rotation = 0;

    const wireframePoints: { x: number; y: number; z: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = -180; lng < 180; lng += 10) {
        wireframePoints.push(latLngToXYZ(lat, lng, radius));
      }
    }
    for (let lng = -180; lng < 180; lng += 30) {
      for (let lat = -80; lat <= 80; lat += 5) {
        wireframePoints.push(latLngToXYZ(lat, lng, radius));
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      if (!prefersReduced) rotation += 0.003;

      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);

      for (const p of wireframePoints) {
        const rx = p.x * cosR - p.z * sinR;
        const rz = p.x * sinR + p.z * cosR;
        if (rz < -radius * 0.15) continue;

        const scale = (rz + radius) / (2 * radius);
        const sx = cx + rx;
        const sy = cy - p.y;
        const dotSize = 0.6 + scale * 0.6;
        const opacity = 0.05 + scale * 0.12;

        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
        ctx.fill();
      }

      const projected: { sx: number; sy: number; brightness: number; loc: typeof locations[0] }[] = [];

      for (const loc of locations) {
        const p = latLngToXYZ(loc.lat, loc.lng, radius);
        const rx = p.x * cosR - p.z * sinR;
        const rz = p.x * sinR + p.z * cosR;

        if (rz < 0) continue;

        const sx = cx + rx;
        const sy = cy - p.y;
        const brightness = (rz + radius) / (2 * radius);
        projected.push({ sx, sy, brightness, loc });

        ctx.beginPath();
        ctx.arc(sx, sy, loc.isHQ ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.5 + brightness * 0.5})`;
        ctx.fill();

        const glowR = loc.isHQ ? 12 : 8;
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        glow.addColorStop(0, `rgba(34, 211, 238, ${0.15 + brightness * 0.1})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(sx - glowR, sy - glowR, glowR * 2, glowR * 2);
      }

      // Label placement with collision avoidance
      const labelRects: { x: number; y: number; w: number; h: number }[] = [];
      const LABEL_H = 12;
      ctx.font = "500 10px var(--font-sans), system-ui, sans-serif";

      for (const { sx, sy, brightness, loc } of projected) {
        const text = loc.city;
        const tw = ctx.measureText(text).width;
        const baseOff = loc.isHQ ? 8 : 6;

        // Try several candidate positions: right, above-right, below-right, left, above-left, below-left
        const candidates = [
          { lx: sx + baseOff,      ly: sy + 3 },
          { lx: sx + baseOff,      ly: sy - 10 },
          { lx: sx + baseOff,      ly: sy + 16 },
          { lx: sx - tw - baseOff, ly: sy + 3 },
          { lx: sx - tw - baseOff, ly: sy - 10 },
          { lx: sx - tw - baseOff, ly: sy + 16 },
        ];

        let bestLx = candidates[0].lx;
        let bestLy = candidates[0].ly;

        for (const { lx, ly } of candidates) {
          const rect = { x: lx, y: ly - LABEL_H, w: tw, h: LABEL_H };
          const overlaps = labelRects.some(
            (r) =>
              rect.x < r.x + r.w &&
              rect.x + rect.w > r.x &&
              rect.y < r.y + r.h &&
              rect.y + rect.h > r.y
          );
          if (!overlaps) {
            bestLx = lx;
            bestLy = ly;
            break;
          }
        }

        labelRects.push({ x: bestLx, y: bestLy - LABEL_H, w: tw, h: LABEL_H });
        ctx.fillStyle = `rgba(240, 246, 252, ${0.4 + brightness * 0.5})`;
        ctx.fillText(text, bestLx, bestLy);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: 360, height: 360, maxWidth: "100%" }}
    />
  );
}
