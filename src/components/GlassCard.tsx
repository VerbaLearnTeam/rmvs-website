"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  enableTilt?: boolean;
  glowOnHover?: boolean;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  href,
  onClick,
  enableTilt = true,
  glowOnHover = true,
  style,
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !enableTilt) return;
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardContent = (
    <motion.div
      ref={cardRef}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        rotateX: enableTilt && !prefersReducedMotion ? rotateX : 0,
        rotateY: enableTilt && !prefersReducedMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {
          scale: 1,
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.35)",
        },
        hover: prefersReducedMotion
          ? {}
          : {
              scale: 1.02,
              boxShadow: glowOnHover
                ? "0 24px 60px rgba(15, 23, 42, 0.5), 0 0 40px rgba(56, 189, 248, 0.15)"
                : "0 24px 60px rgba(15, 23, 42, 0.5)",
            },
      }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Glow border effect */}
      <motion.div
        className="glass-card-glow"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: prefersReducedMotion ? 0 : 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "inherit",
          background: "linear-gradient(135deg, rgba(125, 211, 252, 0.3), transparent, rgba(56, 189, 248, 0.2))",
          zIndex: -1,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
