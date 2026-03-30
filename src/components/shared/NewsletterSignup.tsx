"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          subject: "Newsletter Signup",
          message: `Newsletter signup request from: ${email}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        padding: 24,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--glass)",
      }}
    >
      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 6, color: "var(--white-bright)" }}>
        Stay Updated
      </h4>
      <p style={{ fontSize: "0.85rem", color: "var(--white-dim)", marginBottom: 14 }}>
        Get notified when we publish new posts and ship new products.
      </p>

      {status === "success" ? (
        <div className="success">Thanks for subscribing!</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="input flex-1"
            style={{ minWidth: 200, padding: "10px 14px", fontSize: "0.88rem" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary"
            style={{ padding: "10px 20px", fontSize: "0.88rem" }}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="error" style={{ marginTop: 8 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
