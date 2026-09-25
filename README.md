# BusinessFlow — Enterprise Website & Appointment Booking SaaS Engine

BusinessFlow is a production-ready, enterprise-grade business website builder and appointment scheduling platform designed with an **Aurora Glassmorphism** design aesthetic.

---

## 🌟 Key Product Features

- **Configurable Industry Archetypes**: Adaptable branding and terminology for Gyms, Luxury Salons, Medical Practices, Agencies, Consultants, and Executive Coaches.
- **Smart Real-Time Availability Engine**: Zero-conflict time slot calculator taking into account staff working hours, scheduled breaks, approved leaves, and buffer times.
- **5-Step Customer Booking Portal**: Seamless service selection, specialist choice, date/time slot picker, customer contact details, and Stripe Checkout simulation.
- **Role-Based Workspaces (RBAC)**:
  - **Business Owner / Admin**: Operations overview dashboard, revenue analytics, appointment queue, service package CRUD, CRM client database, and No-Code CMS.
  - **Specialist / Staff**: Daily agenda timeline, client notes, and assigned appointments schedule.
  - **Customer Portal**: Booking management, invoice history, and 1-click rescheduling.
- **No-Code CMS System**: Modify public copy, hero headlines, brand positioning, and SEO search metadata without code changes.

---

## 🏗️ Technical Architecture Diagram

```
+-----------------------------------------------------------------------+
|                           CLIENT LAYER                                |
|   Next.js 15 App Router | React 18 | TypeScript | Tailwind CSS v4 | Framer Motion  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                           SERVER LAYER                                |
|    NextAuth.js JWT Guards | Server Actions | Next.js API Handlers      |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                          DATABASE LAYER                               |
|        Prisma ORM 5.22 | PostgreSQL / SQLite Database Engine          |
+-----------------------------------------------------------------------+
```

---

## 🛠️ Quick Start & Installation

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Setup Database & Seed Initial Data
```bash
# Push schema to database engine
node node_modules/prisma/build/index.js db push

# Seed rich initial business dataset
node prisma/seed.js
```

### 3. Run Development Server
```bash
npm run dev
```

Access the platform at `http://localhost:3000`.

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Business Owner** | `owner@businessflow.com` | `password123` | `/dashboard/admin` |
| **Staff Specialist** | `marcus.chen@businessflow.com` | `password123` | `/dashboard/staff` |
| **Customer** | `alex.morgan@gmail.com` | `password123` | `/dashboard/customer` |

---

## 🚀 Deployment to Vercel & Supabase

1. Push repository to GitHub.
2. Connect project to **Vercel**.
3. Configure Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
4. Execute `npx prisma db push` during build command.
