# AI_CONTEXT.md — CoreDesk Architecture & Design System

> **Brand**: CoreDesk — Premium Executive Business Operating System
> **Branch**: `main`
> **Database**: PostgreSQL on Supabase (`db.zzdimmuqsvduxdhbwpou.supabase.co`)

---

## 1. EXISTING ARCHITECTURE AUDIT

### 1.1 Technology Stack (Current)

| Layer         | Technology                     | Status  |
|---------------|--------------------------------|---------|
| Framework     | Next.js 15.0.1 (App Router)   | KEEP    |
| Language      | TypeScript 5.6                 | KEEP    |
| Styling       | Tailwind CSS 3.4               | REFACTOR |
| Animation     | Framer Motion 11.x             | REPLACE (→ GSAP) |
| Database      | PostgreSQL (Supabase)          | KEEP    |
| ORM           | Prisma 5.22                    | REFACTOR |
| Auth          | NextAuth 4.24 (JWT + Credentials) | REFACTOR |
| Payments      | Stripe 17.x (mock only)       | REFACTOR |
| Charts        | Recharts 2.x                  | KEEP/REFACTOR |
| Font          | Plus Jakarta Sans              | KEEP    |
| Deployment    | Vercel                         | KEEP    |

### 1.2 Project Structure (Current)

```
D:\CoreDesk/
├── actions/              # Server actions (6 files)
│   ├── appointments.ts   # getAppointmentsQueue
│   ├── auth.ts           # registerUser
│   ├── booking.ts        # CRUD booking, reschedule, cancel
│   ├── cms.ts            # getCMSData, updateCMSSettings
│   ├── dashboard.ts      # getAdminDashboardStats, CRUD services
│   └── services.ts       # getServicesCatalog
├── app/
│   ├── (auth)/           # Auth pages (login, signup, forgot-password)
│   ├── api/auth/         # NextAuth route handler
│   ├── book/             # Booking wizard + confirmation + reschedule
│   ├── dashboard/        # Admin (7 pages), Staff (1), Customer (1)
│   ├── globals.css       # Warm Sand design system CSS
│   ├── layout.tsx        # Root layout with Providers
│   ├── page.tsx          # Landing page (server component)
│   ├── robots.ts         # SEO
│   └── sitemap.ts        # SEO
├── components/
│   ├── booking/          # 6 step components (wizard flow)
│   ├── dashboard/        # DashboardLayoutWrapper (sidebar/nav)
│   ├── landing/          # 8 sections (Hero, Industry, Workflow, etc.)
│   └── shared/           # Navbar, Footer, Providers, ThemeProvider
├── constants/            # business-types.ts (5 industry archetypes)
├── lib/                  # auth.ts, prisma.ts, utils.ts
├── prisma/               # schema.prisma, seed.ts/js, dev.db
├── services/             # availability.ts (slot calculation)
├── utils/                # calendar.ts
└── [config files]        # package.json, tailwind, tsconfig, etc.
```

### 1.3 Database Schema (18 Models)

| Model         | Fields | Relations | Multi-Business | Notes |
|---------------|--------|-----------|----------------|-------|
| User          | 10     | 7 relations | Partial (single businessId) | No multi-business membership |
| Business      | 12     | 11 relations | ✅ Model exists | Good foundation |
| Service       | 12     | 3 relations | ✅ scoped to business | Good |
| Staff         | 9      | 5 relations | ✅ scoped to business | Good |
| StaffService  | 2      | composite PK | ✅ | Good |
| Availability  | 5      | 1 relation  | Via staff→business | Good |
| StaffLeave    | 5      | 1 relation  | Via staff→business | Good |
| Customer      | 5      | 2 relations | ✅ scoped to business | Good |
| Appointment   | 10     | 6 relations | ✅ scoped to business | Good |
| Payment       | 7      | 1 relation  | Via appointment | Good |
| Invoice       | 8      | 2 relations | Via appointment | Good |
| Notification  | 6      | 1 relation  | ⚠️ No business scope | Needs fix |
| Review        | 5      | 2 relations | Via appointment | Good |
| Blog          | 10     | 2 relations | ✅ scoped to business | Good |
| Lead          | 7      | 1 relation  | ✅ scoped to business | Good |
| Settings      | 7      | 1 relation  | ✅ per business | Good |
| Gallery       | 5      | 1 relation  | ✅ scoped to business | Good |
| Testimonial   | 8      | 1 relation  | ✅ scoped to business | Good |
| FAQ           | 5      | 1 relation  | ✅ scoped to business | Good |

