"use client";

import { useEffect, useRef, useState } from "react";

const orbits = [
  {
    radius: 100,
    speed: 0.02,
    direction: 1,
    skills: ["Swift", "Xcode", "iOS", "Metal"],
  },
  {
    radius: 165,
    speed: 0.012,
    direction: -1,
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind"],
  },
  {
    radius: 230,
    speed: 0.007,
    direction: 1,
    skills: ["Claude", "Cursor", "GPT", "Gemini", "ElevenLabs", "Codex"],
  },
];

export default function SkillsOrbit() {
  const [angles, setAngles] = useState(() => orbits.map(() => 0));
  const animRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    if (reducedMotion.current) {
      setAngles(orbits.map((_, i) => (i * Math.PI) / 3));
      return;
    }

    const animate = () => {
      setAngles((prev) =>
        prev.map((a, i) => a + orbits[i].speed * orbits[i].direction)
      );
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: 520, height: 520, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* Center logo */}
      <div
        className="absolute rounded-xl flex items-center justify-center font-bold text-2xl"
        style={{
          width: 72,
          height: 72,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--gradient-primary)",
          color: "var(--bg)",
          zIndex: 10,
        }}
      >
        R
      </div>

      {/* Orbit rings */}
      {orbits.map((orbit, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px dashed var(--cyan-border)",
          }}
        />
      ))}

      {/* Skill pills */}
      {orbits.map((orbit, orbitIdx) =>
        orbit.skills.map((skill, skillIdx) => {
          const angleOffset = (skillIdx / orbit.skills.length) * Math.PI * 2;
          const angle = angles[orbitIdx] + angleOffset;
          const x = Math.cos(angle) * orbit.radius;
          const y = Math.sin(angle) * orbit.radius;

          return (
            <div
              key={`${orbitIdx}-${skill}`}
              className="absolute font-mono text-xs whitespace-nowrap px-2.5 py-1 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                background: "var(--bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--white)",
                fontSize: "0.72rem",
                zIndex: 5,
              }}
            >
              {skill}
            </div>
          );
        })
      )}
    </div>
  );
}
