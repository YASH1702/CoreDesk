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

    // Perspective camera with architectural lens
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);

    // Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Lighting (Warm Sand & Luxury Architectural Illumination)
    const ambientLight = new THREE.AmbientLight(0xfffbf2, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(6, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc69a4b, 2.4);
    rimLight.position.set(-6, 3, -2);
    scene.add(rimLight);

    const deskSpotLight = new THREE.PointLight(0xfbebc4, 1.8, 8);
    deskSpotLight.position.set(1.5, 2.0, 1.0);
    scene.add(deskSpotLight);

    // Root World Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // STORY-DRIVEN ARCHITECTURAL DIORAMA:
    // 01 — THE LIVING BUSINESS WORKSPACE  -->  02 — CUSTOMER WALKS IN TO BOOK
    // =========================================================================
    const dioramaGroup = new THREE.Group();
    worldGroup.add(dioramaGroup);

    // Disposable tracking lists
    const disposablesGeometries: THREE.BufferGeometry[] = [];
    const disposablesMaterials: THREE.Material[] = [];

    // Shared Luxury Warm Sand Materials
    const stonePlinthMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      roughness: 0.35,
      metalness: 0.08,
    });
    disposablesMaterials.push(stonePlinthMat);

    const plinthGoldBorderMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      metalness: 0.92,
      roughness: 0.2,
    });
    disposablesMaterials.push(plinthGoldBorderMat);

    const deskSurfaceMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.22,
      metalness: 0.05,
    });
    disposablesMaterials.push(deskSurfaceMat);

    const goldChassisMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      metalness: 0.95,
      roughness: 0.18,
    });
    disposablesMaterials.push(goldChassisMat);

    const bronzeChassisMat = new THREE.MeshStandardMaterial({
      color: 0x8f6b2f,
      metalness: 0.88,
      roughness: 0.25,
    });
    disposablesMaterials.push(bronzeChassisMat);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf5,
      metalness: 0.05,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    disposablesMaterials.push(glassMat);

    const screenGlowMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf0,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });
    disposablesMaterials.push(screenGlowMat);

    const terminalActiveMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    disposablesMaterials.push(terminalActiveMat);

    // Character Materials
    const alabasterSkinMat = new THREE.MeshStandardMaterial({
      color: 0xf8f4ec,
      roughness: 0.32,
      metalness: 0.02,
    });
    disposablesMaterials.push(alabasterSkinMat);

    const specialistBlazerMat = new THREE.MeshStandardMaterial({
      color: 0x2a2927, // Executive dark slate/charcoal
      roughness: 0.65,
    });
    disposablesMaterials.push(specialistBlazerMat);

    const leadBlazerMat = new THREE.MeshStandardMaterial({
      color: 0xb7863d, // Warm Sand camel coat
      roughness: 0.55,
      metalness: 0.1,
    });
    disposablesMaterials.push(leadBlazerMat);

    const customerCoatMat = new THREE.MeshStandardMaterial({
      color: 0x364052, // Sophisticated client navy coat
      roughness: 0.55,
    });
    disposablesMaterials.push(customerCoatMat);

    const customerTrousersMat = new THREE.MeshStandardMaterial({
      color: 0x1f242e,
      roughness: 0.6,
    });
    disposablesMaterials.push(customerTrousersMat);

    // -------------------------------------------------------------
    // 1. ARCHITECTURAL STUDIO PLINTH (Floating Platform)
    // -------------------------------------------------------------
    const plinthGroup = new THREE.Group();
    dioramaGroup.add(plinthGroup);

    // Base Slab
    const plinthGeo = new THREE.BoxGeometry(5.2, 0.22, 3.8);
    disposablesGeometries.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, stonePlinthMat);
    plinthMesh.position.y = -1.1;
    plinthMesh.receiveShadow = true;
    plinthGroup.add(plinthMesh);

    // Perimeter Gold Accent Trim
    const plinthTrimGeo = new THREE.BoxGeometry(5.26, 0.04, 3.86);
    disposablesGeometries.push(plinthTrimGeo);
    const plinthTrimMesh = new THREE.Mesh(plinthTrimGeo, plinthGoldBorderMat);
    plinthTrimMesh.position.y = -1.0;
    plinthGroup.add(plinthTrimMesh);

    // -------------------------------------------------------------
    // 2. EXECUTIVE WORKSTATION (Business Operations Desk)
    // -------------------------------------------------------------
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0.6, -0.98, -0.3);
    dioramaGroup.add(deskGroup);

    // Desktop
    const deskGeo = new THREE.BoxGeometry(2.3, 0.08, 1.15);
    disposablesGeometries.push(deskGeo);
    const deskMesh = new THREE.Mesh(deskGeo, deskSurfaceMat);
    deskMesh.position.y = 0.72;
    deskMesh.castShadow = true;
    deskMesh.receiveShadow = true;
    deskGroup.add(deskMesh);

    // Gold Tapered Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.022, 0.016, 0.72, 16);
    disposablesGeometries.push(legGeo);
    const legCoords = [
      { x: 1.05, z: 0.48 },
      { x: -1.05, z: 0.48 },
      { x: 1.05, z: -0.48 },
      { x: -1.05, z: -0.48 },
    ];
    legCoords.forEach((c) => {
      const leg = new THREE.Mesh(legGeo, goldChassisMat);
      leg.position.set(c.x, 0.36, c.z);
      deskGroup.add(leg);
    });

    // Ultra-thin Workspace Monitor
    const monitorStandGeo = new THREE.CylinderGeometry(0.018, 0.022, 0.28, 16);
    disposablesGeometries.push(monitorStandGeo);
    const monitorStand = new THREE.Mesh(monitorStandGeo, goldChassisMat);
    monitorStand.position.set(0, 0.86, -0.15);
    deskGroup.add(monitorStand);

    const monitorGeo = new THREE.BoxGeometry(0.95, 0.55, 0.025);
    disposablesGeometries.push(monitorGeo);
    const monitorMesh = new THREE.Mesh(monitorGeo, bronzeChassisMat);
    monitorMesh.position.set(0, 1.18, -0.15);
    deskGroup.add(monitorMesh);

    const screenGeo = new THREE.PlaneGeometry(0.9, 0.5);
    disposablesGeometries.push(screenGeo);
    const screenMesh = new THREE.Mesh(screenGeo, screenGlowMat);
    screenMesh.position.set(0, 1.18, -0.135);
    deskGroup.add(screenMesh);

    // Slim Keyboard and Trackpad
    const keyboardGeo = new THREE.BoxGeometry(0.52, 0.012, 0.16);
    disposablesGeometries.push(keyboardGeo);
    const keyboardMesh = new THREE.Mesh(keyboardGeo, goldChassisMat);
    keyboardMesh.position.set(0, 0.77, 0.15);
    deskGroup.add(keyboardMesh);

    // Minimal Desk Plant (Ceramic pot with architectural sphere leaf)
    const potGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.12, 16);
    const leafGeo = new THREE.SphereGeometry(0.09, 16, 16);
    disposablesGeometries.push(potGeo, leafGeo);
    const potMesh = new THREE.Mesh(potGeo, stonePlinthMat);
    potMesh.position.set(0.85, 0.82, -0.2);
    deskGroup.add(potMesh);
    const leafMesh = new THREE.Mesh(leafGeo, bronzeChassisMat);
    leafMesh.position.set(0.85, 0.94, -0.2);
    deskGroup.add(leafMesh);

    // -------------------------------------------------------------
    // 3. CONSULTATION / CLIENT CHECK-IN COUNTER (Customer Destination)
    // -------------------------------------------------------------
    const counterGroup = new THREE.Group();
    counterGroup.position.set(-1.1, -0.98, 0.6);
    dioramaGroup.add(counterGroup);

    // Fluted Glass & Stone Consultation Podium
    const counterGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.95, 32);
    disposablesGeometries.push(counterGeo);
    const counterMesh = new THREE.Mesh(counterGeo, stonePlinthMat);
    counterMesh.position.y = 0.475;
    counterMesh.castShadow = true;
    counterGroup.add(counterMesh);

    const counterGoldRimGeo = new THREE.TorusGeometry(0.56, 0.02, 16, 48);
    disposablesGeometries.push(counterGoldRimGeo);
    const counterRim = new THREE.Mesh(counterGoldRimGeo, goldChassisMat);
    counterRim.rotation.x = Math.PI / 2;
    counterRim.position.y = 0.95;
    counterGroup.add(counterRim);

    // Interactive Booking Terminal / Tablet on Counter
    const terminalGeo = new THREE.BoxGeometry(0.38, 0.28, 0.03);
    disposablesGeometries.push(terminalGeo);
    const terminalMesh = new THREE.Mesh(terminalGeo, terminalActiveMat);
    terminalMesh.position.set(0, 1.08, 0);
    terminalMesh.rotation.x = -Math.PI * 0.25;
    counterGroup.add(terminalMesh);

    // Terminal Confirmation Radiant Halo
    const confirmHaloGeo = new THREE.RingGeometry(0.4, 0.75, 32);
    disposablesGeometries.push(confirmHaloGeo);
    const confirmHaloMat = new THREE.MeshBasicMaterial({
      color: 0xc69a4b,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    disposablesMaterials.push(confirmHaloMat);
    const confirmHaloMesh = new THREE.Mesh(confirmHaloGeo, confirmHaloMat);
    confirmHaloMesh.position.set(0, 1.15, 0);
    confirmHaloMesh.rotation.x = -Math.PI * 0.25;
    counterGroup.add(confirmHaloMesh);

    // -------------------------------------------------------------
    // 4. CHARACTER 1: SPECIALIST (Seated at Desk Typing / Operating)
    // -------------------------------------------------------------
    const specialistGroup = new THREE.Group();
    specialistGroup.position.set(0.6, -0.98, 0.35);
    dioramaGroup.add(specialistGroup);

    // Chair
    const chairSeatGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 24);
    const chairBackGeo = new THREE.BoxGeometry(0.4, 0.45, 0.05);
    const chairStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 16);
    disposablesGeometries.push(chairSeatGeo, chairBackGeo, chairStemGeo);

    const chairSeat = new THREE.Mesh(chairSeatGeo, deskSurfaceMat);
    chairSeat.position.y = 0.45;
    specialistGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(chairBackGeo, deskSurfaceMat);
    chairBack.position.set(0, 0.72, 0.22);
    specialistGroup.add(chairBack);

    const chairStem = new THREE.Mesh(chairStemGeo, goldChassisMat);
    chairStem.position.y = 0.22;
    specialistGroup.add(chairStem);

    // Specialist Body Rig
    const specTorsoGeo = new THREE.CapsuleGeometry(0.18, 0.32, 8, 16);
    disposablesGeometries.push(specTorsoGeo);
    const specTorso = new THREE.Mesh(specTorsoGeo, specialistBlazerMat);
    specTorso.position.y = 0.82;
    specTorso.rotation.x = 0.05;
    specialistGroup.add(specTorso);

    const headGeo = new THREE.SphereGeometry(0.13, 24, 24);
    disposablesGeometries.push(headGeo);
    const specHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    specHead.position.set(0, 1.15, 0.02);
    specialistGroup.add(specHead);

    // Specialist Arms resting towards keyboard
    const armGeo = new THREE.CapsuleGeometry(0.045, 0.26, 6, 12);
    disposablesGeometries.push(armGeo);
    const specLeftArm = new THREE.Mesh(armGeo, specialistBlazerMat);
    specLeftArm.position.set(-0.22, 0.8, -0.1);
    specLeftArm.rotation.set(0.65, 0, 0.2);
    specialistGroup.add(specLeftArm);

    const specRightArm = new THREE.Mesh(armGeo, specialistBlazerMat);
    specRightArm.position.set(0.22, 0.8, -0.1);
    specRightArm.rotation.set(0.65, 0, -0.2);
    specialistGroup.add(specRightArm);

    // -------------------------------------------------------------
    // 5. CHARACTER 2: OPERATIONS LEAD (Standing & Coordinating)
    // -------------------------------------------------------------
    const leadGroup = new THREE.Group();
    leadGroup.position.set(1.9, -0.98, -0.2);
    leadGroup.rotation.y = -Math.PI * 0.35;
    dioramaGroup.add(leadGroup);

    // Lead Legs
    const legCapsuleGeo = new THREE.CapsuleGeometry(0.06, 0.5, 6, 12);
    disposablesGeometries.push(legCapsuleGeo);
    const leadLegLeft = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    leadLegLeft.position.set(-0.09, 0.3, 0);
    leadGroup.add(leadLegLeft);

    const leadLegRight = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    leadLegRight.position.set(0.09, 0.3, 0);
    leadGroup.add(leadLegRight);

    // Lead Torso (Camel coat)
    const leadTorsoGeo = new THREE.CapsuleGeometry(0.2, 0.42, 8, 16);
    disposablesGeometries.push(leadTorsoGeo);
    const leadTorso = new THREE.Mesh(leadTorsoGeo, leadBlazerMat);
    leadTorso.position.y = 0.88;
    leadGroup.add(leadTorso);

    const leadHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    leadHead.position.set(0, 1.25, 0);
    leadGroup.add(leadHead);

    // Lead Tablet in hand
    const tabletGeo = new THREE.BoxGeometry(0.18, 0.24, 0.02);
    disposablesGeometries.push(tabletGeo);
    const tabletMesh = new THREE.Mesh(tabletGeo, goldChassisMat);
    tabletMesh.position.set(-0.25, 0.82, 0.2);
    tabletMesh.rotation.set(0.4, 0.2, 0.1);
    leadGroup.add(tabletMesh);

    // -------------------------------------------------------------
    // 6. CHARACTER 3: THE CUSTOMER (Walks In as You Scroll!)
    // -------------------------------------------------------------
    const customerGroup = new THREE.Group();
    // Starting position: off to the right / entrance corridor
    customerGroup.position.set(2.8, -0.98, 1.8);
    dioramaGroup.add(customerGroup);

    // Hinged Hip Root for Leg Stride Animation
    const customerLeftLegGroup = new THREE.Group();
    customerLeftLegGroup.position.set(-0.1, 0.55, 0);
    customerGroup.add(customerLeftLegGroup);
    const custLegL = new THREE.Mesh(legCapsuleGeo, customerTrousersMat);
    custLegL.position.y = -0.25;
    customerLeftLegGroup.add(custLegL);

    const customerRightLegGroup = new THREE.Group();
    customerRightLegGroup.position.set(0.1, 0.55, 0);
    customerGroup.add(customerRightLegGroup);
    const custLegR = new THREE.Mesh(legCapsuleGeo, customerTrousersMat);
    custLegR.position.y = -0.25;
    customerRightLegGroup.add(custLegR);

    // Customer Torso & Head
    const custTorsoGeo = new THREE.CapsuleGeometry(0.19, 0.42, 8, 16);
    disposablesGeometries.push(custTorsoGeo);
    const custTorso = new THREE.Mesh(custTorsoGeo, customerCoatMat);
    custTorso.position.y = 0.88;
    customerGroup.add(custTorso);

    const custHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    custHead.position.set(0, 1.25, 0);
    customerGroup.add(custHead);

    // Hinged Arms for Natural Walking Swing
    const customerLeftArmGroup = new THREE.Group();
    customerLeftArmGroup.position.set(-0.24, 1.0, 0);
    customerGroup.add(customerLeftArmGroup);
    const custArmL = new THREE.Mesh(armGeo, customerCoatMat);
    custArmL.position.y = -0.16;
    customerLeftArmGroup.add(custArmL);

    const customerRightArmGroup = new THREE.Group();
    customerRightArmGroup.position.set(0.24, 1.0, 0);
    customerGroup.add(customerRightArmGroup);
    const custArmR = new THREE.Mesh(armGeo, customerCoatMat);
    custArmR.position.y = -0.16;
    customerRightArmGroup.add(custArmR);

    // Customer holding gold phone / keycard to book
    const custPhoneGeo = new THREE.BoxGeometry(0.08, 0.14, 0.015);
    disposablesGeometries.push(custPhoneGeo);
    const custPhone = new THREE.Mesh(custPhoneGeo, goldChassisMat);
    custPhone.position.set(0, -0.28, 0.08);
    customerRightArmGroup.add(custPhone);

    // -------------------------------------------------------------
    // 7. AMBIENT WARM SAND PARTICLES & BACKGROUND LIGHT
    // -------------------------------------------------------------
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; xOffset: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;

      particleVelocities.push({
        y: 0.0015 + Math.random() * 0.002,
        xOffset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    disposablesGeometries.push(particleGeometry);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc69a4b,
      size: 0.038,
      transparent: true,
      opacity: 0.35,
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
        // STORY-DRIVEN KINETIC CHOREOGRAPHY:
        // Scene 01 (p=0): Business team working at desks
        // Scrubbing (p: 0 -> 1): Customer physically walks in across the floor
        // Scene 02 (p=1): Customer arrives at booking counter, confirms check-in
        // =====================================================================

        // 1. DIORAMA PERSPECTIVE ROTATION & GLIDE
        // In Business: Sits at x: 1.7, angled to highlight the working team
        // During scrub: Diorama turns gracefully to face the entrance & counter
        // In Customer: Settles at x: -1.4, perfectly framing the booking steps!
        const dioramaX = THREE.MathUtils.lerp(1.7, -1.4, p);
        const dioramaY = THREE.MathUtils.lerp(0.05, 0.0, p);
        const dioramaZ = THREE.MathUtils.lerp(0.0, 0.35, p) + Math.sin(p * Math.PI) * 0.6;
        dioramaGroup.position.set(dioramaX, dioramaY, dioramaZ);

        // Architectural Camera Tracking
        camera.position.z = 8.5 - p * 1.0;
        camera.position.x = currentMouseX * 0.22;
        camera.position.y = 1.2 - currentMouseY * 0.2;
        camera.lookAt(0, 0, 0);

        // Diorama Gentle Turntable Yaw
        dioramaGroup.rotation.y = THREE.MathUtils.lerp(0.28, -0.32, p);
        dioramaGroup.rotation.x = THREE.MathUtils.lerp(0.12, 0.08, p);

        // 2. CHARACTER 1 (Seated Specialist) Idle Typing & Greeting Glance
        // Subtle arm typing bounce
        specLeftArm.rotation.x = 0.65 + Math.sin(elapsedTime * 4.0) * 0.04;
        specRightArm.rotation.x = 0.65 + Math.cos(elapsedTime * 4.5) * 0.04;
        // Head turns toward customer as they approach the desk
        specHead.rotation.y = THREE.MathUtils.lerp(0, -0.55, Math.pow(p, 1.4));

        // 3. CHARACTER 2 (Operations Lead) Shift Glance
        leadHead.rotation.y = THREE.MathUtils.lerp(0, -0.7, p) + Math.sin(elapsedTime * 0.8) * 0.05;

        // 4. CHARACTER 3 (THE CUSTOMER) WALKING STRIDE & ENTRANCE PATH
        // Start: x: 2.8, z: 1.8 (outside entrance corridor)
        // End: x: -1.1, z: 1.3 (standing right at the consultation podium!)
        const custTargetX = THREE.MathUtils.lerp(2.8, -1.1, p);
        const custTargetZ = THREE.MathUtils.lerp(1.8, 1.35, p);
        customerGroup.position.set(custTargetX, -0.98, custTargetZ);

        // Turn character body toward the desk as they walk
        const walkAngle = THREE.MathUtils.lerp(-Math.PI * 0.6, -Math.PI * 0.45, p);
        customerGroup.rotation.y = walkAngle;

        // Dynamic Walking Leg & Arm Swing (Linked to scroll scrub velocity + gentle idle)
        const walkCycle = p * Math.PI * 12.0;
        const isWalking = p > 0.02 && p < 0.96;
        const strideAmp = isWalking ? 0.6 : 0.05;

        customerLeftLegGroup.rotation.x = Math.sin(walkCycle) * strideAmp;
        customerRightLegGroup.rotation.x = -Math.sin(walkCycle) * strideAmp;

        customerLeftArmGroup.rotation.x = -Math.sin(walkCycle) * (strideAmp * 0.8);

        if (p > 0.75) {
          // Customer raises hand with phone towards booking terminal to verify
          const reachProgress = (p - 0.75) / 0.25;
          customerRightArmGroup.rotation.x = THREE.MathUtils.lerp(0, -0.75, reachProgress);
          customerRightArmGroup.rotation.y = THREE.MathUtils.lerp(0, -0.35, reachProgress);
        } else {
          customerRightArmGroup.rotation.x = Math.sin(walkCycle) * (strideAmp * 0.8);
          customerRightArmGroup.rotation.y = 0;
        }

        // 5. TERMINAL CONFIRMATION HALO PULSE (When customer reaches Step 4)
        if (p > 0.7) {
          const pulse = (p - 0.7) / 0.3;
          terminalActiveMat.emissiveIntensity = 0.5 + pulse * 1.5 + Math.sin(elapsedTime * 3.5) * 0.2;
          confirmHaloMat.opacity = pulse * 0.35 + Math.sin(elapsedTime * 2.0) * 0.05;
          confirmHaloMesh.scale.setScalar(1.0 + pulse * 0.5);
        } else {
          terminalActiveMat.emissiveIntensity = 0.4;
          confirmHaloMat.opacity = 0.05;
          confirmHaloMesh.scale.setScalar(1.0);
        }

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
      worldGroup.rotation.y = currentMouseX * 0.08;
      worldGroup.rotation.x = currentMouseY * 0.05;

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
