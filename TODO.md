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

---

## PHASE 7 — SCENE SCROLL PINNING & STRIPE ARCHITECTURE ✅

- [x] Replaced fragile CSS sticky with native GSAP ScrollTrigger pinning (`pin: stage`) across 4500px scrub track
- [x] Removed conflicting `transition-opacity` from scene layers ensuring instant, flicker-free GSAP opacity control
- [x] Updated layout overflow to `overflow-x: clip` in `globals.css` and `app/page.tsx` to prevent scroll-container interference
- [x] Added animated "Scroll to explore OS" visual prompt on Page 01 (Hero)
- [x] Built mobile floating scene pagination pill with previous/next arrows and active category labels
- [x] Added deterministic scene jump calculations mapped to `ScrollTrigger.getById("experience-trigger")`
- [x] Created Stripe client singleton in `lib/stripe.ts` with build-time fallback safety
- [x] Created `createPaymentIntentAction` in `actions/stripe.ts` supporting live and test modes
- [x] Built Stripe webhook handler at `app/api/webhooks/stripe/route.ts` with signature verification
- [x] Linked `stripePaymentIntentId` to appointments and verified payments in `actions/booking.ts`
- [x] Verified build passes across all 22 routes

---

## PHASE 8 — INNGEST BACKGROUND WORKFLOWS & INDUSTRY ARCHETYPES ✅

- [x] Installed and configured Inngest v3 client singleton in `lib/inngest/client.ts`
- [x] Created Inngest background workflow functions in `lib/inngest/functions.ts`:
  - `sendBookingConfirmation`: immediate email dispatch + scheduled 24h pre-session reminder
  - `handleBookingCancellation`: calendar slot release and cancellation notice
  - `handleInquiryReceived`: intake alert and owner notification
- [x] Built Inngest App Router endpoint at `app/api/inngest/route.ts` using `serve`
- [x] Wired event dispatching in `actions/booking.ts` (`appointment.created`, `appointment.cancelled`)
- [x] Wired event dispatching in `actions/dashboard.ts` (`inquiry.received`)
- [x] Connected dynamic industry archetype terminology (`INDUSTRY_ARCHETYPES`) to public website at `app/business/[slug]/page.tsx`
- [x] Connected dynamic industry terminology to Booking Wizard at `app/book/page.tsx`

---

## PHASE 9 — MASTER PROMPT SPECIFICATION & ARCHITECTURAL COMPLETION ✅

- [x] Implemented role-aware root dashboard entry route at `app/dashboard/page.tsx` redirecting authenticated users by role (`ADMIN`/`BUSINESS_OWNER` → `/dashboard/admin`, `STAFF` → `/dashboard/staff`, `CUSTOMER` → `/dashboard/customer`) and guests to `/login`
- [x] Implemented direct role shortcut routes:
  - `app/staff/page.tsx` (redirects to `/dashboard/staff`)
  - `app/customer/page.tsx` (redirects to `/dashboard/customer`)
- [x] Implemented dynamic business-scoped booking route at `app/book/[businessSlug]/page.tsx`
- [x] Extracted reusable `BookingWizard.tsx` client component supporting initial business slug and pre-selected `serviceId` from query params
- [x] Linked public business website (`app/business/[slug]/page.tsx`) hero and service card booking buttons directly to `/book/${business.slug}` and `/book/${business.slug}?serviceId=${svc.id}`
- [x] Implemented all conceptual Section 36 route aliases:
  - `/dashboard/business` → `/dashboard/admin/cms`
  - `/dashboard/services` → `/dashboard/admin/services`
  - `/dashboard/bookings` → `/dashboard/admin/appointments`
  - `/dashboard/customers` → `/dashboard/admin/customers`
  - `/dashboard/payments` → `/dashboard/admin/invoices`
  - `/dashboard/settings` → `/dashboard/admin/cms`
  - `/dashboard/analytics` → `/dashboard/admin/analytics`
