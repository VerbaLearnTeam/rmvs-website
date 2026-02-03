import { Variants, Transition } from "framer-motion";

// ============================================
// RMVS Framer Motion Variants
// Reusable animation presets
// ============================================

// ─────────────────────────────────────────
// Timing Constants
// ─────────────────────────────────────────

export const timing = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

export const easing = {
  default: [0.4, 0, 0.2, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  smooth: [0.25, 0.1, 0.25, 1],
  out: [0, 0, 0.2, 1],
} as const;

// ─────────────────────────────────────────
// Page Transitions
// ─────────────────────────────────────────

export const pageTransition: Transition = {
  type: "tween",
  duration: timing.normal,
  ease: easing.default,
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { ...pageTransition, duration: timing.fast },
  },
};

// ─────────────────────────────────────────
// Fade Up (Scroll Reveal)
// ─────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.slow,
      ease: easing.out,
    },
  },
};

// ─────────────────────────────────────────
// Fade In
// ─────────────────────────────────────────

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: timing.normal,
      ease: easing.default,
    },
  },
};

// ─────────────────────────────────────────
// Scale In
// ─────────────────────────────────────────

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: timing.normal,
      ease: easing.bounce,
    },
  },
};

// ─────────────────────────────────────────
// Stagger Container
// ─────────────────────────────────────────

export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.normal,
      ease: easing.out,
    },
  },
};

// ─────────────────────────────────────────
// Card Hover (3D Tilt)
// ─────────────────────────────────────────

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.35)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.5), 0 0 30px rgba(56, 189, 248, 0.15)",
    transition: {
      duration: timing.fast,
      ease: easing.default,
    },
  },
};

// ─────────────────────────────────────────
// Button Variants
// ─────────────────────────────────────────

export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: timing.fast,
      ease: easing.bounce,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const buttonGlowVariants: Variants = {
  rest: {
    boxShadow: "0 10px 24px rgba(56, 189, 248, 0.3)",
  },
  hover: {
    boxShadow: "0 15px 35px rgba(56, 189, 248, 0.5)",
    transition: {
      duration: timing.fast,
    },
  },
};

// ─────────────────────────────────────────
// Badge Pulse
// ─────────────────────────────────────────

export const badgePulseVariants: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(56, 189, 248, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(56, 189, 248, 0)",
      "0 0 0 4px rgba(56, 189, 248, 0.2)",
      "0 0 0 0 rgba(56, 189, 248, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

// ─────────────────────────────────────────
// Hero Orb Animation
// ─────────────────────────────────────────

export const orbVariants = (delay: number = 0): Variants => ({
  initial: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0.5,
  },
  animate: {
    x: [0, 30, -20, 15, 0],
    y: [0, -20, 30, 15, 0],
    scale: [1, 1.1, 0.95, 1.05, 1],
    opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

// ─────────────────────────────────────────
// Link Underline
// ─────────────────────────────────────────

export const linkUnderlineVariants: Variants = {
  rest: {
    scaleX: 0,
    originX: 0,
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: timing.fast,
      ease: easing.default,
    },
  },
};

// ─────────────────────────────────────────
// Modal / Overlay
// ─────────────────────────────────────────

export const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: timing.fast,
    },
  },
};

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: timing.normal,
      ease: easing.bounce,
    },
  },
};

// ─────────────────────────────────────────
// Utility: Get reduced motion safe variants
// ─────────────────────────────────────────

export function getReducedMotionVariants(variants: Variants, reducedMotion: boolean): Variants {
  if (!reducedMotion) return variants;
  
  // Return static versions without animations
  const staticVariants: Variants = {};
  for (const key of Object.keys(variants)) {
    staticVariants[key] = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
    };
  }
  return staticVariants;
}
