"use client";

import { useEffect, useRef } from "react";

interface CommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export default function Comments({
  repo = "rmvs-org/website-discussions",
  repoId = "",
  category = "Blog Comments",
  categoryId = "",
}: Partial<CommentsProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !repoId || !categoryId) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      ref.current?.replaceChildren();
    };
  }, [repo, repoId, category, categoryId]);

  if (!repoId || !categoryId) {
    return (
      <div
        style={{
          padding: 24,
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
          color: "var(--white-dim)",
          fontSize: "0.88rem",
        }}
      >
        Comments will be available once Giscus is configured.
      </div>
    );
  }

  return <div ref={ref} />;
}
