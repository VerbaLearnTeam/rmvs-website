/**
 * Gold point-cloud emblem geometry for the /services delivery-network plate.
 *
 * Adapted from the Auron Intelligence hero pipeline (torus-knot Möbius ribbon:
 * arc-length resampling + parallel-transport frames + holonomy-corrected
 * half-twist), but the centrepiece is a point-cloud globe with edge-network
 * routes instead of Auron's brain — this page sells delivery infrastructure.
 *
 * Everything is deterministic (seeded RNG) so the emblem is identical on
 * every load. Built once on first import of the scene module (which is
 * lazy-loaded client-side only).
 */
import * as THREE from "three";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function createRng(seed: number): () => number {
  let t = seed >>> 0;
  return () => ((t = (t * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ── Torus-knot centerline ─────────────────────────────────── */

function torusKnotPoint(
  t: number,
  R: number,
  r: number,
  p: number,
  q: number,
  verticalStretch: number
): THREE.Vector3 {
  const pt = p * t;
  const qt = q * t;
  return new THREE.Vector3(
    (R + r * Math.cos(pt)) * Math.cos(qt),
    r * Math.sin(pt) * verticalStretch,
    (R + r * Math.cos(pt)) * Math.sin(qt)
  );
}

/* Uniform arc-length resample of a closed polyline (no endpoint dupe). */
function resampleByArcLength(raw: THREE.Vector3[], N: number): THREE.Vector3[] {
  const M = raw.length;
  const arc = new Float64Array(M + 1);
  for (let i = 1; i < M; i++) arc[i] = arc[i - 1] + raw[i].distanceTo(raw[i - 1]);
  arc[M] = arc[M - 1] + raw[M - 1].distanceTo(raw[0]);
  const total = arc[M];

  const out: THREE.Vector3[] = [];
  let seg = 0;
  for (let i = 0; i < N; i++) {
    const target = (i / N) * total;
    while (seg < M - 1 && arc[seg + 1] < target) seg++;
    const segLen = arc[seg + 1] - arc[seg];
    const t = segLen > 1e-12 ? (target - arc[seg]) / segLen : 0;
    out.push(new THREE.Vector3().lerpVectors(raw[seg], raw[(seg + 1) % M], t));
  }
  return out;
}

/* Flip-free frames along a closed curve + loop holonomy. */
function parallelTransportFrames(centerline: THREE.Vector3[]) {
  const N = centerline.length;
  const tangents: THREE.Vector3[] = [];
  const normals: THREE.Vector3[] = [];
  const binormals: THREE.Vector3[] = [];

  for (let i = 0; i < N; i++) {
    const next = centerline[(i + 1) % N];
    const prev = centerline[(i - 1 + N) % N];
    tangents.push(new THREE.Vector3().subVectors(next, prev).normalize());
  }

  const n0 = new THREE.Vector3();
  const t0 = tangents[0];
  const ax = Math.abs(t0.x), ay = Math.abs(t0.y), az = Math.abs(t0.z);
  if (ax <= ay && ax <= az) n0.set(1, 0, 0);
  else if (ay <= az) n0.set(0, 1, 0);
  else n0.set(0, 0, 1);
  n0.cross(t0).normalize();

  normals.push(n0.clone());
  binormals.push(new THREE.Vector3().crossVectors(t0, n0).normalize());

  const rotAxis = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  for (let i = 1; i < N; i++) {
    rotAxis.crossVectors(tangents[i - 1], tangents[i]);
    const len = rotAxis.length();
    if (len > 1e-10) {
      rotAxis.divideScalar(len);
      const angle = Math.acos(
        Math.max(-1, Math.min(1, tangents[i - 1].dot(tangents[i])))
      );
      quat.setFromAxisAngle(rotAxis, angle);
    } else {
      quat.identity();
    }
    const n = normals[i - 1].clone().applyQuaternion(quat).normalize();
    normals.push(n);
    binormals.push(new THREE.Vector3().crossVectors(tangents[i], n).normalize());
  }

  const holonomy = Math.atan2(
    normals[N - 1].clone().cross(normals[0]).dot(tangents[0]),
    normals[N - 1].dot(normals[0])
  );

  return { tangents, normals, binormals, holonomy };
}

/* ── Möbius ribbon sweep ───────────────────────────────────── */

function generateRibbon() {
  const R = 2.35;
  const r = 0.7;
  const p = 3;
  const q = 2;
  const N = 3072;
  const RAW = 8192;
  const ribbonWidth = 0.24;
  const ribbonThickness = 0.03;
  const widthSteps = 10;
  const thicknessSteps = 3;
  const twistTurns = 0.5; // Möbius half-twist
  const topScaleFactor = 0.85;
  const verticalStretch = 2.8;
  const emblemScaleX = 0.82;
  const emblemScaleY = 0.92;
  const TAU = Math.PI * 2;

  const raw: THREE.Vector3[] = [];
  for (let i = 0; i < RAW; i++) {
    raw.push(torusKnotPoint((i / RAW) * TAU, R, r, p, q, verticalStretch));
  }
  for (const v of raw) {
    v.x *= emblemScaleX;
    v.y *= emblemScaleY;
  }

  const centerline = resampleByArcLength(raw, N);
  const { tangents, normals, binormals, holonomy } =
    parallelTransportFrames(centerline);

  // Pick the holonomy branch minimizing the per-frame correction so the
  // half-twist closes seamlessly at the loop boundary.
  const targetTwist = TAU * twistTurns;
  let bestCorrection = holonomy - targetTwist;
  for (let k = -3; k <= 3; k++) {
    const candidate = holonomy + TAU * k - targetTwist;
    if (Math.abs(candidate) < Math.abs(bestCorrection)) bestCorrection = candidate;
  }
  const twistPerFrame = bestCorrection / N;

  let yMin = Infinity, yMax = -Infinity;
  for (const c of centerline) {
    if (c.y < yMin) yMin = c.y;
    if (c.y > yMax) yMax = c.y;
  }

  const pts: number[] = [];
  const twistQuat = new THREE.Quaternion();
  const tN = new THREE.Vector3();
  const tB = new THREE.Vector3();

  for (let i = 0; i < N; i++) {
    const c = centerline[i];
    twistQuat.setFromAxisAngle(tangents[i], twistPerFrame * i);
    tN.copy(normals[i]).applyQuaternion(twistQuat).normalize();
    tB.copy(binormals[i]).applyQuaternion(twistQuat).normalize();

    const yNorm = (c.y - yMin) / (yMax - yMin);
    const topFactor = 1 - (1 - topScaleFactor) * smoothstep(0.55, 0.85, yNorm);
    const w = ribbonWidth * topFactor * 0.5;
    const h = ribbonThickness * topFactor * 0.5;

    // Hollow cross-section: perimeter points only.
    for (let wi = 0; wi <= widthSteps; wi++) {
      const wt = (wi / widthSteps) * 2 - 1;
      for (let hi = 0; hi <= thicknessSteps; hi++) {
        if (wi > 0 && wi < widthSteps && hi > 0 && hi < thicknessSteps) continue;
        const ht = (hi / thicknessSteps) * 2 - 1;
        const laneBias = (hi - thicknessSteps * 0.5) * 0.0015;
        pts.push(
          c.x + tN.x * wt * w + tB.x * (ht * h + laneBias),
          c.y + tN.y * wt * w + tB.y * (ht * h + laneBias),
          c.z + tN.z * wt * w + tB.z * (ht * h + laneBias)
        );
      }
    }
  }

  return new Float32Array(pts);
}

/* ── Point-cloud globe with edge routes ────────────────────── */

const GLOBE_RADIUS = 1.16;

function generateGlobeSurface(count: number) {
  // Fibonacci sphere: even coverage, no pole clustering.
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * radius * GLOBE_RADIUS;
    pts[i * 3 + 1] = y * GLOBE_RADIUS;
    pts[i * 3 + 2] = Math.sin(theta) * radius * GLOBE_RADIUS;
  }
  return pts;
}

function generateGlobeGraticule() {
  // Sparse lat/long rings — the "wireframe" read of the globe.
  const pts: number[] = [];
  const ringSamples = 340;
  const lats = [-60, -30, 0, 30, 60];
  for (const latDeg of lats) {
    const lat = (latDeg * Math.PI) / 180;
    const y = Math.sin(lat) * GLOBE_RADIUS;
    const r = Math.cos(lat) * GLOBE_RADIUS;
    for (let i = 0; i < ringSamples; i++) {
      const a = (i / ringSamples) * Math.PI * 2;
      pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
  }
  for (let m = 0; m < 8; m++) {
    const lon = (m / 8) * Math.PI * 2;
    for (let i = 0; i < ringSamples; i++) {
      const a = (i / ringSamples) * Math.PI * 2;
      const r = Math.cos(a) * GLOBE_RADIUS;
      pts.push(Math.cos(lon) * r, Math.sin(a) * GLOBE_RADIUS, Math.sin(lon) * r);
    }
  }
  return new Float32Array(pts);
}

function generateRoutes() {
  // Hub nodes + great-circle arcs lifted off the surface: the CDN routes.
  const rng = createRng(4242);
  const hubs: THREE.Vector3[] = [];
  const HUB_COUNT = 12;
  for (let i = 0; i < HUB_COUNT; i++) {
    // Bias hubs toward mid-latitudes like real edge locations.
    const lat = (rng() - 0.5) * Math.PI * 0.72;
    const lon = rng() * Math.PI * 2;
    hubs.push(
      new THREE.Vector3(
        Math.cos(lat) * Math.cos(lon),
        Math.sin(lat),
        Math.cos(lat) * Math.sin(lon)
      ).multiplyScalar(GLOBE_RADIUS)
    );
  }

  const arcPts: number[] = [];
  const hubPts: number[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const mid = new THREE.Vector3();

  for (const h of hubs) hubPts.push(h.x, h.y, h.z);

  const ARCS = 16;
  const SAMPLES = 90;
  for (let k = 0; k < ARCS; k++) {
    a.copy(hubs[Math.floor(rng() * HUB_COUNT)]);
    b.copy(hubs[Math.floor(rng() * HUB_COUNT)]);
    if (a.distanceToSquared(b) < 0.4) continue;
    const lift = 1.06 + rng() * 0.16;
    for (let s = 0; s <= SAMPLES; s++) {
      const t = s / SAMPLES;
      // Slerp along the great circle, lifted by a sine bump mid-arc.
      mid.copy(a).lerp(b, t).normalize();
      const elevation = GLOBE_RADIUS * (1 + (lift - 1) * Math.sin(t * Math.PI));
      arcPts.push(mid.x * elevation, mid.y * elevation, mid.z * elevation);
    }
  }

  return {
    arcs: new Float32Array(arcPts),
    hubs: new Float32Array(hubPts),
  };
}

/* ── Assembly + vertex colors ──────────────────────────────── */

export interface GoldEmblemGeometry {
  ribbonPositions: Float32Array;
  ribbonColors: Float32Array;
  globePositions: Float32Array;
  globeColors: Float32Array;
  /** Hub nodes drawn separately at a larger point size. */
  hubPositions: Float32Array;
}

export const RIBBON_GOLD = "#E8C058";
export const AURUM_GOLD = "#D4A842";
export const DEEP_INDIGO = "#1A1F54";

export function buildGoldEmblemGeometry(): GoldEmblemGeometry {
  const ribbonPositions = generateRibbon();

  const surface = generateGlobeSurface(24000);
  const graticule = generateGlobeGraticule();
  const { arcs, hubs } = generateRoutes();

  const globeFloats = surface.length + graticule.length + arcs.length;
  const globePositions = new Float32Array(globeFloats);
  globePositions.set(surface, 0);
  globePositions.set(graticule, surface.length);
  globePositions.set(arcs, surface.length + graticule.length);

  // Colors — authored sRGB, converted to linear for the vertex buffers,
  // rendered with toneMapping off so the metal stays intentional.
  const ribbonGold = new THREE.Color(RIBBON_GOLD).convertSRGBToLinear();
  const aurumGold = new THREE.Color(AURUM_GOLD).convertSRGBToLinear();
  const slate = new THREE.Color("#33416F").convertSRGBToLinear();
  const temp = new THREE.Color();

  const ribbonColors = new Float32Array(ribbonPositions.length);
  for (let i = 0; i < ribbonPositions.length / 3; i++) {
    temp.copy(ribbonGold);
    const variation = seededRandom(i) * 0.04;
    temp.r = Math.min(1, temp.r + variation);
    temp.g = Math.min(1, temp.g + variation * 0.5);
    ribbonColors[i * 3] = temp.r;
    ribbonColors[i * 3 + 1] = temp.g;
    ribbonColors[i * 3 + 2] = temp.b;
  }

  const globeColors = new Float32Array(globeFloats);
  const surfaceCount = surface.length / 3;
  const graticuleCount = graticule.length / 3;
  const arcCount = arcs.length / 3;

  let ci = 0;
  for (let i = 0; i < surfaceCount; i++, ci++) {
    // Dimmed aurum with slate depth cue toward the poles.
    const y = Math.abs(surface[i * 3 + 1]) / GLOBE_RADIUS;
    temp.copy(aurumGold).multiplyScalar(0.52).lerp(slate, y * 0.22);
    const jitter = (seededRandom(i * 7) - 0.5) * 0.06;
    globeColors[ci * 3] = Math.max(0, temp.r + jitter);
    globeColors[ci * 3 + 1] = Math.max(0, temp.g + jitter * 0.6);
    globeColors[ci * 3 + 2] = Math.max(0, temp.b);
  }
  for (let i = 0; i < graticuleCount; i++, ci++) {
    temp.copy(aurumGold).multiplyScalar(0.78);
    globeColors[ci * 3] = temp.r;
    globeColors[ci * 3 + 1] = temp.g;
    globeColors[ci * 3 + 2] = temp.b;
  }
  for (let i = 0; i < arcCount; i++, ci++) {
    temp.copy(ribbonGold);
    globeColors[ci * 3] = temp.r;
    globeColors[ci * 3 + 1] = temp.g;
    globeColors[ci * 3 + 2] = temp.b;
  }

  return {
    ribbonPositions,
    ribbonColors,
    globePositions,
    globeColors,
    hubPositions: hubs,
  };
}
