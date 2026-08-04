"use client";

/**
 * n8n-style systems diagram for the /services page.
 *
 * Left column: what the client runs today. Right column: the recommended
 * stack. Center: the RMVS hub. A measured SVG overlay draws bezier
 * connectors from every node into hub ports (n8n-style), with port dots
 * and animated flow pulses travelling along each edge.
 *
 * Connectors are recomputed from real DOM positions on resize, so the
 * diagram stays correct across breakpoints; below 900px the columns stack
 * and the connector layer is hidden.
 */
import { useCallback, useEffect, useRef, useState } from "react";

interface NodeSpec {
  name: string;
  detail: string;
  initial: string;
  tone: string; // icon tile color
}

const EXISTING: NodeSpec[] = [
  { name: "Domain registrar", detail: "GoDaddy · Squarespace · Bluehost", initial: "D", tone: "#00d4ff" },
  { name: "Email", detail: "Gmail · Outlook · iCloud domain", initial: "@", tone: "#ffcb57" },
  { name: "Current website", detail: "Wix · WordPress · nothing at all", initial: "W", tone: "#ff5996" },
  { name: "Booking & CRM", detail: "Calendly · spreadsheets · a notebook", initial: "B", tone: "#b45cff" },
  { name: "Payments", detail: "Square · PayPal · paper invoices", initial: "$", tone: "#ff7847" },
];

const STACK: NodeSpec[] = [
  { name: "AWS CloudFront", detail: "global CDN hosting", initial: "A", tone: "#ff7847" },
  { name: "Route 53", detail: "DNS you never think about", initial: "R", tone: "#00d4ff" },
  { name: "Google Workspace", detail: "professional email", initial: "G", tone: "#ffcb57" },
  { name: "Cal.com", detail: "booking on your calendar", initial: "C", tone: "#b45cff" },
  { name: "Stripe", detail: "payments & invoicing", initial: "S", tone: "#635bff" },
];

interface Edge {
  d: string;
  side: "in" | "out";
  key: string;
}

interface Geometry {
  w: number;
  h: number;
  edges: Edge[];
}

export default function SystemsDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const hub = hubRef.current;
    if (!wrap || !hub) return;
    // stacked mobile layout — no connector overlay
    if (wrap.offsetWidth < 760) {
      setGeo(null);
      return;
    }

    const wr = wrap.getBoundingClientRect();
    const hr = hub.getBoundingClientRect();
    const edges: Edge[] = [];

    const port = (rect: DOMRect, i: number, n: number, side: "left" | "right") => ({
      x: (side === "left" ? hr.left : hr.right) - wr.left,
      y: hr.top - wr.top + (hr.height * (i + 1)) / (n + 1),
    });

    leftRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sx = r.right - wr.left;
      const sy = r.top - wr.top + r.height / 2;
      const { x: ex, y: ey } = port(hr, i, leftRefs.current.length, "left");
      const dx = Math.max(30, (ex - sx) * 0.55);
      edges.push({
        d: `M ${sx} ${sy} C ${sx + dx} ${sy}, ${ex - dx} ${ey}, ${ex} ${ey}`,
        side: "in",
        key: `l${i}`,
      });
    });

    rightRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ex = r.left - wr.left;
      const ey = r.top - wr.top + r.height / 2;
      const { x: sx, y: sy } = port(hr, i, rightRefs.current.length, "right");
      const dx = Math.max(30, (ex - sx) * 0.55);
      edges.push({
        d: `M ${sx} ${sy} C ${sx + dx} ${sy}, ${ex - dx} ${ey}, ${ex} ${ey}`,
        side: "out",
        key: `r${i}`,
      });
    });

    setGeo({ w: wr.width, h: wr.height, edges });
  }, []);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    // re-measure once fonts settle (chip heights can shift)
    const t = window.setTimeout(measure, 600);
    document.fonts?.ready?.then(() => measure()).catch(() => {});
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [measure]);

  const endpoints = (d: string) => {
    // "M sx sy C ... ex ey" — pull the first and last coordinate pairs
    const nums = d.match(/-?[\d.]+/g)!.map(Number);
    return {
      sx: nums[0],
      sy: nums[1],
      ex: nums[nums.length - 2],
      ey: nums[nums.length - 1],
    };
  };

  return (
    <div className="svc-diag" ref={wrapRef} aria-label="Diagram: RMVS connects your existing systems to the recommended stack">
      {geo && (
        <svg
          className="svc-diag-svg"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          aria-hidden="true"
        >
          {geo.edges.map((e) => {
            const { sx, sy, ex, ey } = endpoints(e.d);
            const color = e.side === "in" ? "#00d4ff" : "#8f88ff";
            return (
              <g key={e.key}>
                <path className="svc-edge" d={e.d} />
                <path className={`svc-edge-flow svc-edge-${e.side}`} d={e.d} />
                <circle className="svc-port" cx={sx} cy={sy} r={3.5} style={{ stroke: color }} />
                <circle className="svc-port" cx={ex} cy={ey} r={3.5} style={{ stroke: color }} />
                {animate && (
                  <circle r={2.6} fill={color} opacity={0.9}>
                    <animateMotion
                      dur={e.side === "in" ? "3.2s" : "3.6s"}
                      repeatCount="indefinite"
                      begin={`${(parseInt(e.key.slice(1), 10) || 0) * 0.55}s`}
                      path={e.d}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      )}

      <div className="svc-diag-col svc-diag-left">
        <span className="svc-diag-col-label">What you have now</span>
        {EXISTING.map((s, i) => (
          <div
            className="svc-chip"
            key={s.name}
            ref={(el) => {
              leftRefs.current[i] = el;
            }}
          >
            <span className="svc-chip-icon" style={{ background: s.tone }} aria-hidden="true">
              {s.initial}
            </span>
            <span className="svc-chip-text">
              <b>{s.name}</b>
              <small>{s.detail}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="svc-diag-mid">
        <span className="svc-diag-hub-note">audit</span>
        <div className="svc-diag-hub" ref={hubRef}>
          RMVS
        </div>
        <span className="svc-diag-hub-note">wire · migrate · build</span>
      </div>

      <div className="svc-diag-col svc-diag-right">
        <span className="svc-diag-col-label">The recommended stack</span>
        {STACK.map((s, i) => (
          <div
            className="svc-chip"
            key={s.name}
            ref={(el) => {
              rightRefs.current[i] = el;
            }}
          >
            <span className="svc-chip-icon" style={{ background: s.tone }} aria-hidden="true">
              {s.initial}
            </span>
            <span className="svc-chip-text">
              <b>{s.name}</b>
              <small>{s.detail}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
