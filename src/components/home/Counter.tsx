"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function Counter({ end, label, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-mono text-3xl font-bold"
        style={{ color: "var(--cyan)" }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: "var(--white-dim)" }}>
        {label}
      </div>
    </div>
  );
}
