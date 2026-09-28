# TODO.md — BusinessFlow Redesign Tracker

> Last Updated: 2026-09-28
> Status: **Phases 0, 1, 2, 3 Complete; Phase 4 In Progress**

---

## PHASE 0 — EXISTING PROJECT AUDIT ✅

- [x] Inspect package.json (49 lines, 17 deps, 7 devDeps)
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
- [x] Inspect availability service (real slot calc, but incomplete)
- [x] Inspect constants (5 industry archetypes)
- [x] Inspect deployment (Vercel, Supabase PostgreSQL)
- [x] Classify: KEEP / REFACTOR / REPLACE / REMOVE / NEW
- [x] Create AI_CONTEXT.md
- [x] Create TODO.md

---

## PHASE 1 — DESIGN + ARCHITECTURE FOUNDATION ✅

### 1.1 New Dependencies
- [x] Install GSAP + ScrollTrigger
- [x] Install Three.js + React Three Fiber + @react-three/drei
- [x] Install bcryptjs (password hashing)
- [x] Install type definitions (@types/three, @types/bcryptjs)

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

## PHASE 4 — PRODUCT APPLICATION (IN PROGRESS)

### 4.1 Database Evolution
- [x] Add BusinessMember model (User <-> Business multi-membership)
- [x] Add BusinessHours model (business-level hours)
- [x] Add Holiday model (closure dates)
- [x] Add Inquiry model (structured inquiries)
- [x] Synchronized schema to Supabase PostgreSQL via `npx prisma db push`

### 4.2 Authentication & Security
- [x] Add bcrypt password hashing and comparison in `lib/auth.ts`
- [x] Hash passwords on registration in `actions/auth.ts`
- [x] Create BusinessMember record upon business owner signup

### 4.3 Multi-Business & Booking Architecture
- [x] Remove hardcoded `prisma.business.findFirst()` in `actions/booking.ts`
- [x] Connect `fetchAvailableTimeSlots` to deterministic conflict-checking logic
- [x] Support optional `businessIdentifier` across all actions (`actions/dashboard.ts`, `actions/appointments.ts`, `actions/cms.ts`, `actions/services.ts`)
- [x] Create public business website route `/business/[slug]` driven dynamically by database records
- [ ] Multi-business dashboard switcher UI

- [ ] Page 02 elements enter (horizontal movement)
- [ ] Typography participates in transition
- [ ] Product UI participates in transition
- [ ] Test forward scroll
- [ ] Test reverse scroll
- [ ] Test fast scroll
- [ ] Test slow scroll

---

## PHASE 3 — EXPAND CINEMATIC EXPERIENCE

### 3.1 Page 03 — STAFF OPERATIONS
- [ ] "YOUR TEAM SEES THE OPERATION." headline
- [ ] Staff profiles / appointment timeline
- [ ] Schedule/availability visualization
- [ ] Modern operational background
- [ ] Distinct composition from Pages 01-02

### 3.2 Page 04 — BUSINESS CONTROL
- [ ] "EVERYTHING HAPPENING. ONE PLACE." headline
- [ ] Revenue chart / booking trend / customer growth
- [ ] 248 BOOKINGS / ₹1,24,500 REVENUE / 86 NEW CUSTOMERS / 4.8 RATING
- [ ] Executive/analytical background
- [ ] Distinct composition from Pages 01-03

### 3.3 Page 05 — THE OPERATING SYSTEM
- [ ] "ONE SYSTEM. EVERY MOVING PART." headline
- [ ] Connected modules visualization
- [ ] Business → Services → Customers → Staff → Bookings → Payments flow
- [ ] System/architecture background
- [ ] Subtle gold/bronze connections

### 3.4 Page 06 — FINAL PLATFORM / CTA
- [ ] "MORE THAN A WEBSITE. A BUSINESS THAT RUNS." headline
- [ ] "VIEW CASE STUDY" primary CTA
- [ ] Clean, quiet closing composition
- [ ] Minimal premium background

### 3.5 All Transitions
- [ ] Page 02 → 03 transition
- [ ] Page 03 → 04 transition
- [ ] Page 04 → 05 transition
- [ ] Page 05 → 06 transition
- [ ] Variation in transition types (not mechanically identical)

---

## PHASE 4 — PRODUCT APPLICATION

### 4.1 Database Evolution
- [ ] Add BusinessMember model (multi-business membership)
- [ ] Add BusinessHours model
- [ ] Add Holiday model
- [ ] Add Inquiry model
- [ ] Scope Notification to business
- [ ] Evolve User model for multi-business
- [ ] Create migration (non-destructive)
- [ ] Update seed data

