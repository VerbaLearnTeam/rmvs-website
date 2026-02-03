"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode, useState } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
}: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (!prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    onClick?.();
  };

  const variantClasses = {
    primary: "btn btn-primary",
    outline: "btn btn-outline",
    ghost: "btn btn-ghost",
  };

  const isDisabled = disabled || loading || prefersReducedMotion;

  const buttonContent = (
    <>
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: variant === "primary" ? "rgba(255,255,255,0.3)" : "rgba(125, 211, 252, 0.3)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <motion.span
          className="button-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            display: "inline-block",
            width: 16,
            height: 16,
            border: "2px solid transparent",
            borderTopColor: variant === "primary" ? "#0b0d12" : "var(--accent)",
            borderRadius: "50%",
            marginRight: 8,
          }}
        />
      )}

      {children}
    </>
  );

  const baseStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled || loading ? "not-allowed" : "pointer",
  };

  if (href && !disabled && !loading) {
    return (
      <Link href={href}>
        <motion.span
          className={`${variantClasses[variant]} ${className}`}
          initial="rest"
          whileHover={isDisabled ? undefined : "hover"}
          whileTap={isDisabled ? undefined : "tap"}
          variants={buttonVariants}
          transition={{ duration: 0.15 }}
          style={baseStyle}
          onClick={handleClick}
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={`${variantClasses[variant]} ${className}`}
      initial="rest"
      whileHover={isDisabled ? undefined : "hover"}
      whileTap={isDisabled ? undefined : "tap"}
      variants={buttonVariants}
      transition={{ duration: 0.15 }}
      style={baseStyle}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {buttonContent}
    </motion.button>
  );
}