### 1.4 Routes (Current)

| Route | Type | Purpose |
|-------|------|---------|
| `/` | SSR | Landing page (7 sections) |
| `/login` | Static | Auth login |
| `/signup` | Static | Auth signup |
| `/forgot-password` | Static | Password reset |
| `/book` | Static | 5-step booking wizard |
| `/book/confirmation/[id]` | Dynamic | Booking confirmation |
| `/book/reschedule/[id]` | Dynamic | Reschedule booking |
| `/dashboard/admin` | Dynamic | Admin overview |
| `/dashboard/admin/appointments` | Dynamic | Appointments management |
| `/dashboard/admin/services` | Dynamic | Services CRUD |
| `/dashboard/admin/customers` | Dynamic | Customer list |
| `/dashboard/admin/invoices` | Dynamic | Invoice list |
| `/dashboard/admin/team` | Dynamic | Staff management |
| `/dashboard/admin/cms` | Dynamic | CMS settings |
| `/dashboard/customer` | Dynamic | Customer dashboard |
| `/dashboard/staff` | Dynamic | Staff dashboard |
| `/api/auth/[...nextauth]` | API | NextAuth handler |

### 1.5 Critical Issues in Current Codebase

1. **Single-business assumption**: All server actions use `prisma.business.findFirst()` — hardcoded to first business
2. **No password hashing**: Auth stores/compares plain text passwords
3. **Fake time slots**: `fetchAvailableTimeSlots()` returns hardcoded strings, not real availability
4. **Mock Stripe**: Payment creates fake `stripeIntentId` with random strings
5. **No BusinessMember model**: User has single `businessId`, can't belong to multiple businesses
6. **No BusinessHours model**: Availability is per-staff only, no business-level hours
7. **No Holiday model**: No business-level holiday/closure support
8. **No Inquiry model**: Leads exist but no structured inquiry flow
9. **Missing Notification business scope**: Notifications not scoped to business
10. **No background jobs**: No Inngest or similar for async workflows

---

## 2. CLASSIFICATION

### KEEP (Reuse directly)
- PostgreSQL + Prisma architecture
- Supabase connection
- NextAuth JWT strategy + Credentials provider
- `lib/prisma.ts` singleton pattern
- Core Prisma models: Business, Service, Staff, StaffService, Availability, StaffLeave, Customer, Appointment, Payment, Invoice, Notification, Review, Blog, Lead, Settings, Gallery, Testimonial, FAQ
- Tailwind CSS framework (config will be extended)
- Plus Jakarta Sans font
- `postcss.config.js`, `tsconfig.json`
- Vercel deployment pipeline
- `.gitignore`
- `robots.ts`, `sitemap.ts`

### REFACTOR (Evolve)
- `tailwind.config.ts` → extend with new design tokens, motion tokens
- `globals.css` → keep Warm Sand utilities, add scene/composition styles
- `lib/auth.ts` → add password hashing (bcrypt), proper error handling
- `middleware.ts` → extend for multi-business route protection
- `prisma/schema.prisma` → add BusinessMember, BusinessHours, Holiday, Inquiry models; fix User for multi-business
- `actions/booking.ts` → use real availability engine, proper Stripe
- `actions/dashboard.ts` → scope to specific business, not findFirst()
- `actions/cms.ts` → scope to specific business
- `services/availability.ts` → integrate business hours, holidays, leaves
- `components/dashboard/DashboardLayoutWrapper.tsx` → redesign for new visual language
- `components/shared/Providers.tsx` → keep SessionProvider + ThemeProvider
- `components/shared/ThemeProvider.tsx` → keep
- `constants/business-types.ts` → good concept, keep and extend

### REPLACE (New implementations)
- `app/page.tsx` → cinematic 6-page scroll experience (GSAP ScrollTrigger)
- `components/landing/*` → all 8 sections replaced by 6 cinematic scenes
- `components/shared/Navbar.tsx` → new minimal persistent navigation
- `components/shared/Footer.tsx` → new minimal footer
- `components/booking/*` → redesigned booking flow UI
- Auth pages → redesigned login/signup/forgot-password
- Dashboard pages → redesigned with new visual language

