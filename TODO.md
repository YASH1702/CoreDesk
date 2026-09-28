# TODO.md — BusinessFlow Redesign Tracker

> Last Updated: 2026-09-28
> Status: **Phases 0, 1, 2, 3, 4 Complete → Phase 5 Polish & Deployment Verified**

---

## PHASE 0 — EXISTING PROJECT AUDIT ✅

- [x] Inspect package.json (17 deps, 7 devDeps)
- [x] Inspect Next.js configuration (next.config.ts)
- [x] Inspect folder structure (8 top-level dirs, ~50 source files)
- [x] Inspect all routes (18 routes: 4 static, 12 dynamic, 2 API)
- [x] Inspect all components (20 components across 4 dirs)
- [x] Inspect Tailwind configuration (Warm Sand tokens defined)
- [x] Inspect global CSS (171 lines, glass/gold utilities)
- [x] Inspect Prisma schema (18 models, 283 lines)
- [x] Inspect database access layer (lib/prisma.ts singleton)
- [x] Inspect authentication (NextAuth JWT + Credentials)
- [x] Inspect middleware (role-based dashboard protection)
- [x] Inspect server actions (6 files, ~500 lines total)
- [x] Inspect booking logic (5-step wizard, mock time slots)
- [x] Inspect availability service (real slot calc)
- [x] Inspect constants (5 industry archetypes)
- [x] Inspect deployment (Vercel, Supabase PostgreSQL)
- [x] Classify: KEEP / REFACTOR / REPLACE / REMOVE / NEW
- [x] Create AI_CONTEXT.md
- [x] Create TODO.md

---

## PHASE 1 — DESIGN + ARCHITECTURE FOUNDATION ✅

### 1.1 New Dependencies
- [x] Install GSAP + ScrollTrigger
- [x] Install bcryptjs (password hashing)
- [x] Install type definitions (@types/bcryptjs)
- [x] Clean up unused/deprecated packages (`three-mesh-bvh`, `recharts`, `@react-three/fiber`)
- [x] Update Next.js to 15.5.26 (un-deprecated, patched security release)
- [x] Update Prisma & Client to 5.22.0

### 1.2 Design Tokens
- [x] Extend tailwind.config.ts with motion tokens
- [x] Add animation duration tokens (fast/medium/slow/premium)
- [x] Add easing curve tokens
- [x] Add z-index scale for scene layering
- [x] Add breakpoint-aware motion distances

### 1.3 Typography System
- [x] Define headline scale (editorial large, text-display-xl, text-display-lg)
- [x] Define body/metadata scale
- [x] Define uppercase label styles (text-label-sm, text-label-xs)

### 1.4 Scroll Architecture
- [x] Create ScrollExperience master scrubbed pinned timeline
- [x] Create SceneSection full-height container
- [x] Implement deterministic forward and reverse scroll transformations
- [x] Synchronize progress and active scene calculation
- [x] Support prefers-reduced-motion fallback

### 1.5 Navigation
- [x] Create persistent minimal ExperienceNav with brand mark and fast shortcuts
- [x] Create SceneNav with 01-06 category indicators and active scene illumination
- [x] Implement dynamic vertical progress track
- [x] Support smooth jump navigation on click

---

## PHASE 2 — CINEMATIC EXPERIENCE PROTOTYPE ✅

### 2.1 Page 01 — THE BUSINESS
- [x] Business environment composition with Warm Sand architectural lighting
- [x] "YOUR BUSINESS, BEAUTIFULLY CONNECTED." editorial headline
- [x] Glass workspace preview with live metric panels (₹1,24,500 Revenue, 18 Confirmed Slots, 8 Staff)
- [x] Action CTAs for live booking and sign-in

### 2.2 Page 02 — CUSTOMER EXPERIENCE
- [x] "BOOKING SHOULDN'T FEEL LIKE WORK." editorial headline
- [x] 4-step self-booking progression journey UI (Package → Specialist → Slot → Checkout)
- [x] Warm Sand luxury glass container styling

### 2.3 Page 01 → 02 Transition
- [x] Page 01 elements disassemble horizontally (headline left, panel right)
- [x] Background smoothly transforms from business to customer palette
- [x] Page 02 elements assemble into place (headline from left, journey from right)
- [x] Verified bidirectional scrub support

---

## PHASE 3 — EXPAND CINEMATIC EXPERIENCE ✅

### 3.1 Page 03 — STAFF OPERATIONS
- [x] "YOUR TEAM SEES THE OPERATION." headline
- [x] Specialist Duty Schedule with active team members (Aarav, Maya, Rohan)
- [x] Operational shift workload bar (09:00 - 17:00)

