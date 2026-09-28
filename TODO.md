# TODO.md — BusinessFlow Redesign Tracker

> Last Updated: 2026-09-28
> Status: **Phase 0 Complete → Phase 1 Ready**

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

## PHASE 1 — DESIGN + ARCHITECTURE FOUNDATION

### 1.1 New Dependencies
- [ ] Install GSAP + ScrollTrigger
- [ ] Install Three.js + React Three Fiber + @react-three/drei
- [ ] Install bcryptjs (password hashing)
- [ ] Install inngest (background jobs)
- [ ] Remove framer-motion (after migration)

### 1.2 Design Tokens
- [ ] Extend tailwind.config.ts with motion tokens
- [ ] Add animation duration tokens (fast/medium/slow/premium)
- [ ] Add easing curve tokens
- [ ] Add z-index scale for scene layering
- [ ] Add breakpoint-aware motion distances

### 1.3 Typography System
- [ ] Define headline scale (editorial large)
- [ ] Define body/metadata scale
- [ ] Define uppercase label styles
- [ ] Define monospace/system label styles

### 1.4 Scroll Architecture
- [ ] Create ScrollController component (GSAP ScrollTrigger)
- [ ] Create SceneContainer component (full-viewport scenes)
- [ ] Create SceneTransition component (composition transforms)
- [ ] Define scroll-to-animation mapping for 6 scenes
- [ ] Implement reverse scroll support
- [ ] Implement scrub/progress synchronization

### 1.5 Navigation
- [ ] Create new persistent minimal Navbar
- [ ] Implement category progress indicator (01-06)
- [ ] Active category updates on scroll
- [ ] Subtle progress bar
- [ ] Mobile navigation adaptation

### 1.6 Scene Background System
- [ ] Create SceneBackground component
- [ ] Define 6 distinct background environments
- [ ] Implement background transition (slide/mask/parallax)

### 1.7 Component Architecture
- [ ] Create Experience (root cinematic container)
- [ ] Create PageScene (reusable scene wrapper)
- [ ] Create SceneTypography (animated headline/body)
- [ ] Create ProductPanel (animated UI mockup container)

---

## PHASE 2 — CINEMATIC EXPERIENCE PROTOTYPE

### 2.1 Page 01 — THE BUSINESS
- [ ] Business environment composition
- [ ] "YOUR BUSINESS, BEAUTIFULLY CONNECTED." headline
- [ ] Service cards / booking CTA
- [ ] Warm architectural background
- [ ] Entry animation (elements from left/right)

### 2.2 Page 02 — CUSTOMER EXPERIENCE
- [ ] "BOOKING SHOULDN'T FEEL LIKE WORK." headline
- [ ] Booking flow visualization (service → date → staff → time → confirm)
- [ ] Calendar/time slot UI mockup
- [ ] Customer-oriented background
- [ ] Entry animation from Page 01 transition

### 2.3 Page 01 → 02 Transition
- [ ] Page 01 elements exit (horizontal movement)
- [ ] Background transforms
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
