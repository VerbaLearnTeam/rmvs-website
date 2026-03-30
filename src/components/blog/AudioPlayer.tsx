"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  title: string;
  chapters?: Array<{ title: string; timestamp: string }>;
}

const SPEEDS = [1, 1.25, 1.5, 2];

function parseTimestamp(ts: string): number {
  const parts = ts.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title, chapters = [] }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [currentChapter, setCurrentChapter] = useState("");

  const storageKey = `rmvs-audio-${title}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved && audioRef.current) {
      audioRef.current.currentTime = parseFloat(saved);
    }
  }, [storageKey]);

  const onTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    localStorage.setItem(storageKey, String(audio.currentTime));

    if (chapters.length > 0) {
      let ch = chapters[0]?.title || "";
      for (const c of chapters) {
        if (audio.currentTime >= parseTimestamp(c.timestamp)) ch = c.title;
      }
      setCurrentChapter(ch);
    }
  }, [chapters, storageKey]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) audioRef.current.currentTime = pct * duration;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center gap-4 px-6 py-3"
      style={{
        zIndex: 1100,
        background: "rgba(10, 15, 28, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => setPlaying(false)}
      />

      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
        className="flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--gradient-primary)",
          color: "var(--bg)",
          flexShrink: 0,
        }}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-mono text-xs truncate"
            style={{ color: "var(--white-bright)", maxWidth: 300 }}
          >
            {title}
          </span>
          {currentChapter && (
            <span
              className="font-mono text-xs truncate"
              style={{ color: "var(--white-dim)" }}
            >
              — {currentChapter}
            </span>
          )}
        </div>

        <div
          onClick={seek}
          className="relative w-full cursor-pointer"
          style={{ height: 4, borderRadius: 2, background: "var(--border-hover)" }}
          role="slider"
          aria-label="Audio progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 2,
              background: "var(--cyan)",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>

      <span className="font-mono text-xs" style={{ color: "var(--white-dim)", flexShrink: 0 }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <button
        onClick={cycleSpeed}
        className="font-mono text-xs px-2 py-1 rounded"
        style={{
          border: "1px solid var(--border)",
          color: "var(--white-dim)",
          flexShrink: 0,
        }}
      >
        {SPEEDS[speedIdx]}x
      </button>
    </div>
  );
}
