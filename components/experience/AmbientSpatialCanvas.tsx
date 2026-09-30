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

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting (Warm Sand & Luxury Champagne Gold highlights)
    const ambientLight = new THREE.AmbientLight(0xfdf8ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc69a4b, 2.2);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb7863d, 1.2);
    rimLight.position.set(-6, -4, 2);
    scene.add(rimLight);

    // Main 3D Parent Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. ASTROLABE / LUXURY ORBITAL RING (Horology & Precision Executive Motif)
    const ringGeo = new THREE.TorusGeometry(4.8, 0.014, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.26,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI * 0.38;
    orbitalRing.rotation.y = Math.PI * 0.15;
    worldGroup.add(orbitalRing);

    // Secondary subtle nested ring
    const innerRingGeo = new THREE.TorusGeometry(3.6, 0.008, 16, 100);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xe0caa4,
      transparent: true,
      opacity: 0.18,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI * 0.25;
    innerRing.rotation.z = Math.PI * 0.1;
    worldGroup.add(innerRing);

    // 2. FLOATING ARCHITECTURAL CRYSTALS (Warm Sand Glass Facets)
    const crystalGroup = new THREE.Group();
    worldGroup.add(crystalGroup);

    interface CrystalInstance {
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
    }

    const crystals: CrystalInstance[] = [];

    // Distinct polyhedral shapes for architectural depth
    const geometries = [
      new THREE.IcosahedronGeometry(0.75, 0),
      new THREE.OctahedronGeometry(0.65, 0),
      new THREE.TetrahedronGeometry(0.6, 0),
      new THREE.IcosahedronGeometry(0.45, 0),
      new THREE.OctahedronGeometry(0.5, 0),
    ];

    // Translucent Warm Sand Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbf8f3,
      metalness: 0.1,
      roughness: 0.18,
      transmission: 0.75,
      thickness: 0.6,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.32,
    });

    // Positions distributed across the background
    const crystalCoords = [
      { x: -5.2, y: 2.2, z: -1.5, scale: 0.9 },
      { x: 5.6, y: 2.8, z: -2.0, scale: 1.1 },
      { x: -4.8, y: -2.5, z: -1.0, scale: 0.75 },
      { x: 4.9, y: -2.2, z: -0.5, scale: 0.85 },
      { x: -2.0, y: 3.5, z: -3.0, scale: 0.6 },
      { x: 2.2, y: -3.4, z: -2.5, scale: 0.7 },
      { x: 6.2, y: 0.2, z: -3.5, scale: 1.2 },
      { x: -6.0, y: -0.4, z: -2.8, scale: 0.8 },
    ];

    crystalCoords.forEach((coord, i) => {
      const geo = geometries[i % geometries.length];
      const mesh = new THREE.Mesh(geo, glassMaterial);

      // Gold wireframe cage overlay for precision crystalline finish
      const wireframeGeo = new THREE.WireframeGeometry(geo);
      const wireframeLine = new THREE.LineSegments(wireframeGeo, wireframeMaterial);
      mesh.add(wireframeLine);

      mesh.position.set(coord.x, coord.y, coord.z);
      mesh.scale.setScalar(coord.scale);
      crystalGroup.add(mesh);

      crystals.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.007,
          z: (Math.random() - 0.5) * 0.005,
        },
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: coord.y,
      });
    });

    // 3. FLOATING GOLD DUST PARTICLES (Warm Ambient Constellation)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; xOffset: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      particleVelocities.push({
        y: 0.0015 + Math.random() * 0.003,
        xOffset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc69a4b,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particles);

    // 4. INTERACTIVE MOUSE PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 5. ANIMATION LOOP WITH TAB VISIBILITY SUSPENSION
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

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const scrollOffset = scrollProgressRef.current;

      if (!prefersReducedMotion) {
        // Orbit rings rotation with subtle scroll scrub progression
        orbitalRing.rotation.z += 0.001;
        orbitalRing.rotation.y = Math.PI * 0.15 + scrollOffset * 0.5;
        innerRing.rotation.x = -Math.PI * 0.25 - scrollOffset * 0.4;

        // Crystals floating & tumbling
        crystals.forEach((item) => {
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;

          // Gentle sinusoidal vertical drift
          item.mesh.position.y =
            item.baseY + Math.sin(elapsedTime * item.floatSpeed + item.floatOffset) * 0.18;
        });

        // Dust particles gentle upward drift & drift reset
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += Math.sin(elapsedTime * particleVelocities[i].speed + particleVelocities[i].xOffset) * 0.0008;

          // Loop particles when they drift above top threshold
          if (positions[i * 3 + 1] > 6.5) {
            positions[i * 3 + 1] = -6.5;
            positions[i * 3] = (Math.random() - 0.5) * 16;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Parallax camera & world tilt with scroll-scrubbed camera push
      worldGroup.rotation.y = currentMouseX * 0.14;
      worldGroup.rotation.x = currentMouseY * 0.09;
      camera.position.x = currentMouseX * 0.35;
      camera.position.y = -currentMouseY * 0.35;
      camera.position.z = 9.0 - scrollOffset * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 6. RESOURCE CLEANUP & MEMORY DISPOSAL
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Geometries disposal
      ringGeo.dispose();
      innerRingGeo.dispose();
      particleGeometry.dispose();
      geometries.forEach((g) => g.dispose());

      // Materials disposal
      ringMat.dispose();
      innerRingMat.dispose();
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      particleMaterial.dispose();

      // Renderer disposal
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
