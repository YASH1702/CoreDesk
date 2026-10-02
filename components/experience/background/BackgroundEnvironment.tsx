"use client";

import React from "react";
import NoiseGrainOverlay from "./NoiseGrainOverlay";
import ArchitecturalCadGrid from "./ArchitecturalCadGrid";
import GhostWatermarkNumerals from "./GhostWatermarkNumerals";
import TopographicContourWaves from "./TopographicContourWaves";
import LiveTelemetryRibbon from "./LiveTelemetryRibbon";

export interface BackgroundEnvironmentProps {
  activeScene?: number;
  enableGrain?: boolean;
  enableCadGrid?: boolean;
  enableWatermark?: boolean;
  enableTopography?: boolean;
  enableTelemetry?: boolean;
}

/**
 * BackgroundEnvironment
 * Comprehensive luxury architectural background suite combining:
 * 1. Tactile Khadi paper micro-grain texture
 * 2. Swiss CAD grid, viewfinder brackets, and registration crosshairs
 * 3. Deep background parallax ghost watermark numerals
 * 4. Harmonic topographic contour elevation waves
 * 5. Minimalist bottom telemetry ribbon
 */
export function BackgroundEnvironment({
  activeScene = 0,
  enableGrain = true,
  enableCadGrid = true,
  enableWatermark = true,
  enableTopography = true,
  enableTelemetry = true,
}: BackgroundEnvironmentProps) {
  return (
    <>
      {/* 4. Topographic Contour Elevation Waves (Deep background) */}
      {enableTopography && <TopographicContourWaves />}

      {/* 3. Kinetic Ghost Watermark Numerals (Parallax scale) */}
      {enableWatermark && <GhostWatermarkNumerals activeScene={activeScene} />}

      {/* 2. Swiss Architectural CAD Grid & Viewfinder Brackets */}
      {enableCadGrid && <ArchitecturalCadGrid />}

      {/* 1. Tactile Khadi Paper / Linen Micro-Grain Texture */}
      {enableGrain && <NoiseGrainOverlay />}

      {/* 5. Minimalist Live Telemetry Bar (Bottom Viewport Ribbon) */}
      {enableTelemetry && <LiveTelemetryRibbon activeScene={activeScene} />}
    </>
  );
}

export default BackgroundEnvironment;
