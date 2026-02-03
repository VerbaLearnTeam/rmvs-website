"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  gradient: string;
}

const orbs: Orb[] = [
  {
    id: 1,
    size: 600,
    x: 10,
    y: -5,
    duration: 20,
    delay: 0,
    gradient: "radial-gradient(circle, rgba(56, 189, 248, 0.35), transparent 70%)",
  },
  {
    id: 2,
    size: 450,
    x: 70,
    y: 20,
    duration: 25,
    delay: 2,
    gradient: "radial-gradient(circle, rgba(125, 211, 252, 0.25), transparent 60%)",
  },
  {
    id: 3,
    size: 350,
    x: 40,
    y: 60,
    duration: 18,
    delay: 4,
    gradient: "radial-gradient(circle, rgba(96, 165, 250, 0.2), transparent 65%)",
  },
];

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax based on mouse position
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div
      className="hero-background"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animated gradient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: orb.gradient,
            borderRadius: "50%",
            filter: "blur(60px)",
            willChange: prefersReducedMotion ? "auto" : "transform",
            transform: prefersReducedMotion 
              ? undefined 
              : `translate(${mousePosition.x * (orb.id * 0.3)}px, ${mousePosition.y * (orb.id * 0.3)}px)`,
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 0.5 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : {
                  x: [0, 30, -20, 15, 0],
                  y: [0, -20, 30, 15, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                  opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
                }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Grid lines overlay (subtle) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(125, 211, 252, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125, 211, 252, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
