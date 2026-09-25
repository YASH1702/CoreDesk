import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BusinessFlow database...");

  // Clean existing tables
  await prisma.review.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.staffService.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.staffLeave.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.business.deleteMany();

  // 1. Create Business
  const business = await prisma.business.create({
    data: {
      name: "Apex Enterprise Advisory & Solutions",
      slug: "apex-advisory",
      industry: "CONSULTING",
      description: "Premier enterprise strategy, digital transformation, and executive coaching.",
      email: "contact@apexadvisory.com",
      phone: "+1 (800) 555-0199",
      address: "100 Innovation Tower, Suite 4200, New York, NY 10001",
      currency: "USD",
      timezone: "America/New_York",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    },
  });

  // 2. Create Users
  const ownerUser = await prisma.user.create({
    data: {
      name: "Victoria Vance",
      email: "owner@businessflow.com",
      password: "password123",
      role: "BUSINESS_OWNER",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      phone: "+1 (555) 019-2831",
      businessId: business.id,
    },
  });

  const staffUser1 = await prisma.user.create({
    data: {
      name: "Dr. Marcus Chen",
      email: "marcus.chen@businessflow.com",
      password: "password123",
      role: "STAFF",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
      phone: "+1 (555) 014-9923",
      businessId: business.id,
    },
  });

  const staffUser2 = await prisma.user.create({
    data: {
      name: "Elena Rostova",
      email: "elena.rostova@businessflow.com",
      password: "password123",
      role: "STAFF",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      phone: "+1 (555) 018-4412",
      businessId: business.id,
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: "Alex Morgan",
      email: "alex.morgan@gmail.com",
      password: "password123",
      role: "CUSTOMER",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      phone: "+1 (555) 012-7788",
    },
  });

  // 3. Create Services
  const s1 = await prisma.service.create({
    data: {
      businessId: business.id,
      title: "Executive Strategy & Scale Audit",
      description: "In-depth evaluation of enterprise operations, unit economics, and digital architecture.",
      category: "Advisory",
      duration: 60,
      price: 350,
      bufferTime: 15,
      isFeatured: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
  });

  const s2 = await prisma.service.create({
    data: {
      businessId: business.id,
      title: "Cloud & AI Architecture Review",
      description: "Technical review of cloud scalability, LLM pipelines, security standards, and infrastructure costs.",
      category: "Engineering",
      duration: 90,
      price: 500,
      bufferTime: 30,
      isFeatured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    },
  });

  const s3 = await prisma.service.create({
    data: {
      businessId: business.id,
      title: "Quarterly Enterprise Roadmap",
      description: "Comprehensive 90-day growth framework with clear KPIs, resource allocations, and risk mitigations.",
      category: "Strategy",
      duration: 120,
      price: 750,
      bufferTime: 30,
      isFeatured: false,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    },
  });

  // 4. Create Staff Profiles & Availabilities
  const staff1 = await prisma.staff.create({
    data: {
      userId: staffUser1.id,
      businessId: business.id,
      title: "Senior Partner, Technology",
      bio: "15+ years scaling distributed systems and guiding Fortune 500 CTOs.",
      avatar: staffUser1.image,
    },
  });

  const staff2 = await prisma.staff.create({
    data: {
      userId: staffUser2.id,
      businessId: business.id,
      title: "Managing Director, Strategy",
      bio: "Ex-McKinsey principal specializing in venture growth and high-impact unit economics.",
      avatar: staffUser2.image,
    },
  });

  // Staff Service Assignments
  await prisma.staffService.createMany({
    data: [
      { staffId: staff1.id, serviceId: s1.id },
      { staffId: staff1.id, serviceId: s2.id },
      { staffId: staff2.id, serviceId: s1.id },
      { staffId: staff2.id, serviceId: s3.id },
    ],
  });

  // Availability (Monday - Friday 9 AM to 5 PM)
  for (const staffId of [staff1.id, staff2.id]) {
    for (let day = 1; day <= 5; day++) {
      await prisma.availability.create({
        data: {
          staffId,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          isWorking: true,
        },
      });
    }
  }

  // 5. Create Customer
  const customer = await prisma.customer.create({
    data: {
      businessId: business.id,
      name: customerUser.name || "Alex Morgan",
      email: customerUser.email,
      phone: customerUser.phone,
      notes: "VIP Client. Interested in Q3 AI transformation roadmap.",
    },
  });

  // 6. Create Appointments & Payments
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const endTime1 = new Date(tomorrow);
  endTime1.setHours(11, 0, 0, 0);

  const appt1 = await prisma.appointment.create({
    data: {
      businessId: business.id,
      serviceId: s1.id,
      staffId: staff1.id,
      userId: customerUser.id,
      customerId: customer.id,
      startTime: tomorrow,
      endTime: endTime1,
      status: "CONFIRMED",
      notes: "Discussion on scaling serverless microservices.",
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appt1.id,
      amount: 350,
      currency: "USD",
      status: "PAID",
      stripeIntentId: "pi_mock_3948291048",
      paymentMethod: "card_visa",
    },
  });

  await prisma.invoice.create({
    data: {
      appointmentId: appt1.id,
      userId: customerUser.id,
      invoiceNumber: "INV-2026-001",
      amount: 350,
      tax: 0,
      total: 350,
    },
  });

  // Past completed appointment
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 3);
  pastDate.setHours(14, 0, 0, 0);

  const pastEndTime = new Date(pastDate);
  pastEndTime.setHours(15, 30, 0, 0);

  const appt2 = await prisma.appointment.create({
    data: {
      businessId: business.id,
      serviceId: s2.id,
      staffId: staff2.id,
      userId: customerUser.id,
      customerId: customer.id,
      startTime: pastDate,
      endTime: pastEndTime,
      status: "COMPLETED",
      notes: "Cloud architecture overhaul roadmap completed.",
    },
  });

  await prisma.payment.create({
    data: {
      appointmentId: appt2.id,
      amount: 500,
      currency: "USD",
      status: "PAID",
      stripeIntentId: "pi_mock_8829104821",
      paymentMethod: "card_mastercard",
    },
  });

  await prisma.review.create({
    data: {
      appointmentId: appt2.id,
      userId: customerUser.id,
      rating: 5,
      comment: "Transformative insights! Elena pinpointed our infrastructure bottlenecks in 30 minutes.",
    },
  });

  // 7. Dynamic CMS Content, Testimonials, FAQ & Leads
  await prisma.settings.create({
    data: {
      businessId: business.id,
      heroTitle: "Precision Advisory for High-Growth Enterprises",
      heroSubtitle: "Book world-class strategic consultations, AI architecture reviews, and executive coaching in seconds.",
      seoTitle: "Apex Global Advisory — Enterprise Growth & Digital Transformation",
      seoDescription: "Book premier strategic consulting, tech audits, and executive advisory sessions.",
    },
  });

  await prisma.testimonial.createMany({
    data: [
      {
        businessId: business.id,
        name: "David Sterling",
        role: "Chief Executive Officer",
        company: "Vanguard Systems",
        content: "BusinessFlow streamlined our executive advisory bookings completely. Our clients love the glass interface!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      },
      {
        businessId: business.id,
        name: "Sophia Martinez",
        role: "Head of Operations",
        company: "Lumina Health",
        content: "The real-time availability sync and instant Stripe payments eliminated our administrative overhead by 90%.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      },
    ],
  });

  await prisma.fAQ.createMany({
    data: [
      {
        businessId: business.id,
        question: "How does appointment rescheduling work?",
        answer: "Clients receive a unique glass portal link via email allowing 1-click rescheduling up to 12 hours prior to the session.",
        order: 1,
      },
      {
        businessId: business.id,
        question: "Are payments handled securely?",
        answer: "Yes, all transactions are encrypted and processed through Stripe Checkout with zero card details stored on our servers.",
        order: 2,
      },
      {
        businessId: business.id,
        question: "Can I assign multiple staff members to specific services?",
        answer: "Absolutely. Our platform allows multi-staff service mapping with custom working hours and buffer times.",
        order: 3,
      },
    ],
  });

  await prisma.lead.createMany({
    data: [
      {
        businessId: business.id,
        name: "Jonathan Drake",
        email: "jdrake@enterprise.org",
        phone: "+1 (555) 998-1122",
        message: "Looking to deploy BusinessFlow across 4 regional advisory offices.",
        status: "NEW",
      },
    ],
  });

  console.log("✅ BusinessFlow Database Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
