"use client";

/**
 * Vanilla three.js render of the gold point-cloud emblem (no R3F).
 * Lazy-loaded by GoldEmblem only when WebGL is available.
 *
 * Layering (Auron occlusion rule): the ribbon is opaque with depthWrite so the
 * knot passes correctly in front of and behind the globe; globe, glow, and
 * dust are additive and never punch holes in the ribbon.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  buildGoldEmblemGeometry,
  AURUM_GOLD,
  RIBBON_GOLD,
} from "./gold-emblem-data";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function GoldEmblemScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
    // 9.4 (not Auron's 8.5): the ribbon lobes swing wide as the emblem
    // rotates, and the square canvas was clipping them at the edges.
    camera.position.set(0, 0, 9.4);

    const { ribbonPositions, ribbonColors, globePositions, globeColors, hubPositions } =
      buildGoldEmblemGeometry();

    const group = new THREE.Group();
    group.rotation.set(0.35, Math.PI / 2, 0.05);
    scene.add(group);

    // 1 · Ribbon — opaque, owns occlusion.
    const ribbonGeo = new THREE.BufferGeometry();
    ribbonGeo.setAttribute("position", new THREE.BufferAttribute(ribbonPositions, 3));
    ribbonGeo.setAttribute("color", new THREE.BufferAttribute(ribbonColors, 3));
    const ribbonMat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending,
    });
    const ribbon = new THREE.Points(ribbonGeo, ribbonMat);
    ribbon.frustumCulled = false;
    ribbon.renderOrder = 1;
    group.add(ribbon);

    // 2 · Globe + routes — additive soft gold volume.
    const globeGeo = new THREE.BufferGeometry();
    globeGeo.setAttribute("position", new THREE.BufferAttribute(globePositions, 3));
    globeGeo.setAttribute("color", new THREE.BufferAttribute(globeColors, 3));
    const globeMat = new THREE.PointsMaterial({
      size: 0.016,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: false,
      depthTest: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const globe = new THREE.Points(globeGeo, globeMat);
    globe.frustumCulled = false;
    globe.renderOrder = 2;
    group.add(globe);

    // 2b · Hub nodes — brighter, larger points.
    const hubGeo = new THREE.BufferGeometry();
    hubGeo.setAttribute("position", new THREE.BufferAttribute(hubPositions, 3));
    const hubMat = new THREE.PointsMaterial({
      size: 0.075,
      color: new THREE.Color(RIBBON_GOLD).convertSRGBToLinear(),
      sizeAttenuation: true,
      depthWrite: false,
      depthTest: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const hubPoints = new THREE.Points(hubGeo, hubMat);
    hubPoints.frustumCulled = false;
    hubPoints.renderOrder = 2;
    group.add(hubPoints);

    // 3 · Back-side fresnel glow, tracks cursor proximity.
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(AURUM_GOLD) },
        glowIntensity: { value: 0.09 },
      },
      vertexShader: `
        varying float vIntensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
          vIntensity = pow(0.7 - dot(vNormal, viewDir), 3.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float glowIntensity;
        varying float vIntensity;
        void main() {
          gl_FragColor = vec4(glowColor, vIntensity * glowIntensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(3.1, 64, 64), glowMat);
    glow.rotation.copy(group.rotation);
    glow.renderOrder = 3;
    scene.add(glow);

    // 4 · Ambient gold dust.
    const dustPositions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      dustPositions[i * 3] = (seededRandom(i * 3) - 0.5) * 12;
      dustPositions[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 8;
      dustPositions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 6;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.01,
      color: new THREE.Color(AURUM_GOLD),
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    dust.frustumCulled = false;
    scene.add(dust);

    // ── Sizing ──
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ── Interaction ──
    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!isTouch) window.addEventListener("pointermove", onMove);

    const tiltX = reducedMotion ? 0.02 : 0.15;
    const tiltZ = reducedMotion ? 0.01 : 0.08;
    const lerpFactor = reducedMotion ? 0.01 : 0.04;

    // Pause rendering while offscreen.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(host);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (!visible) return;

      group.rotation.y += delta * 0.06;
      const targetX = 0.35 + mouse.y * tiltX;
      const targetZ = 0.05 + mouse.x * tiltZ;
      group.rotation.x += (targetX - group.rotation.x) * lerpFactor;
      group.rotation.z += (targetZ - group.rotation.z) * lerpFactor;

      dust.rotation.y = clock.elapsedTime * 0.008;

      const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
      const proximity = 1 - Math.min(dist, 1);
      const target = 0.09 + proximity * 0.07;
      glowMat.uniforms.glowIntensity.value +=
        (target - glowMat.uniforms.glowIntensity.value) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (!isTouch) window.removeEventListener("pointermove", onMove);
      ribbonGeo.dispose();
      globeGeo.dispose();
      hubGeo.dispose();
      dustGeo.dispose();
      glow.geometry.dispose();
      ribbonMat.dispose();
      globeMat.dispose();
      hubMat.dispose();
      dustMat.dispose();
      glowMat.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="svc-emblem-host" aria-hidden="true" />;
}
