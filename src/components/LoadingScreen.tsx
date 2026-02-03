"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  children: React.ReactNode;
  minLoadTime?: number;
}

export default function LoadingScreen({ 
  children, 
  minLoadTime = 800 
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Ensure minimum display time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  // Delay showing content until fade-out starts
  useEffect(() => {
    if (!isLoading) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(contentTimer);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #0b0d12 0%, #0a0e15 50%, #080a0f 100%)",
            }}
          >
            {/* Animated background orbs */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  width: 400,
                  height: 400,
                  left: "20%",
                  top: "20%",
                  background: "radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(60px)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  right: "20%",
                  bottom: "30%",
                  background: "radial-gradient(circle, rgba(125, 211, 252, 0.15), transparent 60%)",
                  borderRadius: "50%",
                  filter: "blur(50px)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>

            {/* Logo and loading content */}
            <motion.div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Logo with glow effect */}
              <motion.div
                style={{
                  position: "relative",
                  width: 80,
                  height: 80,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Glow behind logo */}
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    background: "radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(20px)",
                  }}
                />
                <Image
                  src="/logo.png"
                  alt="RMVS"
                  width={80}
                  height={80}
                  style={{
                    position: "relative",
                    objectFit: "contain",
                    borderRadius: 16,
                  }}
                  priority
                />
              </motion.div>

              {/* Company name */}
              <motion.h1
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#f3f4f6",
                  letterSpacing: "0.05em",
                  textAlign: "center",
                  margin: 0,
                  background: "linear-gradient(135deg, #f3f4f6 0%, #7dd3fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                RMonaghan Venture Studios
              </motion.h1>

              {/* Loading indicator */}
              <motion.div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 8,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7dd3fc, #38bdf8)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - render but hide until loading complete */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
