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
    const ambientLight = new THREE.AmbientLight(0xfffbf2, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.4);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc69a4b, 2.6);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    const accentPointLight = new THREE.PointLight(0xe8c16a, 2.2, 10);
    accentPointLight.position.set(2, 0, 2);
    scene.add(accentPointLight);

    // Root World Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // DIRECTION 2: THE ARCHITECTURAL GLASS MONOLITH & KINETIC BOOKING WAFERS
    // =========================================================================
    const heroMonolithGroup = new THREE.Group();
    worldGroup.add(heroMonolithGroup);

    // Disposable tracking lists
    const disposablesGeometries: THREE.BufferGeometry[] = [];
    const disposablesMaterials: THREE.Material[] = [];

    // Shared Materials
    const frostedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf5,
      metalness: 0.06,
      roughness: 0.12,
      transmission: 0.86,
      thickness: 1.5,
      ior: 1.52,
      transparent: true,
      opacity: 0.88,
    });
    disposablesMaterials.push(frostedGlassMat);

    const goldChassisMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      metalness: 0.94,
      roughness: 0.16,
    });
    disposablesMaterials.push(goldChassisMat);

    const champagneMat = new THREE.MeshStandardMaterial({
      color: 0xd4af63,
      metalness: 0.88,
      roughness: 0.22,
    });
    disposablesMaterials.push(champagneMat);

    const goldWireMat = new THREE.LineBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.55,
    });
    disposablesMaterials.push(goldWireMat);

    const activeEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
    });
    disposablesMaterials.push(activeEmissiveMat);

    // 4 Modular Glass Wafers (Forming the Monolith in Business, Unfolding into Booking Steps in Customer)
    interface WaferItem {
      group: THREE.Group;
      mesh: THREE.Mesh;
      wireframe: THREE.LineSegments;
      tagMesh: THREE.Mesh;
      coreStrip: THREE.Mesh;
      baseY: number;
    }

    const wafers: WaferItem[] = [];
    const waferCount = 4;
    const waferWidth = 1.75;
    const waferHeight = 0.58;
    const waferDepth = 0.18;

    const slabGeo = new THREE.BoxGeometry(waferWidth, waferHeight, waferDepth);
    disposablesGeometries.push(slabGeo);

    const edgeGeo = new THREE.EdgesGeometry(slabGeo);
    disposablesGeometries.push(edgeGeo);

    const tagGeo = new THREE.BoxGeometry(0.14, 0.14, 0.22);
    disposablesGeometries.push(tagGeo);

    const stripGeo = new THREE.BoxGeometry(1.4, 0.025, 0.04);
    disposablesGeometries.push(stripGeo);

    for (let i = 0; i < waferCount; i++) {
      const waferGroup = new THREE.Group();
      heroMonolithGroup.add(waferGroup);

      // Stacked vertically in monolith state: i=0 at top, i=3 at bottom
      // Stack offsets: (1.5 - i) * 0.64
      const initialY = (1.5 - i) * 0.64;

      const slabMesh = new THREE.Mesh(slabGeo, frostedGlassMat);
      waferGroup.add(slabMesh);

      const wireframe = new THREE.LineSegments(edgeGeo, goldWireMat);
      slabMesh.add(wireframe);

      // Gold step tag / crest on edge
      const tagMesh = new THREE.Mesh(tagGeo, i === 3 ? activeEmissiveMat : goldChassisMat);
      tagMesh.position.set(-waferWidth / 2 + 0.15, 0, 0);
      waferGroup.add(tagMesh);

      // Interior telemetry strip
      const coreStrip = new THREE.Mesh(stripGeo, champagneMat);
      coreStrip.position.set(0.08, 0, 0);
      waferGroup.add(coreStrip);

      waferGroup.position.set(0, initialY, 0);

      wafers.push({
        group: waferGroup,
        mesh: slabMesh,
        wireframe,
        tagMesh,
        coreStrip,
        baseY: initialY,
      });
    }

    // Outer Monolith Structural Bevel Frame (Anchoring the Monolith in Scene 01)
    const frameGeo = new THREE.BoxGeometry(1.86, 2.75, 0.26);
    disposablesGeometries.push(frameGeo);
    const frameEdges = new THREE.EdgesGeometry(frameGeo);
    disposablesGeometries.push(frameEdges);
    const monolithChassisFrame = new THREE.LineSegments(frameEdges, goldWireMat);
    heroMonolithGroup.add(monolithChassisFrame);

    // Radiant Ambient Backing Halo (Illuminates in Customer Scene)
    const haloGeo = new THREE.PlaneGeometry(3.2, 3.8);
    disposablesGeometries.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    disposablesMaterials.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.z = -0.3;
    heroMonolithGroup.add(haloMesh);

    // Ambient Warm Sand Constellation Particles
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

    // Interactive pointer parallax
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
        // SCROLL-SCRUBBED KINETIC CHOREOGRAPHY FOR DIRECTION 2:
        // 01 — THE BUSINESS (p = 0)  -->  02 — THE CUSTOMER (p = 1)
        // =====================================================================

        // 1. SPATIAL POSITION & CAMERA TRACKING
        // In Business (p=0): Sits proudly at x: 2.15, y: 0.05, z: 0.2
        // During scrub: Lifts toward camera (Z-arc +1.2) and sweeps across to x: -1.75
        // In Customer (p=1): Settles at x: -1.75, y: -0.05, z: 0.4
        const targetX = THREE.MathUtils.lerp(2.15, -1.75, p);
        const targetY = THREE.MathUtils.lerp(0.05, -0.05, p) + Math.sin(elapsedTime * 0.7) * 0.06;
        const targetZ = THREE.MathUtils.lerp(0.2, 0.4, p) + Math.sin(p * Math.PI) * 1.15;

        heroMonolithGroup.position.set(targetX, targetY, targetZ);

        // Camera push: 8.2 -> 7.1 along Z-axis
        camera.position.z = 8.2 - p * 1.1;
        camera.position.x = currentMouseX * 0.25;
        camera.position.y = -currentMouseY * 0.25;
        camera.lookAt(0, 0, 0);

        // 2. MONOLITH ROTATION & 3D PERSPECTIVE
        // In Business: Upright, tilted at 18 degrees showing edge depth
        // During scrub: Rotates through 65 degrees, catching golden directional light
        // In Customer: Aligns facing camera at 6 degrees for maximum readability
        heroMonolithGroup.rotation.y = THREE.MathUtils.lerp(0.32, 0.08, p) + Math.sin(p * Math.PI) * 0.45;
        heroMonolithGroup.rotation.x = THREE.MathUtils.lerp(0.12, 0.02, p);
        heroMonolithGroup.rotation.z = THREE.MathUtils.lerp(-0.04, 0.0, p);

        // Monolith outer chassis frame fades out as slabs separate
        monolithChassisFrame.material.opacity = THREE.MathUtils.lerp(0.55, 0.0, Math.min(1, p * 2.0));

        // 3. KINETIC FISSION: MONOLITH UNLATCHES INTO 4 BOOKING WAFERS
        // In Business (p=0): Wafers are packed tightly together forming a single solid obelisk
        // In Customer (p=1): Wafers separate into 4 stepped tiers, docking behind booking steps!
        wafers.forEach((w, i) => {
          // Separation spread factor increases with scroll scrub
          const spreadFactor = Math.pow(p, 1.2);

          // Slabs expand vertically and fan out with individual Z-depth offsets
          const spreadY = (1.5 - i) * (0.64 + spreadFactor * 0.28);
          // Individual staggered Z-stepping (each wafer has independent depth)
          const stepZ = Math.sin((p * Math.PI) + i * 0.4) * 0.4 + (i * 0.06 * spreadFactor);
          // Subtle horizontal stagger fan
          const stepX = (i % 2 === 0 ? 1 : -1) * Math.sin(p * Math.PI) * 0.25;

          w.group.position.set(stepX, spreadY, stepZ);

          // Individual subtle rotational tilt per wafer during transition
          w.group.rotation.y = Math.sin(p * Math.PI + i * 0.5) * 0.18;
          w.group.rotation.x = Math.sin(p * Math.PI + i * 0.3) * 0.08;

          // Slab 4 (Checkout step) illuminates as p reaches completion
          if (i === 3) {
            const glowIntensity = THREE.MathUtils.lerp(0.4, 1.4, p);
            activeEmissiveMat.emissiveIntensity = glowIntensity + Math.sin(elapsedTime * 3.0) * 0.15;
          }
        });

        // Halo expands and illuminates in Scene 02
        haloMesh.scale.setScalar(THREE.MathUtils.lerp(1.0, 1.4, p));
        haloMat.opacity = THREE.MathUtils.lerp(0.08, 0.28, p) + Math.sin(elapsedTime * 1.6) * 0.03;

        // Dust particles gentle upward drift
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
      worldGroup.rotation.y = currentMouseX * 0.09;
      worldGroup.rotation.x = currentMouseY * 0.06;

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
