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

    // Dynamic Architectural Lighting (Warm Khadi Ambient & Marlborough Blue/Dark Chocolate Accents)
    const ambientLight = new THREE.AmbientLight(0xf5f1e8, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfaf7f0, 3.2);
    keyLight.position.set(6, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8aa2ba, 2.4);
    rimLight.position.set(-6, 3, -2);
    scene.add(rimLight);

    const deskSpotLight = new THREE.PointLight(0xf5e6d3, 1.8, 8);
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

    // Shared Editorial Dark Chocolate, Marlborough B. & Khadi Materials
    const stonePlinthMat = new THREE.MeshStandardMaterial({
      color: 0xded9d0,
      roughness: 0.35,
      metalness: 0.06,
    });
    disposablesMaterials.push(stonePlinthMat);

    const plinthGoldBorderMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      metalness: 0.88,
      roughness: 0.22,
    });
    disposablesMaterials.push(plinthGoldBorderMat);

    const deskSurfaceMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.20,
      metalness: 0.05,
    });
    disposablesMaterials.push(deskSurfaceMat);

    const goldChassisMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      metalness: 0.92,
      roughness: 0.22,
    });
    disposablesMaterials.push(goldChassisMat);

    const bronzeChassisMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      metalness: 0.85,
      roughness: 0.28,
    });
    disposablesMaterials.push(bronzeChassisMat);

    const screenGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      emissive: 0x8aa2ba,
      emissiveIntensity: 0.45,
      roughness: 0.2,
    });
    disposablesMaterials.push(screenGlowMat);

    const terminalActiveMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      emissive: 0x37261a,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    disposablesMaterials.push(terminalActiveMat);

    const paperVoucherMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });
    disposablesMaterials.push(paperVoucherMat);

    const plantLeafMat = new THREE.MeshStandardMaterial({
      color: 0x4f5e43,
      roughness: 0.45,
      metalness: 0.05,
    });
    disposablesMaterials.push(plantLeafMat);

    // Character Materials
    const alabasterSkinMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.32,
      metalness: 0.02,
    });
    disposablesMaterials.push(alabasterSkinMat);

    const specialistBlazerMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      roughness: 0.65,
    });
    disposablesMaterials.push(specialistBlazerMat);

    const leadBlazerMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      roughness: 0.55,
      metalness: 0.1,
    });
    disposablesMaterials.push(leadBlazerMat);

    const customerCoatMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      roughness: 0.55,
    });
    disposablesMaterials.push(customerCoatMat);

    const customerTrousersMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e,
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
    // (Spans Z: -0.825 to +0.225. Everything Z >= 1.25 is completely free!)
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

    // Workspace Monitor
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

    // Cantilever Desk Lamp
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

    // Espresso Cup & Wispy Steam
    const cupGeo = new THREE.CylinderGeometry(0.035, 0.025, 0.05, 16);
    const saucerGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.008, 16);
    disposablesGeometries.push(cupGeo, saucerGeo);

    const saucer = new THREE.Mesh(saucerGeo, stonePlinthMat);
    saucer.position.set(0.72, 0.765, 0.2);
    deskGroup.add(saucer);

    const cup = new THREE.Mesh(cupGeo, stonePlinthMat);
    cup.position.set(0.72, 0.79, 0.2);
    deskGroup.add(cup);

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
    // 3. ARCHITECTURAL PLANT (Botanical Living Detail)
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
    // (Center is at X: -0.75, Z: 0.45. Front of counter is Z: 0.95. Customer stands at Z: 1.25)
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
      color: 0x37261a,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    disposablesMaterials.push(confirmHaloMat);
    const confirmHaloMesh = new THREE.Mesh(confirmHaloGeo, confirmHaloMat);
    confirmHaloMesh.position.set(0, 1.15, 0);
    confirmHaloMesh.rotation.x = -Math.PI * 0.25;
    counterGroup.add(confirmHaloMesh);

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
    ticketGroup.scale.setScalar(0.001);

    // -------------------------------------------------------------
    // DEDICATED DESK CHAIR (Independent from Specialist)
    // -------------------------------------------------------------
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0.65, -0.98, 0.35);
    dioramaGroup.add(chairGroup);

    const chairSeatGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 24);
    const chairBackGeo = new THREE.BoxGeometry(0.4, 0.45, 0.05);
    const chairStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 16);
    disposablesGeometries.push(chairSeatGeo, chairBackGeo, chairStemGeo);

    const chairSeat = new THREE.Mesh(chairSeatGeo, deskSurfaceMat);
    chairSeat.position.y = 0.45;
    chairGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(chairBackGeo, deskSurfaceMat);
    chairBack.position.set(0, 0.72, 0.22);
    chairGroup.add(chairBack);

    const chairStem = new THREE.Mesh(chairStemGeo, goldChassisMat);
    chairStem.position.y = 0.22;
    chairGroup.add(chairStem);

    // -------------------------------------------------------------
    // SHARED CHARACTER GEOMETRIES
    // -------------------------------------------------------------
    const headGeo = new THREE.SphereGeometry(0.13, 24, 24);
    const legCapsuleGeo = new THREE.CapsuleGeometry(0.06, 0.5, 6, 12);
    const armGeo = new THREE.CapsuleGeometry(0.045, 0.28, 6, 12);
    disposablesGeometries.push(headGeo, legCapsuleGeo, armGeo);

    // -------------------------------------------------------------
    // 5. CHARACTER 1: SPECIALIST (Articulated Shoulders)
    // -------------------------------------------------------------
    const specialistGroup = new THREE.Group();
    specialistGroup.position.set(0.65, -0.98, 0.35);
    dioramaGroup.add(specialistGroup);

    const specLegL = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    specLegL.position.set(-0.09, 0.3, 0);
    specialistGroup.add(specLegL);

    const specLegR = new THREE.Mesh(legCapsuleGeo, specialistBlazerMat);
    specLegR.position.set(0.09, 0.3, 0);
    specialistGroup.add(specLegR);

    const specTorsoGeo = new THREE.CapsuleGeometry(0.19, 0.38, 8, 16);
    disposablesGeometries.push(specTorsoGeo);
    const specTorso = new THREE.Mesh(specTorsoGeo, specialistBlazerMat);
    specTorso.position.y = 0.88;
    specialistGroup.add(specTorso);

    const specHead = new THREE.Mesh(headGeo, alabasterSkinMat);
    specHead.position.set(0, 1.25, 0.02);
    specialistGroup.add(specHead);

    const specLeftArmGroup = new THREE.Group();
    specLeftArmGroup.position.set(-0.24, 1.05, 0);
    specialistGroup.add(specLeftArmGroup);
    const specArmL = new THREE.Mesh(armGeo, specialistBlazerMat);
    specArmL.position.y = -0.16;
    specLeftArmGroup.add(specArmL);

    const specRightArmGroup = new THREE.Group();
    specRightArmGroup.position.set(0.24, 1.05, 0);
    specialistGroup.add(specRightArmGroup);
    const specArmR = new THREE.Mesh(armGeo, specialistBlazerMat);
    specArmR.position.y = -0.16;
    specRightArmGroup.add(specArmR);

    // -------------------------------------------------------------
    // 6. CHARACTER 2: OPERATIONS LEAD (Articulated Shoulders)
    // -------------------------------------------------------------
    const leadGroup = new THREE.Group();
    leadGroup.position.set(1.60, -0.98, 0.20);
    leadGroup.rotation.y = -Math.PI * 0.35;
    dioramaGroup.add(leadGroup);

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

    const leadLeftArmGroup = new THREE.Group();
    leadLeftArmGroup.position.set(-0.25, 1.05, 0);
    leadGroup.add(leadLeftArmGroup);
    const leadArmL = new THREE.Mesh(armGeo, leadBlazerMat);
    leadArmL.position.y = -0.16;
    leadLeftArmGroup.add(leadArmL);

    const leadRightArmGroup = new THREE.Group();
    leadRightArmGroup.position.set(0.25, 1.05, 0);
    leadGroup.add(leadRightArmGroup);
    const leadArmR = new THREE.Mesh(armGeo, leadBlazerMat);
    leadArmR.position.y = -0.16;
    leadRightArmGroup.add(leadArmR);

    const tabletGeo = new THREE.BoxGeometry(0.18, 0.24, 0.02);
    disposablesGeometries.push(tabletGeo);
    const tabletMesh = new THREE.Mesh(tabletGeo, goldChassisMat);
    tabletMesh.position.set(0, -0.28, 0.08);
    tabletMesh.rotation.set(0.4, 0.2, 0.1);
    leadRightArmGroup.add(tabletMesh);

    // -------------------------------------------------------------
    // 7. CHARACTER 3: CUSTOMER / TEAM MEMBER (Articulated Shoulders)
    // Starts at X: 2.4, Z: 1.35 on the front promenade!
    // -------------------------------------------------------------
    const customerGroup = new THREE.Group();
    customerGroup.position.set(2.4, -0.98, 1.35);
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
    customerLeftArmGroup.position.set(-0.24, 1.05, 0);
    customerGroup.add(customerLeftArmGroup);
    const custArmL = new THREE.Mesh(armGeo, customerCoatMat);
    custArmL.position.y = -0.16;
    customerLeftArmGroup.add(custArmL);

    const customerRightArmGroup = new THREE.Group();
    customerRightArmGroup.position.set(0.24, 1.05, 0);
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
    // 8. SCENE 03 (STAFF / TEAM): MECHANICAL SWISS SPLIT-FLAP TILES
    // -------------------------------------------------------------
    const staffHudGroup = new THREE.Group();
    staffHudGroup.position.set(0.0, 1.5, -0.2);
    staffHudGroup.scale.setScalar(0.001);
    dioramaGroup.add(staffHudGroup);

    const hudPlaneGeo = new THREE.PlaneGeometry(1.6, 0.85);
    disposablesGeometries.push(hudPlaneGeo);
    const hudPlaneMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    disposablesMaterials.push(hudPlaneMat);
    const hudPlane = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
    staffHudGroup.add(hudPlane);

    const flipTiles: THREE.Group[] = [];
    const slotBarGeo = new THREE.BoxGeometry(1.35, 0.11, 0.015);
    disposablesGeometries.push(slotBarGeo);

    const slotBarMatActive = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      emissive: 0x37261a,
      emissiveIntensity: 0.5,
    });
    const slotBarMatDone = new THREE.MeshStandardMaterial({
      color: 0x5c9e6e,
      emissive: 0x5c9e6e,
      emissiveIntensity: 0.3,
    });
    disposablesMaterials.push(slotBarMatActive, slotBarMatDone);

    const tileYOffsets = [0.22, 0.05, -0.12];
    tileYOffsets.forEach((y, i) => {
      const tileGroup = new THREE.Group();
      tileGroup.position.set(0, y, 0.01);
      const tileMesh = new THREE.Mesh(slotBarGeo, i === 0 ? slotBarMatDone : slotBarMatActive);
      tileGroup.add(tileMesh);
      staffHudGroup.add(tileGroup);
      flipTiles.push(tileGroup);
    });

    // -------------------------------------------------------------
    // 9. SCENE 04 (CONTROL): REVENUE MONOLITH & HYDRAULIC PISTONS
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

    const tickerRingGeo = new THREE.TorusGeometry(0.48, 0.015, 16, 48);
    disposablesGeometries.push(tickerRingGeo);
    const tickerRing = new THREE.Mesh(tickerRingGeo, goldChassisMat);
    tickerRing.position.set(0, 1.6, 0);
    tickerRing.rotation.x = Math.PI * 0.4;
    controlPillarGroup.add(tickerRing);

    // -------------------------------------------------------------
    // SCENE 04 (CONTROL) BACKGROUND GRAPHICAL RANDOM DATA WALL
    // -------------------------------------------------------------
    const controlDataBgGroup = new THREE.Group();
    controlDataBgGroup.position.set(0, 0.35, -2.4);
    controlDataBgGroup.scale.setScalar(0.001);
    dioramaGroup.add(controlDataBgGroup);

    const dataBackdropGeo = new THREE.PlaneGeometry(6.6, 2.8);
    disposablesGeometries.push(dataBackdropGeo);
    const dataBackdropMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
    });
    disposablesMaterials.push(dataBackdropMat);
    const dataBackdrop = new THREE.Mesh(dataBackdropGeo, dataBackdropMat);
    controlDataBgGroup.add(dataBackdrop);

    const dataBarsCount = 22;
    const dataBars: { mesh: THREE.Mesh; baseHeight: number; speed: number; phase: number }[] = [];
    const dataBarGeo = new THREE.BoxGeometry(0.14, 1.0, 0.04);
    disposablesGeometries.push(dataBarGeo);

    const dataBarChocolateMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      emissive: 0x37261a,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });
    const dataBarMarlboroughMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      emissive: 0x5e7790,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.25,
    });
    const dataBarEmeraldMat = new THREE.MeshStandardMaterial({
      color: 0x5c9e6e,
      emissive: 0x5c9e6e,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    disposablesMaterials.push(dataBarChocolateMat, dataBarMarlboroughMat, dataBarEmeraldMat);

    for (let i = 0; i < dataBarsCount; i++) {
      const mat = i % 4 === 0 ? dataBarEmeraldMat : i % 2 === 0 ? dataBarChocolateMat : dataBarMarlboroughMat;
      const bar = new THREE.Mesh(dataBarGeo, mat);
      const x = (i - (dataBarsCount - 1) / 2) * 0.26;
      const baseH = 0.4 + Math.sin(i * 1.3) * 0.25 + (i % 3) * 0.18;
      bar.position.set(x, baseH * 0.5 - 0.7, 0.02);
      bar.scale.y = baseH;
      controlDataBgGroup.add(bar);

      dataBars.push({
        mesh: bar,
        baseHeight: baseH,
        speed: 1.8 + (i % 5) * 0.7,
        phase: i * 0.65,
      });
    }

    const dataScatterNodes: THREE.Mesh[] = [];
    const scatterGeo = new THREE.OctahedronGeometry(0.045, 0);
    disposablesGeometries.push(scatterGeo);

    for (let i = 0; i < 14; i++) {
      const node = new THREE.Mesh(scatterGeo, dataBarChocolateMat);
      node.position.set(
        Math.sin(i * 2.4) * 2.8,
        0.3 + Math.cos(i * 1.7) * 0.7,
        0.08 + (i % 3) * 0.04
      );
      controlDataBgGroup.add(node);
      dataScatterNodes.push(node);
    }

    const datumLineGeo = new THREE.BoxGeometry(6.2, 0.012, 0.02);
    disposablesGeometries.push(datumLineGeo);
    [-0.2, 0.35, 0.85].forEach((y) => {
      const line = new THREE.Mesh(datumLineGeo, dataBarMarlboroughMat);
      line.position.set(0, y, 0.015);
      controlDataBgGroup.add(line);
    });

    // -------------------------------------------------------------
    // SCENE 05 (SYSTEM) BACKGROUND SYSTEM DESIGN CONNECTED CHARTS
    // -------------------------------------------------------------
    const systemArchitectureBgGroup = new THREE.Group();
    systemArchitectureBgGroup.position.set(0, 0.45, -2.1);
    systemArchitectureBgGroup.scale.setScalar(0.001);
    dioramaGroup.add(systemArchitectureBgGroup);

    const archBoxGeo = new THREE.BoxGeometry(0.85, 0.32, 0.08);
    const archDbGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.42, 24);
    disposablesGeometries.push(archBoxGeo, archDbGeo);

    const archNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      roughness: 0.25,
      metalness: 0.15,
    });
    const archNodeBorderMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x37261a,
      emissiveIntensity: 0.35,
    });
    const archConduitMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      emissive: 0x37261a,
      emissiveIntensity: 0.8,
      metalness: 0.9,
    });
    disposablesMaterials.push(archNodeMat, archNodeBorderMat, archConduitMat);

    const createArchNode = (x: number, y: number, isDb = false) => {
      const node = new THREE.Group();
      node.position.set(x, y, 0);

      if (isDb) {
        const dbMesh = new THREE.Mesh(archDbGeo, archNodeMat);
        node.add(dbMesh);
        const ring1Geo = new THREE.TorusGeometry(0.305, 0.015, 12, 32);
        disposablesGeometries.push(ring1Geo);
        const ring1 = new THREE.Mesh(ring1Geo, archNodeBorderMat);
        ring1.rotation.x = Math.PI / 2;
        ring1.position.y = 0.1;
        node.add(ring1);
        const ring2Geo = new THREE.TorusGeometry(0.305, 0.015, 12, 32);
        disposablesGeometries.push(ring2Geo);
        const ring2 = new THREE.Mesh(ring2Geo, archNodeBorderMat);
        ring2.rotation.x = Math.PI / 2;
        ring2.position.y = -0.1;
        node.add(ring2);
      } else {
        const body = new THREE.Mesh(archBoxGeo, archNodeMat);
        node.add(body);
        const trimGeo = new THREE.BoxGeometry(0.88, 0.03, 0.085);
        disposablesGeometries.push(trimGeo);
        const trim = new THREE.Mesh(trimGeo, archNodeBorderMat);
        trim.position.y = 0.16;
        node.add(trim);
        const dotGeo = new THREE.SphereGeometry(0.035, 12, 12);
        disposablesGeometries.push(dotGeo);
        const dot = new THREE.Mesh(dotGeo, terminalActiveMat);
        dot.position.set(-0.32, 0, 0.045);
        node.add(dot);
      }

      systemArchitectureBgGroup.add(node);
      return node;
    };

    // Architecture Nodes
    createArchNode(0, 1.1); // Gateway
    createArchNode(-1.9, 0.45); // Auth
    createArchNode(-0.65, 0.45); // Booking
    createArchNode(0.65, 0.45); // Payments
    createArchNode(1.9, 0.45); // Workflows
    createArchNode(-1.1, -0.4, true); // Postgres
    createArchNode(0.0, -0.4, true); // Redis
    createArchNode(1.1, -0.4, true); // EventBus

    // Connected Conduits linking architecture diagram
    const addConduit = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) - Math.PI / 2;

      const tubeGeo = new THREE.CylinderGeometry(0.012, 0.012, len, 8);
      disposablesGeometries.push(tubeGeo);
      const tube = new THREE.Mesh(tubeGeo, archConduitMat);
      tube.position.set((x1 + x2) / 2, (y1 + y2) / 2, -0.02);
      tube.rotation.z = angle;
      systemArchitectureBgGroup.add(tube);
    };

    addConduit(0, 0.95, -1.9, 0.6);
    addConduit(0, 0.95, -0.65, 0.6);
    addConduit(0, 0.95, 0.65, 0.6);
    addConduit(0, 0.95, 1.9, 0.6);
    addConduit(-1.9, 0.3, -1.1, -0.2);
    addConduit(-0.65, 0.3, -1.1, -0.2);
    addConduit(-0.65, 0.3, 0.0, -0.2);
    addConduit(0.65, 0.3, 0.0, -0.2);
    addConduit(0.65, 0.3, 1.1, -0.2);
    addConduit(1.9, 0.3, 1.1, -0.2);

    // Traveling Data Packets through architecture chart
    const archPackets: { mesh: THREE.Mesh; start: THREE.Vector2; end: THREE.Vector2; speed: number; offset: number }[] = [];
    const archPacketGeo = new THREE.SphereGeometry(0.035, 12, 12);
    disposablesGeometries.push(archPacketGeo);

    const flowPaths = [
      { start: new THREE.Vector2(0, 0.95), end: new THREE.Vector2(-1.9, 0.6) },
      { start: new THREE.Vector2(0, 0.95), end: new THREE.Vector2(-0.65, 0.6) },
      { start: new THREE.Vector2(0, 0.95), end: new THREE.Vector2(0.65, 0.6) },
      { start: new THREE.Vector2(-0.65, 0.3), end: new THREE.Vector2(-1.1, -0.2) },
      { start: new THREE.Vector2(0.65, 0.3), end: new THREE.Vector2(1.1, -0.2) },
    ];

    flowPaths.forEach((path, i) => {
      const pMesh = new THREE.Mesh(archPacketGeo, terminalActiveMat);
      systemArchitectureBgGroup.add(pMesh);
      archPackets.push({
        mesh: pMesh,
        start: path.start,
        end: path.end,
        speed: 0.9 + i * 0.15,
        offset: i * 0.22,
      });
    });

    // -------------------------------------------------------------
    // 10. SCENE 05 (SYSTEM): UNDERFLOOR CONDUITS & 8 FLOATING GLYPHS
    // -------------------------------------------------------------
    const systemCircuitGroup = new THREE.Group();
    systemCircuitGroup.position.set(0, -0.97, 0);
    dioramaGroup.add(systemCircuitGroup);

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x8aa2ba,
      emissive: 0x37261a,
      emissiveIntensity: 0.15,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.0,
    });
    disposablesMaterials.push(conduitMat);

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

    const moduleGlyphs: THREE.Mesh[] = [];
    const glyphGeo = new THREE.OctahedronGeometry(0.045, 0);
    disposablesGeometries.push(glyphGeo);
    const glyphMat = new THREE.MeshStandardMaterial({
      color: 0x37261a,
      emissive: 0x37261a,
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

    const packetGeo = new THREE.SphereGeometry(0.04, 16, 16);
    disposablesGeometries.push(packetGeo);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb,
      emissive: 0x8aa2ba,
      emissiveIntensity: 1.5,
    });
    disposablesMaterials.push(packetMat);

    const packetNode1 = new THREE.Mesh(packetGeo, packetMat);
    systemCircuitGroup.add(packetNode1);
    const packetNode2 = new THREE.Mesh(packetGeo, packetMat);
    systemCircuitGroup.add(packetNode2);

    // -------------------------------------------------------------
    // 11. SCENE 06 (PLATFORM): LUXURY PERGOLA CANOPY (Zero Transmissive Glitching)
    // -------------------------------------------------------------
    const canopyGroup = new THREE.Group();
    canopyGroup.position.set(0, 2.3, 0);
    canopyGroup.scale.setScalar(0.001);
    dioramaGroup.add(canopyGroup);

    const canopyBeamGeo = new THREE.BoxGeometry(4.6, 0.035, 0.035);
    disposablesGeometries.push(canopyBeamGeo);
    const canopyBeam1 = new THREE.Mesh(canopyBeamGeo, goldChassisMat);
    canopyBeam1.position.z = 1.35;
    canopyGroup.add(canopyBeam1);

    const canopyBeam2 = new THREE.Mesh(canopyBeamGeo, goldChassisMat);
    canopyBeam2.position.z = -1.35;
    canopyGroup.add(canopyBeam2);

    const canopyCrossBeamGeo = new THREE.BoxGeometry(0.025, 0.025, 2.7);
    disposablesGeometries.push(canopyCrossBeamGeo);
    for (let i = -4; i <= 4; i++) {
      const crossBeam = new THREE.Mesh(canopyCrossBeamGeo, bronzeChassisMat);
      crossBeam.position.set(i * 0.52, 0.015, 0);
      canopyGroup.add(crossBeam);
    }

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
      color: 0x37261a,
      size: 0.038,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposablesMaterials.push(particleMaterial);

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particles);

    // Pointer & Gyroscope Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        targetMouseX = Math.max(-1, Math.min(1, e.gamma / 25));
        targetMouseY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

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
    const clock = new THREE.Clock();
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, scrollProgressRef.current));

      currentMouseX += (targetMouseX - currentMouseX) * 0.065;
      currentMouseY += (targetMouseY - currentMouseY) * 0.065;

      if (!prefersReducedMotion) {
        // =====================================================================
        // SCENE STEPPER TRANSITION PROGRESS METRICS
        // t01: 0.00 -> 0.20 (Business -> Customer)
        // t12: 0.20 -> 0.40 (Customer -> Team)
        // t23: 0.40 -> 0.60 (Team -> Control)
        // t34: 0.60 -> 0.80 (Control -> System)
        // t45: 0.80 -> 1.00 (System -> Platform)
        // =====================================================================
        const t01 = clamp01(p / 0.20);
        const t12 = clamp01((p - 0.20) / 0.20);
        const t23 = clamp01((p - 0.40) / 0.20);
        const t34 = clamp01((p - 0.60) / 0.20);
        const t45 = clamp01((p - 0.80) / 0.20);

        // =====================================================================
        // CAMERA & DIORAMA ORCHESTRATION
        // =====================================================================
        let targetDioramaX = 0.20;
        let targetDioramaY = -0.04;
        let targetDioramaZ = 0.0;
        let targetRotY = 0.32;
        let targetCameraZ = 8.2;
        let targetCameraY = 1.15;
        let lookAtX = 0.0;

        if (p <= 0.20) {
          targetDioramaX = THREE.MathUtils.lerp(0.20, 0.08, t01);
          targetDioramaZ = THREE.MathUtils.lerp(0.0, 0.20, t01);
          targetRotY = THREE.MathUtils.lerp(0.32, -0.14, t01);
          targetCameraZ = THREE.MathUtils.lerp(8.2, 7.8, t01);
          lookAtX = 0.0;
        } else if (p <= 0.40) {
          targetDioramaX = THREE.MathUtils.lerp(0.08, 0.0, t12);
          targetDioramaZ = THREE.MathUtils.lerp(0.20, 0.10, t12);
          targetRotY = THREE.MathUtils.lerp(-0.14, 0.0, t12);
          targetCameraZ = THREE.MathUtils.lerp(7.8, 8.0, t12);
          lookAtX = 0.0;
        } else if (p <= 0.60) {
          targetDioramaX = 0.0;
          targetDioramaZ = THREE.MathUtils.lerp(0.10, 0.05, t23);
          targetRotY = THREE.MathUtils.lerp(0.0, -0.04, t23);
          targetCameraY = THREE.MathUtils.lerp(1.15, 1.25, t23);
          targetCameraZ = THREE.MathUtils.lerp(8.0, 8.4, t23);
          lookAtX = 0.0;
        } else if (p <= 0.80) {
          targetDioramaX = 0.0;
          targetDioramaZ = 0.0;
          targetRotY = THREE.MathUtils.lerp(-0.04, 0.0, t34);
          targetCameraY = THREE.MathUtils.lerp(1.25, 1.35, t34);
          targetCameraZ = THREE.MathUtils.lerp(8.4, 8.8, t34);
          lookAtX = 0.0;
        } else {
          // Platform scene: Clean shift of diorama to the left half!
          targetDioramaX = THREE.MathUtils.lerp(0.0, -1.15, t45);
          targetDioramaY = THREE.MathUtils.lerp(-0.04, -0.12, t45);
          targetDioramaZ = 0.0;
          targetRotY = THREE.MathUtils.lerp(0.0, 0.18, t45);
          targetCameraY = THREE.MathUtils.lerp(1.35, 1.40, t45);
          targetCameraZ = THREE.MathUtils.lerp(8.8, 9.2, t45);
          lookAtX = THREE.MathUtils.lerp(0.0, -0.45, t45);
        }

        dioramaGroup.position.set(targetDioramaX, targetDioramaY, targetDioramaZ);
        dioramaGroup.rotation.y = targetRotY + currentMouseX * 0.12;
        dioramaGroup.rotation.x = THREE.MathUtils.lerp(0.08, 0.05, p) - currentMouseY * 0.08;
        dioramaGroup.rotation.z = -currentMouseX * 0.025;

        camera.position.z = targetCameraZ;
        camera.position.x = currentMouseX * 0.35;
        camera.position.y = targetCameraY - currentMouseY * 0.25;
        camera.lookAt(lookAtX + currentMouseX * 0.10, 0.1, 0);

        // Atmosphere lighting transition across scenes (Warm Khadi hues)
        if (p > 0.75) {
          const sunsetT = (p - 0.75) / 0.25;
          ambientLight.color.setHex(0xe4dfd6);
          keyLight.color.setHex(0xf5f2eb);
          rimLight.intensity = 2.4 + sunsetT * 1.5;
        } else {
          ambientLight.color.setHex(0xf5f1e8);
          keyLight.color.setHex(0xfaf7f0);
          rimLight.intensity = 2.4;
        }

        // Living coffee steam & plant sway
        steamParticles.forEach((sp, i) => {
          sp.position.y = 0.82 + ((elapsedTime * 0.08 + i * 0.05) % 0.18);
          sp.position.x = 0.72 + Math.sin(elapsedTime * 2.0 + i) * 0.012;
          (sp.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.25 - (sp.position.y - 0.82) * 1.2);
        });

        plantLeaves.forEach((leaf, i) => {
          leaf.rotation.z = 0.3 + Math.sin(elapsedTime * 1.6 + i * 1.2) * 0.04;
        });

        // =====================================================================
        // CHARACTER 1 (SPECIALIST):
        // Desk -> Stand Front Team -> Hands Up -> Border Line -> Point Right
        // In Team, Control, System, Platform: FIRMLY AT FRONT BORDER LINE (Z = 1.38)
        // ZERO GLITCHING WITH THE DESK!
        // =====================================================================
        let specX = 0.65;
        let specZ = 0.35;
        let specRotY = 0;
        let specArmLX = 0;
        let specArmLZ = 0;
        let specArmRX = 0;
        let specArmRZ = 0;
        let specHeadY = 0;
        let specHeadX = 0;

        if (p <= 0.20) {
          // Scene 1: Seated at desk typing, acknowledges check-in
          specX = 0.65;
          specZ = 0.35;
          specRotY = 0;
          const typingAmp = (1.0 - t01) * 0.04;
          specArmLX = THREE.MathUtils.lerp(0.65, 0.40, t01) + Math.sin(elapsedTime * 4.0) * typingAmp;
          specArmLZ = THREE.MathUtils.lerp(0.20, 0.15, t01);
          specArmRX = THREE.MathUtils.lerp(0.65, 0.40, t01) + Math.cos(elapsedTime * 4.5) * typingAmp;
          specArmRZ = THREE.MathUtils.lerp(-0.20, -0.15, t01);
          specHeadY = THREE.MathUtils.lerp(0, -0.45, t01);
        } else if (p <= 0.40) {
          // Scene 2 -> Scene 3: STANDS UP AND COMES FORWARD TO FRONT BORDER LINE OF BOX!
          specX = THREE.MathUtils.lerp(0.65, 0.0, t12);
          specZ = THREE.MathUtils.lerp(0.35, 1.38, t12); // Reaches 1.38 at p = 0.40!
          specRotY = 0;
          specArmLX = THREE.MathUtils.lerp(0.40, 0.08, t12);
          specArmLZ = THREE.MathUtils.lerp(0.15, 0.06, t12);
          specArmRX = THREE.MathUtils.lerp(0.40, 0.08, t12);
          specArmRZ = THREE.MathUtils.lerp(-0.15, -0.06, t12);
          specHeadY = THREE.MathUtils.lerp(-0.45, 0, t12);
        } else if (p <= 0.60) {
          // Scene 3 -> Scene 4: STAYS AT FRONT BORDER LINE, RAISES BOTH HANDS UP IN AIR!
          specX = 0.0;
          specZ = 1.38; // FRONT BORDER LINE
          specRotY = 0;
          const sway = Math.sin(elapsedTime * 3.5) * 0.04 * t23;
          specArmLX = THREE.MathUtils.lerp(0.08, -2.5, t23) + sway;
          specArmLZ = THREE.MathUtils.lerp(0.06, 0.35, t23);
          specArmRX = THREE.MathUtils.lerp(0.08, -2.5, t23) + sway;
          specArmRZ = THREE.MathUtils.lerp(-0.06, -0.35, t23);
          specHeadX = THREE.MathUtils.lerp(0, -0.25, t23);
        } else if (p <= 0.80) {
          // Scene 4 -> Scene 5: STAYS AT FRONT BORDER LINE, Observant stance
          specX = 0.0;
          specZ = 1.38; // FRONT BORDER LINE
          specRotY = 0;
          specArmLX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          specArmLZ = THREE.MathUtils.lerp(0.35, 0.08, t34);
          specArmRX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          specArmRZ = THREE.MathUtils.lerp(-0.35, -0.08, t34);
          specHeadX = THREE.MathUtils.lerp(-0.25, 0, t34);
        } else {
          // Scene 5 -> Scene 6: STAYS AT FRONT BORDER LINE, Welcoming pointing to right buttons!
          specX = 0.0;
          specZ = 1.38; // FRONT BORDER LINE
          specRotY = THREE.MathUtils.lerp(0, Math.PI * 0.22, t45);
          // Clean right arm pointing without gimbal lock
          specArmRX = THREE.MathUtils.lerp(0.15, -0.35, t45);
          specArmRZ = THREE.MathUtils.lerp(-0.08, -1.35, t45);
          specArmLX = THREE.MathUtils.lerp(0.15, 0.35, t45);
          specArmLZ = THREE.MathUtils.lerp(0.08, 0.20, t45);
          specHeadY = THREE.MathUtils.lerp(0, 0.35, t45);
        }

        specialistGroup.position.set(specX, -0.98, specZ);
        specialistGroup.rotation.set(0, specRotY, 0);
        specLeftArmGroup.rotation.set(specArmLX, 0, specArmLZ);
        specRightArmGroup.rotation.set(specArmRX, 0, specArmRZ);
        specHead.rotation.set(specHeadX, specHeadY, 0);

        // =====================================================================
        // CHARACTER 2 (OPERATIONS LEAD):
        // Side -> Front Team -> Hands Up -> Border Line -> Point Right
        // In Team, Control, System, Platform: FIRMLY AT FRONT BORDER LINE (Z = 1.35)
        // ZERO GLITCHING WITH THE DESK!
        // =====================================================================
        let leadX = 1.60;
        let leadZ = 0.20;
        let leadRotY = -Math.PI * 0.35;
        let leadArmLX = 0;
        let leadArmLZ = 0;
        let leadArmRX = 0;
        let leadArmRZ = 0;
        let leadHeadY = 0;
        let leadHeadX = 0;

        if (p <= 0.20) {
          leadX = 1.60;
          leadZ = 0.20;
          leadRotY = -Math.PI * 0.35;
          leadArmLX = 0.1;
          leadArmLZ = 0.05;
          leadArmRX = 0.4;
          leadArmRZ = 0.1;
          leadHeadY = THREE.MathUtils.lerp(0, -0.4, t01);
        } else if (p <= 0.40) {
          // Scene 2 -> Scene 3: STEPS FORWARD TO FRONT BORDER LINE OF BOX!
          leadX = THREE.MathUtils.lerp(1.60, 0.75, t12);
          leadZ = THREE.MathUtils.lerp(0.20, 1.35, t12); // Reaches 1.35 at p = 0.40!
          leadRotY = THREE.MathUtils.lerp(-Math.PI * 0.35, 0, t12);
          leadArmLX = THREE.MathUtils.lerp(0.1, 0.08, t12);
          leadArmLZ = THREE.MathUtils.lerp(0.05, 0.06, t12);
          leadArmRX = THREE.MathUtils.lerp(0.4, 0.12, t12);
          leadArmRZ = THREE.MathUtils.lerp(0.1, -0.06, t12);
          leadHeadY = THREE.MathUtils.lerp(-0.4, 0, t12);
        } else if (p <= 0.60) {
          // Scene 3 -> Scene 4: STAYS AT FRONT BORDER LINE, RAISES BOTH HANDS UP IN AIR!
          leadX = 0.75;
          leadZ = 1.35; // FRONT BORDER LINE
          leadRotY = 0;
          const sway = Math.sin(elapsedTime * 3.5 + 1) * 0.04 * t23;
          leadArmLX = THREE.MathUtils.lerp(0.08, -2.5, t23) + sway;
          leadArmLZ = THREE.MathUtils.lerp(0.06, 0.35, t23);
          leadArmRX = THREE.MathUtils.lerp(0.12, -2.5, t23) + sway;
          leadArmRZ = THREE.MathUtils.lerp(-0.06, -0.35, t23);
          leadHeadX = THREE.MathUtils.lerp(0, -0.25, t23);
        } else if (p <= 0.80) {
          // Scene 4 -> Scene 5: STAYS AT FRONT BORDER LINE, Observant stance
          leadX = 0.75;
          leadZ = 1.35; // FRONT BORDER LINE
          leadRotY = 0;
          leadArmLX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          leadArmLZ = THREE.MathUtils.lerp(0.35, 0.08, t34);
          leadArmRX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          leadArmRZ = THREE.MathUtils.lerp(-0.35, -0.08, t34);
          leadHeadX = THREE.MathUtils.lerp(-0.25, 0, t34);
        } else {
          // Scene 5 -> Scene 6: STAYS AT FRONT BORDER LINE, Welcoming pointing to right buttons!
          leadX = 0.75;
          leadZ = 1.35; // FRONT BORDER LINE
          leadRotY = THREE.MathUtils.lerp(0, Math.PI * 0.22, t45);
          leadArmRX = THREE.MathUtils.lerp(0.15, -0.35, t45);
          leadArmRZ = THREE.MathUtils.lerp(-0.08, -1.35, t45);
          leadArmLX = THREE.MathUtils.lerp(0.15, 0.35, t45);
          leadArmLZ = THREE.MathUtils.lerp(0.08, 0.20, t45);
          leadHeadY = THREE.MathUtils.lerp(0, 0.35, t45);
        }

        leadGroup.position.set(leadX, -0.98, leadZ);
        leadGroup.rotation.set(0, leadRotY, 0);
        leadLeftArmGroup.rotation.set(leadArmLX, 0, leadArmLZ);
        leadRightArmGroup.rotation.set(leadArmRX, 0, leadArmRZ);
        leadHead.rotation.set(leadHeadX, leadHeadY, 0);

        // =====================================================================
        // CHARACTER 3 (CUSTOMER / TEAM MEMBER):
        // Walks Along Front Promenade (Z >= 1.25) -> Front Team -> Hands Up -> Border Line -> Point Right
        // ZERO GLITCHING WITH THE DESK (Desk is at Z <= 0.22)!
        // =====================================================================
        let custX = 2.4;
        let custZ = 1.35;
        let custRotY = -Math.PI * 0.5;
        let custArmLX = 0;
        let custArmLZ = 0;
        let custArmRX = 0;
        let custArmRZ = 0;
        let custHeadY = 0;
        let custHeadX = 0;

        if (p <= 0.20) {
          // Customer walks along the wide front promenade (Z: 1.35 -> 1.25), stopping safely IN FRONT of podium!
          custX = THREE.MathUtils.lerp(2.4, -0.75, t01);
          custZ = THREE.MathUtils.lerp(1.35, 1.25, t01); // ALWAYS >= 1.25, over 1m from desk!
          custRotY = -Math.PI * 0.5;

          const isWalking = t01 > 0.05 && t01 < 0.95;
          const walkCycle = t01 * Math.PI * 6.0;
          const stride = isWalking ? 0.6 : 0.0;
          customerLeftLegGroup.rotation.x = Math.sin(walkCycle) * stride;
          customerRightLegGroup.rotation.x = -Math.sin(walkCycle) * stride;

          if (t01 > 0.70) {
            const reach = (t01 - 0.70) / 0.30;
            custArmRX = THREE.MathUtils.lerp(0, -0.70, reach);
            custArmLX = -Math.sin(walkCycle) * (stride * 0.8);
            ticketGroup.scale.setScalar(reach);
            ticketMesh.position.y = -0.10 - reach * 0.14;
          } else {
            custArmRX = Math.sin(walkCycle) * (stride * 0.8);
            custArmLX = -Math.sin(walkCycle) * (stride * 0.8);
            ticketGroup.scale.setScalar(0.001);
          }
        } else if (p <= 0.40) {
          // Steps forward from podium (1.25) to front team border line (1.35) and faces forward!
          customerLeftLegGroup.rotation.x = 0;
          customerRightLegGroup.rotation.x = 0;
          ticketGroup.scale.setScalar(0.001);

          custX = -0.75;
          custZ = THREE.MathUtils.lerp(1.25, 1.35, t12); // Reaches 1.35 at p = 0.40!
          custRotY = THREE.MathUtils.lerp(-Math.PI * 0.5, 0, t12);
          custArmLX = THREE.MathUtils.lerp(0, 0.08, t12);
          custArmLZ = THREE.MathUtils.lerp(0, 0.06, t12);
          custArmRX = THREE.MathUtils.lerp(-0.70, 0.08, t12);
          custArmRZ = THREE.MathUtils.lerp(0, -0.06, t12);
          custHeadY = 0;
        } else if (p <= 0.60) {
          // STAYS AT FRONT BORDER LINE, RAISES BOTH HANDS UP IN AIR!
          customerLeftLegGroup.rotation.x = 0;
          customerRightLegGroup.rotation.x = 0;
          ticketGroup.scale.setScalar(0.001);

          custX = -0.75;
          custZ = 1.35; // FRONT BORDER LINE
          custRotY = 0;
          const sway = Math.sin(elapsedTime * 3.5 + 2) * 0.04 * t23;
          custArmLX = THREE.MathUtils.lerp(0.08, -2.5, t23) + sway;
          custArmLZ = THREE.MathUtils.lerp(0.06, 0.35, t23);
          custArmRX = THREE.MathUtils.lerp(0.08, -2.5, t23) + sway;
          custArmRZ = THREE.MathUtils.lerp(-0.06, -0.35, t23);
          custHeadX = THREE.MathUtils.lerp(0, -0.25, t23);
        } else if (p <= 0.80) {
          // STAYS AT FRONT BORDER LINE, Observant stance
          custX = -0.75;
          custZ = 1.35; // FRONT BORDER LINE
          custRotY = 0;
          custArmLX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          custArmLZ = THREE.MathUtils.lerp(0.35, 0.08, t34);
          custArmRX = THREE.MathUtils.lerp(-2.5, 0.15, t34);
          custArmRZ = THREE.MathUtils.lerp(-0.35, -0.08, t34);
          custHeadX = THREE.MathUtils.lerp(-0.25, 0, t34);
        } else {
          // STAYS AT FRONT BORDER LINE, Welcoming pointing to right buttons!
          custX = -0.75;
          custZ = 1.35; // FRONT BORDER LINE
          custRotY = THREE.MathUtils.lerp(0, Math.PI * 0.22, t45);
          custArmRX = THREE.MathUtils.lerp(0.15, -0.35, t45);
          custArmRZ = THREE.MathUtils.lerp(-0.08, -1.35, t45);
          custArmLX = THREE.MathUtils.lerp(0.15, 0.35, t45);
          custArmLZ = THREE.MathUtils.lerp(0.08, 0.20, t45);
          custHeadY = THREE.MathUtils.lerp(0, 0.35, t45);
        }

        customerGroup.position.set(custX, -0.98, custZ);
        customerGroup.rotation.set(0, custRotY, 0);
        customerLeftArmGroup.rotation.set(custArmLX, 0, custArmLZ);
        customerRightArmGroup.rotation.set(custArmRX, 0, custArmRZ);
        custHead.rotation.set(custHeadX, custHeadY, 0);

        // Terminal Confirmation Halo Pulse in Scene 2
        if (p > 0.15 && p < 0.35) {
          const pulse = Math.min(1, (p - 0.15) / 0.10);
          terminalActiveMat.emissiveIntensity = 0.5 + pulse * 1.2 + Math.sin(elapsedTime * 3.0) * 0.2;
          confirmHaloMat.opacity = pulse * 0.3 + Math.sin(elapsedTime * 2.0) * 0.05;
          confirmHaloMesh.scale.setScalar(1.0 + pulse * 0.4);
        } else {
          terminalActiveMat.emissiveIntensity = 0.4;
          confirmHaloMat.opacity = 0.02;
          confirmHaloMesh.scale.setScalar(1.0);
        }

        // -------------------------------------------------------------
        // SCENE 03 (STAFF / TEAM): Swiss Split-Flap Schedule Tiles Flip
        // -------------------------------------------------------------
        if (p > 0.20 && p < 0.55) {
          const staffProg = p <= 0.40 ? t12 : 1.0 - (p - 0.40) / 0.15;
          staffHudGroup.scale.setScalar(Math.max(0.001, staffProg));
          staffHudGroup.position.y = 1.35 + staffProg * 0.15;

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
        // SCENE 04 (CONTROL): Monolith, Pistons & RANDOM DATA BACKGROUND WALL
        // -------------------------------------------------------------
        if (p > 0.40 && p < 0.78) {
          const ctrlProg = p <= 0.60 ? t23 : 1.0 - t34;
          controlPillarGroup.scale.setScalar(Math.max(0.001, ctrlProg));
          controlPillarGroup.position.y = -0.98 + (ctrlProg - 1.0) * 0.5;

          barMesh1.scale.y = Math.min(1, ctrlProg * 1.2);
          barMesh2.scale.y = Math.min(1, ctrlProg * 1.1);
          barMesh3.scale.y = Math.min(1, ctrlProg * 1.0);
          tickerRing.rotation.z = elapsedTime * 0.4;

          controlDataBgGroup.scale.setScalar(Math.max(0.001, ctrlProg));
          dataBars.forEach((b) => {
            const dynamicH = b.baseHeight + Math.sin(elapsedTime * b.speed + b.phase) * (b.baseHeight * 0.42);
            b.mesh.scale.y = Math.max(0.1, dynamicH);
            b.mesh.position.y = (b.mesh.scale.y * 0.5) - 0.7;
          });

          dataScatterNodes.forEach((node, i) => {
            node.position.y = 0.3 + Math.sin(elapsedTime * 2.5 + i) * 0.12;
            node.rotation.y = elapsedTime * 1.2 + i;
          });
        } else {
          controlPillarGroup.scale.setScalar(0.001);
          controlDataBgGroup.scale.setScalar(0.001);
        }

        // -------------------------------------------------------------
        // SCENE 05 (SYSTEM): Connected Charts Architecture Background & Conduits
        // -------------------------------------------------------------
        if (p > 0.60 && p < 0.95) {
          const sysProg = p <= 0.80 ? t34 : 1.0 - t45;
          systemArchitectureBgGroup.scale.setScalar(Math.max(0.001, sysProg));

          archPackets.forEach((pkt) => {
            const t = (elapsedTime * pkt.speed + pkt.offset) % 1.0;
            pkt.mesh.position.x = THREE.MathUtils.lerp(pkt.start.x, pkt.end.x, t);
            pkt.mesh.position.y = THREE.MathUtils.lerp(pkt.start.y, pkt.end.y, t);
            pkt.mesh.position.z = 0.05;
          });

          conduitMat.opacity = sysProg * 0.9;
          conduitMat.emissiveIntensity = 0.2 + sysProg * 0.6 + Math.sin(elapsedTime * 4.0) * 0.3;

          moduleGlyphs.forEach((g, i) => {
            g.scale.setScalar(sysProg);
            g.position.y = 0.2 + Math.sin(elapsedTime * 2.0 + i) * 0.08;
            g.rotation.y = elapsedTime * 0.8 + i;
          });

          const packetT1 = (elapsedTime * 0.8) % 1.0;
          packetNode1.position.x = THREE.MathUtils.lerp(-0.75, 0.65, packetT1);
          packetNode1.position.z = THREE.MathUtils.lerp(0.45, -0.3, packetT1);
          packetNode1.position.y = 0.02;

          const packetT2 = (elapsedTime * 0.9 + 0.5) % 1.0;
          packetNode2.position.x = THREE.MathUtils.lerp(0.65, 1.45, packetT2);
          packetNode2.position.z = THREE.MathUtils.lerp(-0.3, -0.75, packetT2);
          packetNode2.position.y = 0.02;
        } else {
          systemArchitectureBgGroup.scale.setScalar(0.001);
          conduitMat.opacity = 0.0;
          moduleGlyphs.forEach((g) => g.scale.setScalar(0.001));
        }

        // -------------------------------------------------------------
        // SCENE 06 (PLATFORM): Canopy Pergola & Ambient Glow
        // -------------------------------------------------------------
        if (p > 0.80) {
          canopyGroup.scale.setScalar(t45);
          canopyGroup.position.y = 2.2 + t45 * 0.3;
        } else {
          canopyGroup.scale.setScalar(0.001);
        }

        // Ambient Upward Dust Particles
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
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
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
