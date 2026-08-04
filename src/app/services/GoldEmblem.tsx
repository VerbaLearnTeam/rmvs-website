"use client";

/**
 * Capability gate for the gold point-cloud emblem: probes WebGL once,
 * lazy-loads the three.js scene only when supported, and falls back to a
 * static radial-gradient plate otherwise (also the SSR/loading state).
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GoldEmblemScene = dynamic(() => import("./GoldEmblemScene"), {
  ssr: false,
  loading: () => <div className="svc-emblem-fallback" aria-hidden="true" />,
});

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

export default function GoldEmblem() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(checkWebGL());
  }, []);

  return (
    <div className="svc-emblem">
      {supported ? (
        <GoldEmblemScene />
      ) : (
        <div className="svc-emblem-fallback" aria-hidden="true" />
      )}
    </div>
  );
}
