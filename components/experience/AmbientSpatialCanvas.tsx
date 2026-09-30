"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AmbientSpatialCanvasProps {
  className?: string;
  scrollProgress?: number;
}

export default function AmbientSpatialCanvas({
  className = "",
  scrollProgress = 0,
}: AmbientSpatialCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || typeof window === "undefined") return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    // Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Studio Lighting (Warm Sand & Luxury Champagne Gold highlights)
    const ambientLight = new THREE.AmbientLight(0xfffbf2, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(7, 9, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc69a4b, 2.4);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    const bottomGlowLight = new THREE.PointLight(0xe8c16a, 2.0, 12);
    bottomGlowLight.position.set(2, -2, 2);
    scene.add(bottomGlowLight);

    // Root Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // DIRECTION 1: THE PRECISION HOROLOGY ASTROLABE & CHRONOS TIME-LOCK DIAL
    // =========================================================================
    const heroHorologyGroup = new THREE.Group();
    worldGroup.add(heroHorologyGroup);

    // Disposable tracking lists
    const disposablesGeometries: THREE.BufferGeometry[] = [];
    const disposablesMaterials: THREE.Material[] = [];

    // Shared Materials
    const goldPolishedMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      metalness: 0.94,
      roughness: 0.16,
    });
    disposablesMaterials.push(goldPolishedMat);

    const champagneMat = new THREE.MeshStandardMaterial({
      color: 0xd4af63,
      metalness: 0.88,
      roughness: 0.22,
    });
    disposablesMaterials.push(champagneMat);

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xb7863d,
      metalness: 0.90,
      roughness: 0.20,
    });
    disposablesMaterials.push(bronzeMat);

    // 1. OUTER PRECISION BEZEL RING (With 12 Hour Ticks)
    const outerRingGroup = new THREE.Group();
    heroHorologyGroup.add(outerRingGroup);

    const outerBezelGeo = new THREE.TorusGeometry(1.85, 0.055, 32, 160);
    disposablesGeometries.push(outerBezelGeo);
    const outerBezelMesh = new THREE.Mesh(outerBezelGeo, goldPolishedMat);
    outerRingGroup.add(outerBezelMesh);

    // 12 Radial Ticks around the Bezel
    const tickGeo = new THREE.BoxGeometry(0.035, 0.15, 0.04);
    const cardinalTickGeo = new THREE.BoxGeometry(0.06, 0.22, 0.06);
    disposablesGeometries.push(tickGeo, cardinalTickGeo);

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const isCardinal = i % 3 === 0;
      const tick = new THREE.Mesh(
        isCardinal ? cardinalTickGeo : tickGeo,
        isCardinal ? goldPolishedMat : champagneMat
      );
      tick.position.set(Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0);
      tick.rotation.z = angle + Math.PI / 2;
      outerRingGroup.add(tick);
    }

    // 2. MIDDLE GYROSCOPIC GIMBAL RING
    const middleRingGroup = new THREE.Group();
    heroHorologyGroup.add(middleRingGroup);

    const middleGimbalGeo = new THREE.TorusGeometry(1.42, 0.042, 32, 120);
    disposablesGeometries.push(middleGimbalGeo);
    const middleGimbalMesh = new THREE.Mesh(middleGimbalGeo, champagneMat);
    middleRingGroup.add(middleGimbalMesh);

    // Axis Pivot Pins for Middle Ring
    const pivotPinGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 16);
    disposablesGeometries.push(pivotPinGeo);
    const pinTop = new THREE.Mesh(pivotPinGeo, bronzeMat);
    pinTop.position.set(0, 1.62, 0);
    middleRingGroup.add(pinTop);
    const pinBottom = new THREE.Mesh(pivotPinGeo, bronzeMat);
    pinBottom.position.set(0, -1.62, 0);
    middleRingGroup.add(pinBottom);

    // 3. INNER CHRONOS APPOINTMENT RING
    const innerRingGroup = new THREE.Group();
    heroHorologyGroup.add(innerRingGroup);

    const innerChronosGeo = new THREE.TorusGeometry(1.08, 0.035, 32, 100);
    disposablesGeometries.push(innerChronosGeo);
    const innerChronosMesh = new THREE.Mesh(innerChronosGeo, bronzeMat);
    innerRingGroup.add(innerChronosMesh);

    // 4 Cardinal Appointment Nodes on Inner Ring
    const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    disposablesGeometries.push(nodeGeo);
    [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((ang) => {
      const node = new THREE.Mesh(nodeGeo, goldPolishedMat);
      node.position.set(Math.cos(ang) * 1.08, Math.sin(ang) * 1.08, 0);
      innerRingGroup.add(node);
    });

    // 4. CENTRAL FACETED KEYSTONE CRYSTAL (Translucent Refractive Prism)
    const keystoneGroup = new THREE.Group();
    heroHorologyGroup.add(keystoneGroup);

    const keystoneGeo = new THREE.OctahedronGeometry(0.52, 0);
    disposablesGeometries.push(keystoneGeo);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf5,
      metalness: 0.05,
      roughness: 0.1,
      transmission: 0.88,
      thickness: 1.4,
      ior: 1.54,
      transparent: true,
      opacity: 0.85,
    });
    disposablesMaterials.push(glassMat);

    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.5,
    });
    disposablesMaterials.push(wireMat);

    const keystoneMesh = new THREE.Mesh(keystoneGeo, glassMat);
    keystoneGroup.add(keystoneMesh);

    const wireframeGeo = new THREE.WireframeGeometry(keystoneGeo);
    disposablesGeometries.push(wireframeGeo);
    const wireframeLine = new THREE.LineSegments(wireframeGeo, wireMat);
    keystoneMesh.add(wireframeLine);

    // Inner Radiant Emissive Core (The Heartbeat of the OS)
    const coreGeo = new THREE.SphereGeometry(0.2, 24, 24);
    disposablesGeometries.push(coreGeo);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf0c870,
    });
    disposablesMaterials.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    keystoneGroup.add(coreMesh);

    // 5. RADIANT BACKING HALO (Illuminates in Customer Scene)
    const haloGeo = new THREE.RingGeometry(1.6, 2.7, 64);
    disposablesGeometries.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    disposablesMaterials.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.z = -0.3;
    heroHorologyGroup.add(haloMesh);

    // 6. BACKGROUND FLOATING PARTICLES (Ambient Warm Atmosphere)
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; xOffset: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;

      particleVelocities.push({
        y: 0.0015 + Math.random() * 0.0025,
        xOffset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    disposablesGeometries.push(particleGeometry);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc69a4b,
      size: 0.04,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposablesMaterials.push(particleMaterial);

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particles);

    // Interactive mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollProgressRef.current));

      // Mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      if (!prefersReducedMotion) {
        // =====================================================================
        // SCROLL-SCRUBBED KINETIC CHOREOGRAPHY FOR DIRECTION 1:
        // 01 — THE BUSINESS (p = 0)  -->  02 — THE CUSTOMER (p = 1)
        // =====================================================================

        // 1. SPATIAL POSITION & CAMERA PUSH
        // In Business: Sits at x: 2.1 (right column, framing the apex card)
        // During scrub: lifts forward along Z (+1.2) and glides leftward to x: -1.8
        // In Customer: Settles at x: -1.6 (framing the left kinetic typography and booking portal)
        const targetX = THREE.MathUtils.lerp(2.1, -1.8, p);
        const targetY = THREE.MathUtils.lerp(0.1, -0.05, p) + Math.sin(elapsedTime * 0.8) * 0.08;
        // Z arc: pushes forward towards camera at mid-scroll, creating cinematic fly-through
        const targetZ = THREE.MathUtils.lerp(0.2, 0.4, p) + Math.sin(p * Math.PI) * 1.1;

        heroHorologyGroup.position.set(targetX, targetY, targetZ);

        // Camera push: 8.2 -> 7.1 with scroll scrub
        camera.position.z = 8.2 - p * 1.1;
        camera.position.x = currentMouseX * 0.25;
        camera.position.y = -currentMouseY * 0.25;
        camera.lookAt(0, 0, 0);

        // 2. GYROSCOPIC UNWINDING INTO PLANAR CHRONOS TIME DIAL
        // In Business (p=0): 3D gyroscopic angles (rings orthogonal/tilted)
        // In Customer (p=1): All rings flatten into a single planar clock-face / dial (rotation.x -> 0, rotation.y -> 0)
        const planarBlend = Math.pow(p, 1.8); // Smooth non-linear settling

        // Outer Ring: continuous mechanical tick + scrub spin
        outerRingGroup.rotation.z = elapsedTime * 0.12 + p * Math.PI * 1.6;
        outerRingGroup.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.22, 0, planarBlend);
        outerRingGroup.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.18, 0, planarBlend);

        // Middle Gimbal Ring: unwinds from tilted axis into planar alignment
        middleRingGroup.rotation.x = THREE.MathUtils.lerp(-Math.PI * 0.38 + p * Math.PI * 2.2, 0, planarBlend);
        middleRingGroup.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.28 + p * Math.PI * 1.4, 0, planarBlend);
        middleRingGroup.rotation.z = -elapsedTime * 0.18;

        // Inner Chronos Ring: tilts and locks onto cardinal markers
        innerRingGroup.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.42 - p * Math.PI * 1.8, 0, planarBlend);
        innerRingGroup.rotation.z = THREE.MathUtils.lerp(Math.PI * 0.15, p * Math.PI * 2.0, planarBlend);

        // Keystone Crystal Core: rotates with light refraction
        keystoneGroup.rotation.x = elapsedTime * 0.4 + p * Math.PI;
        keystoneGroup.rotation.y = elapsedTime * 0.5 + p * Math.PI * 1.5;

        // Core Pulse: glows brighter when entering Customer (locking the booking slot)
        const coreScale = 1.0 + Math.sin(elapsedTime * 2.5) * 0.08 + p * 0.25;
        coreMesh.scale.setScalar(coreScale);

        // Halo: expands and illuminates when customer step cards dock
        haloMesh.scale.setScalar(THREE.MathUtils.lerp(1.0, 1.35, p));
        haloMat.opacity = THREE.MathUtils.lerp(0.12, 0.32, p) + Math.sin(elapsedTime * 1.8) * 0.04;

        // Dust particles upward drift
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += Math.sin(elapsedTime * particleVelocities[i].speed + particleVelocities[i].xOffset) * 0.0006;

          if (positions[i * 3 + 1] > 6.0) {
            positions[i * 3 + 1] = -6.0;
            positions[i * 3] = (Math.random() - 0.5) * 16;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Parallax mouse tilt
      worldGroup.rotation.y = currentMouseX * 0.1;
      worldGroup.rotation.x = currentMouseY * 0.07;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      disposablesGeometries.forEach((g) => g.dispose());
      disposablesMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      style={{ zIndex: 5 }}
    />
  );
}