### 4.2 Authentication
- [ ] Add bcrypt password hashing
- [ ] Update auth.ts authorize() to use bcrypt compare
- [ ] Update registerUser to hash passwords
- [ ] Redesign login page (BusinessFlow visual language)
- [ ] Redesign signup page
- [ ] Redesign forgot-password page

### 4.3 Multi-Business Support
- [ ] Update all server actions to accept businessId parameter
- [ ] Remove all `prisma.business.findFirst()` patterns
- [ ] Add business context to session/token
- [ ] Business selection/switching UI
- [ ] Business creation flow

### 4.4 Public Business Website
- [ ] Create `/business/[slug]` route
- [ ] Business info, services, team, testimonials, contact
- [ ] Content driven by database (not hardcoded)
- [ ] SEO metadata per business
- [ ] Booking CTA linking to `/book/[businessSlug]`

### 4.5 Booking Engine
- [ ] Integrate real availability engine
- [ ] Use business hours + staff availability + leaves + holidays
- [ ] Deterministic slot calculation (no fake slots)
- [ ] Redesign booking flow UI (BusinessFlow visual language)
- [ ] Proper date/time handling
- [ ] Update `/book/[businessSlug]` route

### 4.6 Payments (Stripe)
- [ ] Real PaymentIntent creation
- [ ] Server-side payment handling
- [ ] Stripe webhook endpoint
- [ ] Payment status tracking
- [ ] Remove mock payment code

### 4.7 Background Jobs (Inngest)
- [ ] Set up Inngest client
- [ ] Booking confirmation event
- [ ] Booking reminder event
- [ ] Payment status event
- [ ] Notification dispatch

### 4.8 Dashboards
- [ ] Redesign admin dashboard (BusinessFlow visual language)
- [ ] Redesign staff dashboard
- [ ] Redesign customer dashboard
- [ ] Analytics dashboard with meaningful metrics
- [ ] CMS management
- [ ] All dashboards scoped to business

---

## PHASE 5 — INTEGRATION

- [ ] Connect cinematic homepage to real business data
- [ ] Connect booking to real availability + payments
- [ ] Connect dashboards to real analytics
- [ ] Connect CMS to public business website
- [ ] Connect auth to all protected routes
- [ ] Connect notifications to background jobs
- [ ] End-to-end booking flow test
- [ ] End-to-end payment flow test

---

## PHASE 6 — POLISH

### 6.1 Responsive
- [ ] Desktop cinematic experience polished
- [ ] Tablet adaptation
- [ ] Mobile adaptation (simplified 3D, preserved storytelling)
- [ ] No horizontal overflow
- [ ] Readable typography at all sizes

### 6.2 Accessibility
- [ ] Semantic HTML throughout
- [ ] Keyboard navigation
- [ ] Focus states on all interactive elements
- [ ] Proper ARIA labels
- [ ] Color contrast verification
- [ ] `prefers-reduced-motion` support (simplified transitions)
- [ ] Screen reader testing

### 6.3 Performance
- [ ] Lazy load 3D assets
- [ ] Dynamic imports for heavy components
- [ ] Optimized images (next/image)
- [ ] Code splitting verification
- [ ] Core Web Vitals check
- [ ] Lighthouse audit

### 6.4 Error/Empty/Loading States
- [ ] Loading skeletons for dashboards
- [ ] Empty state designs
- [ ] Error boundaries
- [ ] Form validation UX
- [ ] Toast notifications

### 6.5 SEO
- [ ] Metadata for all pages
- [ ] Open Graph tags
- [ ] Structured data where appropriate
- [ ] Update robots.ts and sitemap.ts

### 6.6 Final Verification
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] All routes render correctly
- [ ] Database access works on Vercel
- [ ] Stripe integration verified
- [ ] Git checkpoint committed
- [ ] Vercel deployment verified

---

## GIT CHECKPOINT PLAN

| Checkpoint | Description |
|------------|-------------|
| `phase-1/foundation` | Design tokens + scroll architecture + nav |
| `phase-2/first-transition` | Page 01 + Page 02 + transition |
| `phase-3/cinematic-complete` | All 6 pages + all transitions |
| `phase-4/application` | Auth + multi-biz + booking + payments |
| `phase-5/integration` | Full stack connected |
| `phase-6/polish` | Responsive + a11y + performance |
| `v2.0` | Final release |