### 3.2 Page 04 — BUSINESS CONTROL
- [x] "EVERYTHING HAPPENING. ONE PLACE." headline
- [x] 248 Bookings, ₹1,24,500 Revenue, 86 New Customers, 4.8 Rating metrics
- [x] Weekly revenue volume bar chart and top services breakdown

### 3.3 Page 05 — THE OPERATING SYSTEM
- [x] "ONE SYSTEM. EVERY MOVING PART." headline
- [x] 8 interconnected system modules (Business, Services, Customers, Staff, Bookings, Payments, Notifications, Analytics)
- [x] Relational telemetry status and single source of truth badges

### 3.4 Page 06 — FINAL PLATFORM / CTA
- [x] "MORE THAN A WEBSITE. A BUSINESS THAT RUNS." editorial headline
- [x] Centered minimalist conclusion of the product film
- [x] Dual CTAs (Launch Live Experience / Sign In to Admin)

---

## PHASE 4 — PRODUCT APPLICATION ✅

### 4.1 Database Evolution
- [x] Add BusinessMember model (User <-> Business multi-membership)
- [x] Add BusinessHours model (business-level hours)
- [x] Add Holiday model (closure dates)
- [x] Add Inquiry model (structured inquiries)
- [x] Synchronized schema to Supabase PostgreSQL via `npx prisma db push`
- [x] Added Linux binary targets to schema (`rhel-openssl-3.0.x`, `debian-openssl-3.0.x`)

### 4.2 Authentication & Security
- [x] Add bcrypt password hashing and comparison in `lib/auth.ts`
- [x] Hash passwords on registration in `actions/auth.ts`
- [x] Create BusinessMember record upon business owner signup

### 4.3 Multi-Business & Booking Architecture
- [x] Remove hardcoded `prisma.business.findFirst()` in `actions/booking.ts`
- [x] Connect `fetchAvailableTimeSlots` to deterministic conflict-checking logic
- [x] Support optional `businessIdentifier` across all actions (`actions/dashboard.ts`, `actions/appointments.ts`, `actions/cms.ts`, `actions/services.ts`)
- [x] Create public business website route `/business/[slug]` driven dynamically by database records
- [x] Add interactive client Inquiry form (`InquiryForm.tsx`) on `/business/[slug]`
- [x] Multi-business dashboard switcher dropdown in `DashboardLayoutWrapper.tsx`
- [x] Modal for provisioning new business entities (`createNewBusiness`)
- [x] Admin Inquiries management page (`/dashboard/admin/inquiries`)

### 4.4 Booking Engine
- [x] Passed `serviceId` through booking wizard into `DateTimeStep`
- [x] Connected real availability engine to calculate open slots without overlap
- [x] Cleaned up duplicate Provider wrappers across all dashboard sub-pages

---

## PHASE 5 — VERIFICATION & DEPLOYMENT ✅

- [x] Verified `npx tsc --noEmit` with 0 type errors
- [x] Verified `prisma generate && next build` compiled with exit code 0 across 21 routes
- [x] Added `.npmrc` with `legacy-peer-deps=true` for Vercel
- [x] Set explicit `"build": "prisma generate && next build"` in package.json
- [x] Replaced `useLayoutEffect` with `useEffect` in all client navigation components
- [x] Synchronized local repository with remote GitHub (`main` -> `origin/main`)

---

## PHASE 6 — 3D SELECTIVE SPATIAL CANVAS ✅

- [x] Created `AmbientSpatialCanvas.tsx` using Three.js with pure client lifecycle and SSR safety
- [x] Implemented luxury Warm Sand crystalline facets (translucent glass polyhedrons with champagne gold wireframe cages)
- [x] Created precision horology orbital astrolabe rings (`#C69A4B`)
- [x] Added 180 floating warm-gold dust stardust particles with gentle sinusoidal drift and looped boundary reset
- [x] Integrated fluid pointer parallax with lerp damping for camera and spatial group tilt
- [x] Added tab visibility change detection (pauses RAF loop when tab is hidden to save 0% CPU)
- [x] Added `prefers-reduced-motion` detection and graceful fallback
- [x] Clean GPU memory and resource disposal on unmount (geometries, materials, renderer context loss)
- [x] Embedded `<AmbientSpatialCanvas />` into `BusinessScene.tsx` behind editorial typography and metric card
- [x] Verified zero TypeScript errors and successful production build across all routes

