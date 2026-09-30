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

    const pointLight = new THREE.PointLight(0xe8c16a, 2.2, 10);
    pointLight.position.set(2, 0, 2);
    scene.add(pointLight);

    // Root World Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // DIRECTION 3: THE 3D SPATIAL KINETIC SEAL & ORBITAL ACCESS CARD
    // =========================================================================
    const heroSealGroup = new THREE.Group();
    worldGroup.add(heroSealGroup);

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

    const champagneBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af63,
      metalness: 0.88,
      roughness: 0.22,
    });
    disposablesMaterials.push(champagneBronzeMat);

    const goldWireMat = new THREE.LineBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.55,
    });
    disposablesMaterials.push(goldWireMat);

    const frostedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf5,
      metalness: 0.06,
      roughness: 0.12,
      transmission: 0.86,
      thickness: 1.4,
      ior: 1.52,
      transparent: true,
      opacity: 0.88,
    });
    disposablesMaterials.push(frostedGlassMat);

    const obsidianGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d3830,
      metalness: 0.4,
      roughness: 0.18,
      transmission: 0.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
    });
    disposablesMaterials.push(obsidianGlassMat);

    const emissiveGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
    });
    disposablesMaterials.push(emissiveGoldMat);

    // -------------------------------------------------------------
    // PART A: ORBITAL GIMBAL RINGS (Active in Scene 01)
    // -------------------------------------------------------------
    const gimbalGroup = new THREE.Group();
    heroSealGroup.add(gimbalGroup);

    const outerGimbalGeo = new THREE.TorusGeometry(1.68, 0.045, 32, 120);
    disposablesGeometries.push(outerGimbalGeo);
    const outerGimbalMesh = new THREE.Mesh(outerGimbalGeo, goldPolishedMat);
    gimbalGroup.add(outerGimbalMesh);

    const middleGimbalGeo = new THREE.TorusGeometry(1.36, 0.035, 32, 100);
    disposablesGeometries.push(middleGimbalGeo);
    const middleGimbalMesh = new THREE.Mesh(middleGimbalGeo, champagneBronzeMat);
    middleGimbalMesh.rotation.x = Math.PI * 0.45;
    gimbalGroup.add(middleGimbalMesh);

    // -------------------------------------------------------------
    // PART B: EXECUTIVE MONOGRAM MEDALLION (Active in Scene 01)
    // -------------------------------------------------------------
    const medallionGroup = new THREE.Group();
    heroSealGroup.add(medallionGroup);

    // Medallion Disc
    const discGeo = new THREE.CylinderGeometry(0.96, 0.96, 0.12, 64);
    disposablesGeometries.push(discGeo);
    const discMesh = new THREE.Mesh(discGeo, obsidianGlassMat);
    discMesh.rotation.x = Math.PI / 2;
    medallionGroup.add(discMesh);

    // Medallion Outer Bevel Rim
    const rimGeo = new THREE.TorusGeometry(0.96, 0.04, 32, 100);
    disposablesGeometries.push(rimGeo);
    const rimMesh = new THREE.Mesh(rimGeo, goldPolishedMat);
    medallionGroup.add(rimMesh);

    // Raised Geometric Monogram / Crest
    const crestBarGeo = new THREE.BoxGeometry(0.7, 0.06, 0.05);
    disposablesGeometries.push(crestBarGeo);
    const crest1 = new THREE.Mesh(crestBarGeo, goldPolishedMat);
    crest1.position.z = 0.07;
    crest1.rotation.z = Math.PI / 4;
    medallionGroup.add(crest1);

    const crest2 = new THREE.Mesh(crestBarGeo, goldPolishedMat);
    crest2.position.z = 0.07;
    crest2.rotation.z = -Math.PI / 4;
    medallionGroup.add(crest2);

    // Central Crystal Keystone Facet
    const keystoneGeo = new THREE.OctahedronGeometry(0.28, 0);
    disposablesGeometries.push(keystoneGeo);
    const keystoneMesh = new THREE.Mesh(keystoneGeo, frostedGlassMat);
    keystoneMesh.position.z = 0.12;
    medallionGroup.add(keystoneMesh);

    // -------------------------------------------------------------
    // PART C: VIP RESERVATION ACCESS CARD (Morphs in on Scroll for Scene 02)
    // -------------------------------------------------------------
    const keycardGroup = new THREE.Group();
    heroSealGroup.add(keycardGroup);
    keycardGroup.visible = false; // Hidden initially at p=0

    // Card Glass Body
    const cardWidth = 1.7;
    const cardHeight = 2.45;
    const cardDepth = 0.09;
    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
    disposablesGeometries.push(cardGeo);

    const cardMesh = new THREE.Mesh(cardGeo, frostedGlassMat);
    keycardGroup.add(cardMesh);

    // Gold Bevel Edge Wireframe
    const cardEdges = new THREE.EdgesGeometry(cardGeo);
    disposablesGeometries.push(cardEdges);
    const cardBezel = new THREE.LineSegments(cardEdges, goldWireMat);
    cardMesh.add(cardBezel);

    // Embossed Gold NFC / Microchip
    const chipGeo = new THREE.BoxGeometry(0.36, 0.28, 0.04);
    disposablesGeometries.push(chipGeo);
    const chipMesh = new THREE.Mesh(chipGeo, emissiveGoldMat);
    chipMesh.position.set(-0.46, 0.65, cardDepth / 2 + 0.02);
    keycardGroup.add(chipMesh);

    // Horizontal Holographic Telemetry Foil
    const foilGeo = new THREE.BoxGeometry(1.45, 0.22, 0.02);
    disposablesGeometries.push(foilGeo);
    const foilMesh = new THREE.Mesh(foilGeo, champagneBronzeMat);
    foilMesh.position.set(0, -0.65, cardDepth / 2 + 0.01);
    keycardGroup.add(foilMesh);

    // Circular Verified Stamp / Seal on the Card
    const stampGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 32);
    disposablesGeometries.push(stampGeo);
    const stampMesh = new THREE.Mesh(stampGeo, goldPolishedMat);
    stampMesh.rotation.x = Math.PI / 2;
    stampMesh.position.set(0.44, -0.65, cardDepth / 2 + 0.03);
    keycardGroup.add(stampMesh);

    // -------------------------------------------------------------
    // PART D: RADIANT AMBIENT BACKING HALO
    // -------------------------------------------------------------
    const haloGeo = new THREE.RingGeometry(1.4, 2.6, 64);
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
    heroSealGroup.add(haloMesh);

    // -------------------------------------------------------------
    // PART E: AMBIENT WARM SAND PARTICLES
    // -------------------------------------------------------------
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
        // SCROLL-SCRUBBED KINETIC CHOREOGRAPHY FOR DIRECTION 3:
        // 01 — THE BUSINESS (p = 0)  -->  02 — THE CUSTOMER (p = 1)
        // =====================================================================

        // 1. SPATIAL POSITION & CAMERA TRACKING
        // In Business (p=0): Sits at x: 2.15, y: 0.05, z: 0.2
        // During scrub: Lifts toward camera (Z-arc +1.2) and sweeps across to x: -1.75
        // In Customer (p=1): Settles at x: -1.75, y: -0.05, z: 0.4
        const targetX = THREE.MathUtils.lerp(2.15, -1.75, p);
        const targetY = THREE.MathUtils.lerp(0.05, -0.05, p) + Math.sin(elapsedTime * 0.7) * 0.06;
        const targetZ = THREE.MathUtils.lerp(0.2, 0.4, p) + Math.sin(p * Math.PI) * 1.2;

        heroSealGroup.position.set(targetX, targetY, targetZ);

        // Camera push: 8.2 -> 7.1 along Z-axis
        camera.position.z = 8.2 - p * 1.1;
        camera.position.x = currentMouseX * 0.25;
        camera.position.y = -currentMouseY * 0.25;
        camera.lookAt(0, 0, 0);

        // 2. KINETIC MORPH: EXECUTIVE MEDALLION -> VIP RESERVATION KEYCARD
        if (p < 0.48) {
          // Phase 1: Medallion & Gimbal active
          medallionGroup.visible = true;
          keycardGroup.visible = false;
          gimbalGroup.visible = true;

          const phaseProgress = p / 0.48;
          // Gimbal expands and tilts
          gimbalGroup.scale.setScalar(1.0 + phaseProgress * 0.4);
          middleGimbalMesh.rotation.y = elapsedTime * 0.3 + phaseProgress * Math.PI;
          outerGimbalMesh.rotation.z = -elapsedTime * 0.2 - phaseProgress * Math.PI * 0.8;

          // Medallion rotates on Y
          medallionGroup.rotation.y = elapsedTime * 0.2 + phaseProgress * Math.PI;
          medallionGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.08;
          medallionGroup.scale.setScalar(Math.max(0.001, 1.0 - phaseProgress * 0.3));
        } else {
          // Phase 2: VIP Reservation Keycard takes stage and flips into settlement
          medallionGroup.visible = false;
          keycardGroup.visible = true;
          gimbalGroup.visible = true;

          const phaseProgress = (p - 0.48) / 0.52; // 0 -> 1

          // Gimbal rings dissolve and drift back
          gimbalGroup.scale.setScalar(1.4 + phaseProgress * 0.3);
          outerGimbalMesh.rotation.z += 0.002;
          middleGimbalMesh.rotation.y += 0.003;
          outerGimbalMesh.material.opacity = THREE.MathUtils.lerp(0.5, 0.0, phaseProgress);
          middleGimbalMesh.material.opacity = THREE.MathUtils.lerp(0.5, 0.0, phaseProgress);

          // Keycard 3D Flip into alignment
          // Flips 180 degrees from edge-on (Math.PI / 2) to facing front with subtle luxury yaw
          const flipAngle = THREE.MathUtils.lerp(Math.PI * 0.6, 0.12, Math.pow(phaseProgress, 0.8));
          keycardGroup.rotation.y = flipAngle;
          keycardGroup.rotation.x = THREE.MathUtils.lerp(0.2, 0.04, phaseProgress);
          keycardGroup.rotation.z = THREE.MathUtils.lerp(-0.15, 0.0, phaseProgress);
          keycardGroup.scale.setScalar(THREE.MathUtils.lerp(0.65, 1.0, Math.pow(phaseProgress, 0.7)));

          // Chip & Stamp Emissive Pulse when Customer composition docks
          const glowIntensity = THREE.MathUtils.lerp(0.4, 1.5, phaseProgress);
          emissiveGoldMat.emissiveIntensity = glowIntensity + Math.sin(elapsedTime * 3.0) * 0.18;
        }

        // Halo expands and illuminates in Scene 02
        haloMesh.scale.setScalar(THREE.MathUtils.lerp(1.0, 1.45, p));
        haloMat.opacity = THREE.MathUtils.lerp(0.08, 0.32, p) + Math.sin(elapsedTime * 1.6) * 0.04;

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
