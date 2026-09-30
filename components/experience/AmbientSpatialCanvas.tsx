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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.15, 8.2);

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

    // Dynamic Architectural Lighting
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
    deskSpotLight.position.set(0.65, 1.8, -0.1);
    scene.add(deskSpotLight);

    // Root World Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // LIVING ARCHITECTURAL DIORAMA
    // =========================================================================
    const dioramaGroup = new THREE.Group();
    worldGroup.add(dioramaGroup);

    const responsiveScale = width < 768 ? 0.70 : width < 1024 ? 0.82 : 1.0;
    dioramaGroup.scale.setScalar(responsiveScale);

    // Disposable tracking lists
    const disposablesGeometries: THREE.BufferGeometry[] = [];
    const disposablesMaterials: THREE.Material[] = [];

    // Shared Luxury Warm Sand Materials
    const stonePlinthMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      roughness: 0.32,
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
      roughness: 0.20,
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

    const paperVoucherMat = new THREE.MeshStandardMaterial({
      color: 0xfffef8,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });
    disposablesMaterials.push(paperVoucherMat);

    const plantLeafMat = new THREE.MeshStandardMaterial({
      color: 0x4f5e43, // Muted architectural olive
      roughness: 0.45,
      metalness: 0.05,
    });
    disposablesMaterials.push(plantLeafMat);

    // Character Materials
    const alabasterSkinMat = new THREE.MeshStandardMaterial({
      color: 0xf8f4ec,
      roughness: 0.32,
      metalness: 0.02,
    });
    disposablesMaterials.push(alabasterSkinMat);

    const specialistBlazerMat = new THREE.MeshStandardMaterial({
      color: 0x2a2927,
      roughness: 0.65,
    });
    disposablesMaterials.push(specialistBlazerMat);

    const leadBlazerMat = new THREE.MeshStandardMaterial({
      color: 0xb7863d,
      roughness: 0.55,
      metalness: 0.1,
    });
    disposablesMaterials.push(leadBlazerMat);

    const customerCoatMat = new THREE.MeshStandardMaterial({
      color: 0x364052,
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

    const plinthGeo = new THREE.BoxGeometry(5.2, 0.22, 3.8);
    disposablesGeometries.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, stonePlinthMat);
    plinthMesh.position.y = -1.1;
    plinthMesh.receiveShadow = true;
    plinthGroup.add(plinthMesh);

    const plinthTrimGeo = new THREE.BoxGeometry(5.26, 0.04, 3.86);
    disposablesGeometries.push(plinthTrimGeo);
    const plinthTrimMesh = new THREE.Mesh(plinthTrimGeo, plinthGoldBorderMat);
    plinthTrimMesh.position.y = -1.0;
    plinthGroup.add(plinthTrimMesh);

    // -------------------------------------------------------------
    // 2. EXECUTIVE WORKSTATION & LIVING DESK PROPS
    // -------------------------------------------------------------
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0.65, -0.98, -0.3);
    dioramaGroup.add(deskGroup);

    const deskGeo = new THREE.BoxGeometry(2.1, 0.08, 1.05);
    disposablesGeometries.push(deskGeo);
    const deskMesh = new THREE.Mesh(deskGeo, deskSurfaceMat);
    deskMesh.position.y = 0.72;
    deskMesh.castShadow = true;
    deskMesh.receiveShadow = true;
    deskGroup.add(deskMesh);

    const legGeo = new THREE.CylinderGeometry(0.02, 0.015, 0.72, 16);
    disposablesGeometries.push(legGeo);
    const legCoords = [
      { x: 0.95, z: 0.42 },
      { x: -0.95, z: 0.42 },
      { x: 0.95, z: -0.42 },
      { x: -0.95, z: -0.42 },
    ];
    legCoords.forEach((c) => {
      const leg = new THREE.Mesh(legGeo, goldChassisMat);
      leg.position.set(c.x, 0.36, c.z);
      deskGroup.add(leg);
    });

    // Ultra-thin Workspace Monitor
    const monitorStandGeo = new THREE.CylinderGeometry(0.016, 0.02, 0.26, 16);
    disposablesGeometries.push(monitorStandGeo);
    const monitorStand = new THREE.Mesh(monitorStandGeo, goldChassisMat);
    monitorStand.position.set(0, 0.85, -0.15);
    deskGroup.add(monitorStand);

    const monitorGeo = new THREE.BoxGeometry(0.9, 0.52, 0.025);
    disposablesGeometries.push(monitorGeo);
    const monitorMesh = new THREE.Mesh(monitorGeo, bronzeChassisMat);
    monitorMesh.position.set(0, 1.16, -0.15);
    deskGroup.add(monitorMesh);

    const screenGeo = new THREE.PlaneGeometry(0.85, 0.48);
    disposablesGeometries.push(screenGeo);
    const screenMesh = new THREE.Mesh(screenGeo, screenGlowMat);
    screenMesh.position.set(0, 1.16, -0.135);
    deskGroup.add(screenMesh);

    const keyboardGeo = new THREE.BoxGeometry(0.5, 0.012, 0.15);
    disposablesGeometries.push(keyboardGeo);
    const keyboardMesh = new THREE.Mesh(keyboardGeo, goldChassisMat);
    keyboardMesh.position.set(0, 0.77, 0.15);
    deskGroup.add(keyboardMesh);

    // NEW LIVING ELEMENT: Brushed Gold Cantilever Desk Lamp
    const lampBaseGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.015, 16);
    const lampStemGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.38, 12);
    const lampShadeGeo = new THREE.ConeGeometry(0.06, 0.09, 16);
    disposablesGeometries.push(lampBaseGeo, lampStemGeo, lampShadeGeo);

    const lampBase = new THREE.Mesh(lampBaseGeo, goldChassisMat);
    lampBase.position.set(-0.85, 0.77, -0.2);
    deskGroup.add(lampBase);

    const lampStem = new THREE.Mesh(lampStemGeo, goldChassisMat);
    lampStem.position.set(-0.85, 0.95, -0.2);
    lampStem.rotation.z = -0.15;
    deskGroup.add(lampStem);

    const lampShade = new THREE.Mesh(lampShadeGeo, goldChassisMat);
    lampShade.position.set(-0.78, 1.12, -0.12);
    lampShade.rotation.z = Math.PI * 0.75;
    deskGroup.add(lampShade);

    // NEW LIVING ELEMENT: Matte Alabaster Porcelain Espresso Cup & Rising Steam
    const cupGeo = new THREE.CylinderGeometry(0.035, 0.025, 0.05, 16);
    const saucerGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.008, 16);
    disposablesGeometries.push(cupGeo, saucerGeo);

    const saucer = new THREE.Mesh(saucerGeo, stonePlinthMat);
    saucer.position.set(0.72, 0.765, 0.2);
    deskGroup.add(saucer);

    const cup = new THREE.Mesh(cupGeo, stonePlinthMat);
    cup.position.set(0.72, 0.79, 0.2);
    deskGroup.add(cup);

    // Wispy Steam Particles
    const steamParticleCount = 4;
    const steamParticles: THREE.Mesh[] = [];
    const steamGeo = new THREE.SphereGeometry(0.015, 8, 8);
    disposablesGeometries.push(steamGeo);
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xfffcf7,
      transparent: true,
      opacity: 0.25,
    });
    disposablesMaterials.push(steamMat);

    for (let i = 0; i < steamParticleCount; i++) {
      const sp = new THREE.Mesh(steamGeo, steamMat);
      sp.position.set(0.72, 0.82 + i * 0.04, 0.2);
      deskGroup.add(sp);
      steamParticles.push(sp);
    }

    // -------------------------------------------------------------
    // 3. CORNER ARCHITECTURAL PLANT (Botanical Living Detail)
    // -------------------------------------------------------------
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-2.0, -0.98, -1.2);
    dioramaGroup.add(plantGroup);

    const planterGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.55, 24);
    disposablesGeometries.push(planterGeo);
    const planter = new THREE.Mesh(planterGeo, stonePlinthMat);
    planter.position.y = 0.275;
    planter.castShadow = true;
    plantGroup.add(planter);

    const plantLeaves: THREE.Mesh[] = [];
    const leafGeo = new THREE.ConeGeometry(0.18, 0.45, 5);
    disposablesGeometries.push(leafGeo);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, plantLeafMat);
      leaf.position.set(Math.cos(angle) * 0.12, 0.65 + i * 0.08, Math.sin(angle) * 0.12);
      leaf.rotation.set(0.4, angle, 0.3);
      plantGroup.add(leaf);
      plantLeaves.push(leaf);
    }

    // -------------------------------------------------------------
    // 4. CONSULTATION PODIUM & PRINTED PAPER VOUCHER
    // -------------------------------------------------------------
    const counterGroup = new THREE.Group();
    counterGroup.position.set(-0.75, -0.98, 0.45);
    dioramaGroup.add(counterGroup);

    const counterGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.95, 32);
    disposablesGeometries.push(counterGeo);
    const counterMesh = new THREE.Mesh(counterGeo, stonePlinthMat);
    counterMesh.position.y = 0.475;
    counterMesh.castShadow = true;
    counterGroup.add(counterMesh);

    const counterGoldRimGeo = new THREE.TorusGeometry(0.51, 0.02, 16, 48);
    disposablesGeometries.push(counterGoldRimGeo);
    const counterRim = new THREE.Mesh(counterGoldRimGeo, goldChassisMat);
    counterRim.rotation.x = Math.PI / 2;
    counterRim.position.y = 0.95;
    counterGroup.add(counterRim);

    const terminalGeo = new THREE.BoxGeometry(0.36, 0.26, 0.03);
    disposablesGeometries.push(terminalGeo);
    const terminalMesh = new THREE.Mesh(terminalGeo, terminalActiveMat);
    terminalMesh.position.set(0, 1.08, 0);
    terminalMesh.rotation.x = -Math.PI * 0.25;
    counterGroup.add(terminalMesh);

    const confirmHaloGeo = new THREE.RingGeometry(0.38, 0.72, 32);
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

    // NEW LIVING ELEMENT: Physical Paper Appointment Voucher Ribbon
    const ticketGroup = new THREE.Group();
    ticketGroup.position.set(0, 0.96, 0.26);
    counterGroup.add(ticketGroup);

    const ticketGeo = new THREE.PlaneGeometry(0.24, 0.45, 8, 8);
    disposablesGeometries.push(ticketGeo);
    const ticketMesh = new THREE.Mesh(ticketGeo, paperVoucherMat);
    ticketMesh.position.set(0, -0.22, 0.04);
    ticketMesh.rotation.x = Math.PI * 0.12;
    ticketGroup.add(ticketMesh);

    const ticketSealGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.005, 16);
    disposablesGeometries.push(ticketSealGeo);
    const ticketSeal = new THREE.Mesh(ticketSealGeo, goldChassisMat);
    ticketSeal.position.set(0, -0.38, 0.05);
    ticketSeal.rotation.x = Math.PI * 0.12;
    ticketGroup.add(ticketSeal);
    ticketGroup.scale.setScalar(0.001); // Hidden initially, unrolls on check-in

    // -------------------------------------------------------------
    // 5. CHARACTER 1: SPECIALIST (Seated Desk Operator)
    // -------------------------------------------------------------
    const specialistGroup = new THREE.Group();
    specialistGroup.position.set(0.65, -0.98, 0.35);
    dioramaGroup.add(specialistGroup);

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
    // 6. CHARACTER 2: OPERATIONS LEAD (Standing & Handover Movement)
    // -------------------------------------------------------------
    const leadGroup = new THREE.Group();
    leadGroup.position.set(1.6, -0.98, -0.15);
    leadGroup.rotation.y = -Math.PI * 0.35;
    dioramaGroup.add(leadGroup);

    const legCapsuleGeo = new THREE.CapsuleGeometry(0.06, 0.5, 6, 12);
    disposablesGeometries.push(legCapsuleGeo);
    const leadLegLeft = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    leadLegLeft.position.set(-0.09, 0.3, 0);
    leadGroup.add(leadLegLeft);

    const leadLegRight = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    leadLegRight.position.set(0.09, 0.3, 0);
    leadGroup.add(leadLegRight);

    const leadTorsoGeo = new THREE.CapsuleGeometry(0.2, 0.42, 8, 16);
    disposablesGeometries.push(leadTorsoGeo);
    const leadTorso = new THREE.Mesh(leadTorsoGeo, leadBlazerMat);
    leadTorso.position.y = 0.88;
    leadGroup.add(leadTorso);

    const leadHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    leadHead.position.set(0, 1.25, 0);
    leadGroup.add(leadHead);

    const tabletGeo = new THREE.BoxGeometry(0.18, 0.24, 0.02);
    disposablesGeometries.push(tabletGeo);
    const tabletMesh = new THREE.Mesh(tabletGeo, goldChassisMat);
    tabletMesh.position.set(-0.25, 0.82, 0.2);
    tabletMesh.rotation.set(0.4, 0.2, 0.1);
    leadGroup.add(tabletMesh);

    // -------------------------------------------------------------
    // 7. CHARACTER 3: THE CUSTOMER (Natural Walking Cadence)
    // -------------------------------------------------------------
    const customerGroup = new THREE.Group();
    customerGroup.position.set(2.1, -0.98, 1.4);
    dioramaGroup.add(customerGroup);

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

    const custTorsoGeo = new THREE.CapsuleGeometry(0.19, 0.42, 8, 16);
    disposablesGeometries.push(custTorsoGeo);
    const custTorso = new THREE.Mesh(custTorsoGeo, customerCoatMat);
    custTorso.position.y = 0.88;
    customerGroup.add(custTorso);

    const custHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    custHead.position.set(0, 1.25, 0);
    customerGroup.add(custHead);

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

    const custPhoneGeo = new THREE.BoxGeometry(0.08, 0.14, 0.015);
    disposablesGeometries.push(custPhoneGeo);
    const custPhone = new THREE.Mesh(custPhoneGeo, goldChassisMat);
    custPhone.position.set(0, -0.28, 0.08);
    customerRightArmGroup.add(custPhone);

    // -------------------------------------------------------------
    // 8. SCENE 03 (STAFF): MECHANICAL SWISS SPLIT-FLAP TILES
    // -------------------------------------------------------------
    const staffHudGroup = new THREE.Group();
    staffHudGroup.position.set(0.65, 0.65, -0.55);
    staffHudGroup.scale.setScalar(0.001);
    dioramaGroup.add(staffHudGroup);

    const hudPlaneGeo = new THREE.PlaneGeometry(1.4, 0.75);
    disposablesGeometries.push(hudPlaneGeo);
    const hudPlaneMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffbf2,
      transmission: 0.9,
      roughness: 0.1,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    disposablesMaterials.push(hudPlaneMat);
    const hudPlane = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
    staffHudGroup.add(hudPlane);

    // Mechanical Flip Tiles
    const flipTiles: THREE.Group[] = [];
    const slotBarGeo = new THREE.BoxGeometry(1.2, 0.09, 0.015);
    disposablesGeometries.push(slotBarGeo);

    const slotBarMatActive = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.4,
    });
    const slotBarMatDone = new THREE.MeshStandardMaterial({
      color: 0x5c9e6e,
      emissive: 0x5c9e6e,
      emissiveIntensity: 0.3,
    });
    disposablesMaterials.push(slotBarMatActive, slotBarMatDone);

    const tileYOffsets = [0.20, 0.04, -0.12];
    tileYOffsets.forEach((y, i) => {
      const tileGroup = new THREE.Group();
      tileGroup.position.set(0, y, 0.01);
      const tileMesh = new THREE.Mesh(slotBarGeo, i === 0 ? slotBarMatDone : slotBarMatActive);
      tileGroup.add(tileMesh);
      staffHudGroup.add(tileGroup);
      flipTiles.push(tileGroup);
    });

    // -------------------------------------------------------------
    // 9. SCENE 04 (CONTROL): REVENUE MONOLITH & ORBITAL TICKER
    // -------------------------------------------------------------
    const controlPillarGroup = new THREE.Group();
    controlPillarGroup.position.set(1.45, -0.98, -0.75);
    controlPillarGroup.scale.setScalar(0.001);
    dioramaGroup.add(controlPillarGroup);

    const pillarGeo = new THREE.CylinderGeometry(0.35, 0.38, 1.5, 32);
    disposablesGeometries.push(pillarGeo);
    const pillarMesh = new THREE.Mesh(pillarGeo, stonePlinthMat);
    pillarMesh.position.y = 0.75;
    controlPillarGroup.add(pillarMesh);

    // 3 Precision Hydraulic Piston Bars
    const barGeo1 = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    const barGeo2 = new THREE.BoxGeometry(0.12, 0.75, 0.12);
    const barGeo3 = new THREE.BoxGeometry(0.12, 1.1, 0.12);
    disposablesGeometries.push(barGeo1, barGeo2, barGeo3);

    const barMesh1 = new THREE.Mesh(barGeo1, bronzeChassisMat);
    barMesh1.position.set(-0.16, 1.725, 0);
    controlPillarGroup.add(barMesh1);

    const barMesh2 = new THREE.Mesh(barGeo2, plinthGoldBorderMat);
    barMesh2.position.set(0, 1.875, 0);
    controlPillarGroup.add(barMesh2);

    const barMesh3 = new THREE.Mesh(barGeo3, terminalActiveMat);
    barMesh3.position.set(0.16, 2.05, 0);
    controlPillarGroup.add(barMesh3);

    // Orbital Brass Ticker Ring
    const tickerRingGeo = new THREE.TorusGeometry(0.48, 0.015, 16, 48);
    disposablesGeometries.push(tickerRingGeo);
    const tickerRing = new THREE.Mesh(tickerRingGeo, goldChassisMat);
    tickerRing.position.set(0, 1.6, 0);
    tickerRing.rotation.x = Math.PI * 0.4;
    controlPillarGroup.add(tickerRing);

    // -------------------------------------------------------------
    // 10. SCENE 05 (SYSTEM): UNDERFLOOR CONDUITS & 8 FLOATING GLYPHS
    // -------------------------------------------------------------
    const systemCircuitGroup = new THREE.Group();
    systemCircuitGroup.position.set(0, -0.97, 0);
    dioramaGroup.add(systemCircuitGroup);

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.1,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.0,
    });
    disposablesMaterials.push(conduitMat);

    // Underfloor channels
    const track1Geo = new THREE.BoxGeometry(1.5, 0.018, 0.06);
    disposablesGeometries.push(track1Geo);
    const track1 = new THREE.Mesh(track1Geo, conduitMat);
    track1.position.set(-0.05, 0, 0.1);
    track1.rotation.y = -0.55;
    systemCircuitGroup.add(track1);

    const track2Geo = new THREE.BoxGeometry(1.2, 0.018, 0.06);
    disposablesGeometries.push(track2Geo);
    const track2 = new THREE.Mesh(track2Geo, conduitMat);
    track2.position.set(1.05, 0, -0.5);
    track2.rotation.y = 0.45;
    systemCircuitGroup.add(track2);

    // 8 Floating Module Glyphs
    const moduleGlyphs: THREE.Mesh[] = [];
    const glyphGeo = new THREE.OctahedronGeometry(0.045, 0);
    disposablesGeometries.push(glyphGeo);
    const glyphMat = new THREE.MeshStandardMaterial({
      color: 0xc69a4b,
      emissive: 0xc69a4b,
      emissiveIntensity: 0.8,
      metalness: 0.9,
    });
    disposablesMaterials.push(glyphMat);

    for (let i = 0; i < 8; i++) {
      const g = new THREE.Mesh(glyphGeo, glyphMat);
      const angle = (i / 8) * Math.PI * 2;
      g.position.set(Math.cos(angle) * 1.8, 0.2 + Math.sin(i) * 0.1, Math.sin(angle) * 1.2);
      systemCircuitGroup.add(g);
      moduleGlyphs.push(g);
    }

    // Traveling Energy Pulse Packets
    const packetGeo = new THREE.SphereGeometry(0.04, 16, 16);
    disposablesGeometries.push(packetGeo);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf0,
      emissive: 0xc69a4b,
      emissiveIntensity: 1.5,
    });
    disposablesMaterials.push(packetMat);

    const packetNode1 = new THREE.Mesh(packetGeo, packetMat);
    systemCircuitGroup.add(packetNode1);
    const packetNode2 = new THREE.Mesh(packetGeo, packetMat);
    systemCircuitGroup.add(packetNode2);

    // -------------------------------------------------------------
    // 11. SCENE 06 (PLATFORM): ARCHITECTURAL CANOPY & GOLD MOTES
    // -------------------------------------------------------------
    const canopyGroup = new THREE.Group();
    canopyGroup.position.set(0, 2.5, 0);
    canopyGroup.scale.setScalar(0.001);
    dioramaGroup.add(canopyGroup);

    const canopyBeamGeo = new THREE.BoxGeometry(4.8, 0.04, 0.04);
    disposablesGeometries.push(canopyBeamGeo);
    const canopyBeam1 = new THREE.Mesh(canopyBeamGeo, goldChassisMat);
    canopyBeam1.position.z = 1.4;
    canopyGroup.add(canopyBeam1);

    const canopyBeam2 = new THREE.Mesh(canopyBeamGeo, goldChassisMat);
    canopyBeam2.position.z = -1.4;
    canopyGroup.add(canopyBeam2);

    const canopyGlassGeo = new THREE.PlaneGeometry(4.7, 2.7);
    disposablesGeometries.push(canopyGlassGeo);
    const canopyGlass = new THREE.Mesh(canopyGlassGeo, hudPlaneMat);
    canopyGlass.rotation.x = Math.PI / 2;
    canopyGroup.add(canopyGlass);

    // -------------------------------------------------------------
    // 12. AMBIENT LUXURY PARTICLES
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
      const resScale = w < 768 ? 0.70 : w < 1024 ? 0.82 : 1.0;
      dioramaGroup.scale.setScalar(resScale);
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

      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      if (!prefersReducedMotion) {
        // =====================================================================
        // CHOREOGRAPHY ACROSS ALL 6 SCENES (0.0, 0.2, 0.4, 0.6, 0.8, 1.0)
        // =====================================================================

        let targetDioramaX = 0.20;
        let targetDioramaY = -0.04;
        let targetDioramaZ = 0.0;
        let targetRotY = 0.32;
        let targetCameraZ = 8.2;
        let targetCameraY = 1.15;

        if (p <= 0.20) {
          // 01 -> 02: Business to Customer
          const t = p / 0.20;
          targetDioramaX = THREE.MathUtils.lerp(0.20, 0.08, t);
          targetDioramaZ = THREE.MathUtils.lerp(0.0, 0.30, t);
          targetRotY = THREE.MathUtils.lerp(0.32, -0.16, t);
          targetCameraZ = THREE.MathUtils.lerp(8.2, 7.8, t);
        } else if (p <= 0.40) {
          // 02 -> 03: Customer to Staff Handover
          const t = (p - 0.20) / 0.20;
          targetDioramaX = THREE.MathUtils.lerp(0.08, 0.16, t);
          targetDioramaZ = THREE.MathUtils.lerp(0.30, 0.18, t);
          targetRotY = THREE.MathUtils.lerp(-0.16, 0.16, t);
          targetCameraZ = THREE.MathUtils.lerp(7.8, 8.0, t);
        } else if (p <= 0.60) {
          // 03 -> 04: Staff to Control Monolith
          const t = (p - 0.40) / 0.20;
          targetDioramaX = THREE.MathUtils.lerp(0.16, -0.06, t);
          targetDioramaZ = THREE.MathUtils.lerp(0.18, 0.12, t);
          targetRotY = THREE.MathUtils.lerp(0.16, -0.22, t);
          targetCameraY = THREE.MathUtils.lerp(1.15, 1.30, t);
          targetCameraZ = THREE.MathUtils.lerp(8.0, 8.3, t);
        } else if (p <= 0.80) {
          // 04 -> 05: Control to System Conduits
          const t = (p - 0.60) / 0.20;
          targetDioramaX = THREE.MathUtils.lerp(-0.06, 0.04, t);
          targetRotY = THREE.MathUtils.lerp(-0.22, 0.04, t);
          targetCameraY = THREE.MathUtils.lerp(1.30, 1.42, t);
          targetCameraZ = THREE.MathUtils.lerp(8.3, 8.8, t);
        } else {
          // 05 -> 06: System to Platform Hero Pull-Back
          const t = (p - 0.80) / 0.20;
          targetDioramaX = THREE.MathUtils.lerp(0.04, 0.0, t);
          targetDioramaY = THREE.MathUtils.lerp(-0.04, -0.16, t);
          targetRotY = THREE.MathUtils.lerp(0.04, 0.10, t);
          targetCameraY = THREE.MathUtils.lerp(1.42, 1.65, t);
          targetCameraZ = THREE.MathUtils.lerp(8.8, 9.8, t);
        }

        dioramaGroup.position.set(targetDioramaX, targetDioramaY, targetDioramaZ);
        dioramaGroup.rotation.y = targetRotY;
        dioramaGroup.rotation.x = THREE.MathUtils.lerp(0.08, 0.05, p);

        camera.position.z = targetCameraZ;
        camera.position.x = currentMouseX * 0.2;
        camera.position.y = targetCameraY - currentMouseY * 0.2;
        camera.lookAt(targetDioramaX * 0.5, 0.05, 0);

        // -------------------------------------------------------------
        // ATMOSPHERIC SUNLIGHT SHIFT (Morning -> Executive Daylight -> Sunset)
        // -------------------------------------------------------------
        if (p > 0.75) {
          const sunsetT = (p - 0.75) / 0.25;
          ambientLight.color.setHex(0xfff3e0);
          keyLight.color.setHex(0xffecc7);
          rimLight.intensity = 2.4 + sunsetT * 1.5;
        } else {
          ambientLight.color.setHex(0xfffbf2);
          keyLight.color.setHex(0xfffaed);
          rimLight.intensity = 2.4;
        }

        // -------------------------------------------------------------
        // LIVING PROPS: Coffee Steam & Plant Foliage Sway
        // -------------------------------------------------------------
        steamParticles.forEach((sp, i) => {
          sp.position.y = 0.82 + ((elapsedTime * 0.08 + i * 0.05) % 0.18);
          sp.position.x = 0.72 + Math.sin(elapsedTime * 2.0 + i) * 0.012;
          (sp.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.25 - (sp.position.y - 0.82) * 1.2);
        });

        plantLeaves.forEach((leaf, i) => {
          leaf.rotation.z = 0.3 + Math.sin(elapsedTime * 1.6 + i * 1.2) * 0.04;
        });

        // -------------------------------------------------------------
        // CHARACTER 1 (Specialist): Social Dynamics & Handover Reaction
        // -------------------------------------------------------------
        if (p < 0.18) {
          // Scene 1: Active typing
          specLeftArm.rotation.x = 0.65 + Math.sin(elapsedTime * 4.0) * 0.04;
          specRightArm.rotation.x = 0.65 + Math.cos(elapsedTime * 4.5) * 0.04;
          specHead.rotation.y = THREE.MathUtils.lerp(0, -0.45, p / 0.18);
        } else if (p < 0.40) {
          // Scene 2 & 3: Pauses typing, acknowledges customer & turns toward Lead
          specLeftArm.rotation.x = 0.4;
          specRightArm.rotation.x = 0.4;
          specHead.rotation.y = THREE.MathUtils.lerp(-0.45, 0.55, (p - 0.18) / 0.22);
        } else {
          // Scene 4+: Mutual coordination & forward gaze
          specLeftArm.rotation.x = 0.55 + Math.sin(elapsedTime * 1.5) * 0.02;
          specRightArm.rotation.x = 0.55 + Math.cos(elapsedTime * 1.5) * 0.02;
          specHead.rotation.y = THREE.MathUtils.lerp(0.2, 0, (p - 0.40) / 0.60);
        }

        // -------------------------------------------------------------
        // CHARACTER 2 (Operations Lead): Social Handover Step
        // -------------------------------------------------------------
        if (p < 0.20) {
          // Scene 1: Standing at desk periphery
          leadGroup.position.set(1.6, -0.98, -0.15);
          leadGroup.rotation.y = -Math.PI * 0.35;
          leadHead.rotation.y = THREE.MathUtils.lerp(0, -0.5, p / 0.20);
        } else if (p < 0.45) {
          // Scene 2 -> 3: Steps closer to Specialist's desk for the handover
          const t = (p - 0.20) / 0.25;
          leadGroup.position.x = THREE.MathUtils.lerp(1.6, 1.15, t);
          leadGroup.position.z = THREE.MathUtils.lerp(-0.15, 0.10, t);
          leadGroup.rotation.y = THREE.MathUtils.lerp(-Math.PI * 0.35, -Math.PI * 0.75, t);
          // Extends tablet forward
          tabletMesh.position.set(-0.35, 0.88, 0.35);
          tabletMesh.rotation.set(0.6, 0.4, 0.2);
        } else if (p < 0.75) {
          // Scene 4: Executive stance facing revenue monolith
          const t = (p - 0.45) / 0.30;
          leadGroup.position.x = THREE.MathUtils.lerp(1.15, 1.45, t);
          leadGroup.position.z = THREE.MathUtils.lerp(0.10, -0.15, t);
          leadGroup.rotation.y = THREE.MathUtils.lerp(-Math.PI * 0.75, -Math.PI * 0.25, t);
        } else {
          // Scene 5 & 6: Settled proud stance
          leadGroup.rotation.y = -Math.PI * 0.15;
          leadHead.rotation.y = 0;
        }

        // -------------------------------------------------------------
        // CHARACTER 3 (Customer): Walking Cadence & Paper Voucher Delivery
        // -------------------------------------------------------------
        const custProgress = Math.max(0, Math.min(1, p / 0.20));
        const custTargetX = THREE.MathUtils.lerp(2.1, -0.75, custProgress);
        const custTargetZ = THREE.MathUtils.lerp(1.4, 1.2, custProgress);
        customerGroup.position.set(custTargetX, -0.98, custTargetZ);

        const walkAngle = THREE.MathUtils.lerp(-Math.PI * 0.65, -Math.PI * 0.48, custProgress);
        customerGroup.rotation.y = walkAngle;

        const isWalking = custProgress > 0.02 && custProgress < 0.98;
        const walkCycle = custProgress * Math.PI * 6.0;
        const strideAmp = isWalking ? 0.6 : 0.04;

        customerLeftLegGroup.rotation.x = Math.sin(walkCycle) * strideAmp;
        customerRightLegGroup.rotation.x = -Math.sin(walkCycle) * strideAmp;
        customerLeftArmGroup.rotation.x = -Math.sin(walkCycle) * (strideAmp * 0.8);

        if (custProgress > 0.70) {
          const reachProgress = (custProgress - 0.70) / 0.30;
          customerRightArmGroup.rotation.x = THREE.MathUtils.lerp(0, -0.75, reachProgress);
          customerRightArmGroup.rotation.y = THREE.MathUtils.lerp(0, -0.3, reachProgress);

          // Printed Appointment Voucher unrolls smoothly from podium!
          ticketGroup.scale.setScalar(reachProgress);
          ticketMesh.position.y = -0.10 - reachProgress * 0.14;
        } else {
          customerRightArmGroup.rotation.x = Math.sin(walkCycle) * (strideAmp * 0.8);
          customerRightArmGroup.rotation.y = 0;
          ticketGroup.scale.setScalar(0.001);
        }

        // Terminal Confirmation Halo Pulse
        if (p > 0.15) {
          const pulse = Math.min(1, (p - 0.15) / 0.10);
          terminalActiveMat.emissiveIntensity = 0.5 + pulse * 1.2 + Math.sin(elapsedTime * 3.0) * 0.2;
          confirmHaloMat.opacity = pulse * 0.3 + Math.sin(elapsedTime * 2.0) * 0.05;
          confirmHaloMesh.scale.setScalar(1.0 + pulse * 0.4);
        } else {
          terminalActiveMat.emissiveIntensity = 0.4;
          confirmHaloMat.opacity = 0.05;
          confirmHaloMesh.scale.setScalar(1.0);
        }

        // -------------------------------------------------------------
        // SCENE 03 (STAFF): Swiss Split-Flap Tiles Flip
        // -------------------------------------------------------------
        if (p > 0.20) {
          const staffProg = Math.min(1, (p - 0.20) / 0.15);
          staffHudGroup.scale.setScalar(staffProg);
          staffHudGroup.position.y = 0.45 + staffProg * 0.25;

          // Sequential 180° tile flip
          flipTiles.forEach((tile, i) => {
            const tileDelay = 0.22 + i * 0.04;
            if (p > tileDelay) {
              const flipProg = Math.min(1, (p - tileDelay) / 0.08);
              tile.rotation.x = THREE.MathUtils.lerp(Math.PI, 0, flipProg);
            } else {
              tile.rotation.x = Math.PI;
            }
          });
        } else {
          staffHudGroup.scale.setScalar(0.001);
        }

        // -------------------------------------------------------------
        // SCENE 04 (CONTROL): Hydraulic Piston Bars & Ticker Rotation
        // -------------------------------------------------------------
        if (p > 0.40) {
          const controlProg = Math.min(1, (p - 0.40) / 0.15);
          controlPillarGroup.scale.setScalar(controlProg);
          controlPillarGroup.position.y = -0.98 + (controlProg - 1.0) * 0.5;

          // Hydraulic Piston Easing
          barMesh1.scale.y = Math.min(1, controlProg * 1.2);
          barMesh2.scale.y = Math.min(1, controlProg * 1.1);
          barMesh3.scale.y = Math.min(1, controlProg * 1.0);

          // Continuous gentle ticker orbit
          tickerRing.rotation.z = elapsedTime * 0.4;
        } else {
          controlPillarGroup.scale.setScalar(0.001);
        }

        // -------------------------------------------------------------
        // SCENE 05 (SYSTEM): Conduits, Pulse Packets & 8 Floating Glyphs
        // -------------------------------------------------------------
        if (p > 0.60) {
          const sysProg = Math.min(1, (p - 0.60) / 0.15);
          conduitMat.opacity = sysProg * 0.9;
          conduitMat.emissiveIntensity = 0.2 + sysProg * 0.6 + Math.sin(elapsedTime * 4.0) * 0.3;

          // 8 Module Glyphs hover and rotate
          moduleGlyphs.forEach((g, i) => {
            g.scale.setScalar(sysProg);
            g.position.y = 0.2 + Math.sin(elapsedTime * 2.0 + i) * 0.08;
            g.rotation.y = elapsedTime * 0.8 + i;
          });

          // Energy Packet Sprinting
          const packetT1 = (elapsedTime * 0.8) % 1.0;
          packetNode1.position.x = THREE.MathUtils.lerp(-0.75, 0.65, packetT1);
          packetNode1.position.z = THREE.MathUtils.lerp(0.45, -0.3, packetT1);
          packetNode1.position.y = 0.02;

          const packetT2 = (elapsedTime * 0.9 + 0.5) % 1.0;
          packetNode2.position.x = THREE.MathUtils.lerp(0.65, 1.45, packetT2);
          packetNode2.position.z = THREE.MathUtils.lerp(-0.3, -0.75, packetT2);
          packetNode2.position.y = 0.02;
        } else {
          conduitMat.opacity = 0.0;
          moduleGlyphs.forEach((g) => g.scale.setScalar(0.001));
        }

        // -------------------------------------------------------------
        // SCENE 06 (PLATFORM): Canopy Frame & Ambient Glow
        // -------------------------------------------------------------
        if (p > 0.80) {
          const platProg = Math.min(1, (p - 0.80) / 0.15);
          canopyGroup.scale.setScalar(platProg);
          canopyGroup.position.y = 2.2 + platProg * 0.3;
        } else {
          canopyGroup.scale.setScalar(0.001);
        }

        // Ambient Upward Particles
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