### REMOVE (Obsolete after redesign)
- `components/landing/AuroraBackground.tsx` → replaced by scene backgrounds
- `components/landing/PricingSection.tsx` → not in new spec
- `prisma/dev.db` → SQLite artifact from before Supabase migration
- `prisma/seed.js` → duplicate of seed.ts

### NEW (Does not currently exist)
- **GSAP + ScrollTrigger** animation system
- **Three.js / React Three Fiber** for selective 3D
- **6 cinematic page scenes** with scroll-driven composition transforms
- **Scene transition architecture** (ScrollController, SceneTransition)
- **BusinessMember model** (multi-business membership)
- **BusinessHours model** (business-level operating hours)
- **Holiday model** (business closures)
- **Inquiry model** (structured contact/inquiry flow)
- **Real Stripe payment flow** (PaymentIntent, webhooks)
- **Inngest background jobs** (confirmations, reminders)
- **Analytics events/data layer**
- **Public business website** route (`/business/[slug]`)
- **Multi-business dashboard** route
- **Category progress indicator** (01-06 side nav)
- **Reduced-motion support**
- **Password hashing** (bcrypt)

---

## 3. NEW ROUTE STRUCTURE

| Route | Purpose |
|-------|---------|
| `/` | Cinematic 6-page scroll experience |
| `/business/[slug]` | Public business website |
| `/book/[businessSlug]` | Booking engine for specific business |
| `/book/[businessSlug]/confirmation/[id]` | Booking confirmation |
| `/login` | Auth login (redesigned) |
| `/signup` | Auth signup (redesigned) |
| `/forgot-password` | Password reset (redesigned) |
| `/dashboard` | Dashboard home (role-based redirect) |
| `/dashboard/business` | Business management |
| `/dashboard/services` | Services CRUD |
| `/dashboard/staff` | Staff management |
| `/dashboard/bookings` | Bookings management |
| `/dashboard/customers` | Customer CRM |
| `/dashboard/payments` | Payment management |
| `/dashboard/analytics` | Analytics dashboard |
| `/dashboard/settings` | Business settings |
| `/staff` | Staff dashboard |
| `/customer` | Customer dashboard |
| `/api/auth/[...nextauth]` | NextAuth handler |
| `/api/webhooks/stripe` | Stripe webhook handler |
| `/api/inngest` | Inngest webhook handler |

---

## 4. NEW DESIGN LANGUAGE

### Previous (CoreDesk)
- Conventional SaaS landing page (Hero → Features → Pricing → Testimonials → CTA)
- Framer Motion fade/slide animations
- Standard section-based scrolling
- Dark mode toggle

### New (CoreDesk)
- **Cinematic scroll experience**: 6 distinct visual compositions
- **GSAP ScrollTrigger**: Deterministic scroll-driven animation
- **Horizontal transition language**: Elements enter/exit left/right
- **Composition transformation**: Each scroll reveals a new visual world
- **Selective 3D**: Three.js for spatial depth where it improves storytelling
- **Editorial typography**: Large headlines, uppercase labels, staggered motion
- **Warm Sand palette**: Same colors, dramatically different application
- **No simple fades**: Transform, translate, scale, perspective, masking
- **Reduced-motion mode**: Simplified transitions for `prefers-reduced-motion`

### Warm Sand Palette (Preserved)
- Primary BG: `#F8F7F3`
- Gold: `#C69A4B`
- Bronze: `#B7863D`
- Dark Bronze: `#8F6B2F`
- Heading: `#2A2927`
- Body: `#5D5A56`
- All existing design tokens remain valid

---

## 5. MIGRATION STRATEGY

### Phase 0: Audit ✅ (This document)
### Phase 1: Foundation (design tokens, scroll architecture, navigation)
### Phase 2: First transition prototype (Page 01 → Page 02)
### Phase 3: Complete cinematic experience (Pages 03-06)
### Phase 4: Application (auth, multi-business, booking, payments, dashboards)
### Phase 5: Integration (connect frontend ↔ backend ↔ database)
### Phase 6: Polish (responsive, a11y, performance, visual QA)

---

## 6. DEPLOYMENT CONSIDERATIONS

- **Vercel**: Already configured, `postinstall: prisma generate` in package.json
- **Supabase**: PostgreSQL connection established and working
- **Environment Variables**: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Stripe keys
- **Git**: `main` branch, repository `YASH1702/CoreDesk`
- **Build**: Production build passes cleanly (18 routes, all verified)
- **Critical**: Do NOT run destructive migrations against production Supabase DB
