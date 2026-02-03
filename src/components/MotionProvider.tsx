"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          type: "tween",
          ease: [0.4, 0, 0.2, 1],
          duration: 0.3,
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
