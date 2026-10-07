"use client";

import React from "react";
import NoiseGrainOverlay from "./NoiseGrainOverlay";
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
 * Luxury architectural background suite combining:
 * 1. Tactile Khadi paper micro-grain texture
 * 2. Deep background parallax ghost watermark numerals
 * 3. Harmonic topographic contour elevation waves
 * 4. Minimalist bottom telemetry ribbon
 */
export function BackgroundEnvironment({
  activeScene = 0,
  enableGrain = true,
  enableCadGrid = false,
  enableWatermark = true,
  enableTopography = true,
  enableTelemetry = true,
}: BackgroundEnvironmentProps) {
  return (
    <>
      {/* Topographic Contour Elevation Waves (Deep background) */}
      {enableTopography && <TopographicContourWaves />}

      {/* Kinetic Ghost Watermark Numerals (Parallax scale) */}
      {enableWatermark && <GhostWatermarkNumerals activeScene={activeScene} />}

      {/* Tactile Khadi Paper / Linen Micro-Grain Texture */}
      {enableGrain && <NoiseGrainOverlay />}

      {/* Minimalist Live Telemetry Bar (Bottom Viewport Ribbon) */}
      {enableTelemetry && <LiveTelemetryRibbon activeScene={activeScene} />}
    </>
  );
}

export default BackgroundEnvironment;