- [x] Built dedicated Executive Analytics cockpit at `app/dashboard/admin/analytics/page.tsx` with:
  - Gross Booked Revenue, Appointment Volume, Average Ticket Value, and Client Retention Rate KPIs
  - Responsive 6-month revenue and session trajectory visual chart
  - Session fulfillment state progress breakdown (Confirmed, Pending, Completed, Cancelled)
  - Service portfolio revenue yield and share of business progress indicators
  - Specialist operational workload distribution and fulfillment rate
  - Stripe payment gateway settlement liquidity telemetry (Paid, Pending Escrow, Failed)
- [x] Built server action `actions/analytics.ts` (`getBusinessAnalytics`) computing real Prisma data
- [x] Added Analytics navigation item with `BarChart3` icon to `DashboardLayoutWrapper.tsx`
- [x] Verified `npx tsc --noEmit` with 0 type errors
- [x] Verified `npm run build` compiled with exit code 0 across all 36 routes

---

## PHASE 10 — SCROLL ANIMATION & SCENENAV OVERLAP FIX ✅

- [x] Resolved SceneNav layout overlap: refactored desktop SceneNav into a sleek 28px hairline rail with expanding active pill (`01 · BUSINESS`), clearing all product cards
- [x] Added `lg:pr-20` and `max-w-6xl` padding across all scene layouts ensuring 50px+ margin clearance from right navigation controls
- [x] Reduced scroll scrub track from 4500px to responsive 2800px with `scrub: 0.5` for immediate, tactile responsiveness
- [x] Eliminated dead scroll delay: transitions begin within first 40px of scrolling
- [x] Promoted `<AmbientSpatialCanvas />` to root stage level in `ScrollExperience.tsx` so 3D orbital rings and stardust persist across all 6 scenes
- [x] Fixed GSAP missing target warnings by wrapping element queries in safe selection guards
- [x] Integrated `ScrollToPlugin` in `app/page.tsx` for smooth, jitter-free scene jump navigation on click
- [x] Replaced `onComplete` pointer-events callbacks with timeline `.set()` for deterministic forward and reverse scrubbing
- [x] Verified in headless browser with live DevTools inspection across all scroll positions (0px, 200px, 550px, 1100px, 1650px, 2200px, 2800px)

---

## PHASE 11 — CONCIERGE AI & MULTI-PLATFORM CALENDAR SYNCHRONIZATION ✅

- [x] Built `CoreDeskConcierge.tsx` floating conversational assistant with natural language understanding
- [x] Supported slot availability queries, specialist directory, service packages & pricing breakdown
- [x] Provided interactive action cards (one-click booking shortcuts, specialist profiles, system architecture deep-links)
- [x] Styled concierge with Day Khadi (`#FAF8F5`) and Night Espresso Noir (`#18120D`) frosted glass blur
- [x] Integrated `MagneticWrapper` on floating concierge trigger pill with live pulse status
- [x] Mounted `CoreDeskConcierge` in root `app/layout.tsx` across the entire application
- [x] Enhanced `utils/calendar.ts` with deep-links for Google Calendar, Outlook.com, Microsoft 365, Yahoo, and RFC 5545 `.ics` with 15-minute reminder alarms
- [x] Created `UniversalCalendarSyncButton.tsx` with frosted multi-provider dropdown selector
- [x] Upgraded `CalendarDownloadButton.tsx` to seamlessly wrap multi-provider sync
- [x] Added instant calendar sync directly to `/book/confirmation/[id]`
- [x] Added 1-click calendar sync directly to specialist appointment cards in `/dashboard/staff`
- [x] Added Sync column with calendar sync button in admin live appointments queue `/dashboard/admin/appointments`
- [x] Verified `npx tsc --noEmit` with 0 type errors
- [x] Verified `npm run build` compiled all routes cleanly with exit code 0
- [x] Synchronized commits to remote `main`


