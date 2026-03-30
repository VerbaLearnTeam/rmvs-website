"use client";

import { useState } from "react";

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "copy":
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      case "x":
        window.open(`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank");
        break;
      case "reddit":
        window.open(`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, "_blank");
        break;
      case "native":
        if (navigator.share) {
          await navigator.share({ title, url });
        }
        break;
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          if (typeof navigator.share === "function") {
            void share("native");
          } else {
            setOpen(!open);
          }
        }}
        className="btn btn-ghost"
        style={{ padding: "8px 14px", fontSize: "0.88rem" }}
      >
        ↗ Share
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 py-2 rounded-lg"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border-hover)",
            boxShadow: "var(--shadow-md)",
            minWidth: 160,
            zIndex: 50,
          }}
        >
          {[
            { key: "copy", label: copied ? "Copied!" : "Copy Link" },
            { key: "x", label: "Share on X" },
            { key: "linkedin", label: "LinkedIn" },
            { key: "reddit", label: "Reddit" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => share(item.key)}
              className="block w-full text-left px-4 py-2 text-sm transition-colors"
              style={{ color: "var(--white-dim)" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
