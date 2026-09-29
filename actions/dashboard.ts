"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { inngest } from "@/lib/inngest/client";

export async function getAdminDashboardStats(businessId?: string) {
  try {
    const business = businessId
      ? await prisma.business.findUnique({ where: { id: businessId } })
      : await prisma.business.findFirst();

    if (!business) return { success: false, error: "No business found." };

    const totalAppointments = await prisma.appointment.count({
      where: { businessId: business.id },
    });

    const confirmedAppointments = await prisma.appointment.count({
      where: { businessId: business.id, status: "CONFIRMED" },
    });

    const payments = await prisma.payment.findMany({
      where: { appointment: { businessId: business.id }, status: "PAID" },
    });

    const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

    const totalCustomers = await prisma.customer.count({
      where: { businessId: business.id },
    });

    const recentAppointments = await prisma.appointment.findMany({
      where: { businessId: business.id },
      take: 6,
      orderBy: { startTime: "desc" },
      include: {
        service: true,
        staff: { include: { user: true } },
        customer: true,
        payment: true,
      },
    });

    const topServices = await prisma.service.findMany({
      where: { businessId: business.id },
      include: {
        _count: { select: { appointments: true } },
      },
      take: 4,
    });

    const pendingInquiries = await prisma.inquiry.count({
      where: { businessId: business.id, status: "UNREAD" },
    });

    return {
      success: true,
      stats: {
        totalRevenue,
        totalAppointments,
        confirmedAppointments,
        totalCustomers,
        pendingInquiries,
        recentAppointments,
        topServices,
        businessId: business.id,
        businessName: business.name,
        businessSlug: business.slug,
      },
    };
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserBusinesses(userId?: string) {
  try {
    if (userId) {
      const memberships = await prisma.businessMember.findMany({
        where: { userId },
        include: { business: true },
      });
      if (memberships.length > 0) {
        return { success: true, businesses: memberships.map((m) => m.business) };
      }
    }
    // Fallback: return all businesses
    const all = await prisma.business.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, businesses: all };
  } catch (error: any) {
    return { success: false, businesses: [] };
  }
}

export async function createNewBusiness(data: {
  userId: string;
  name: string;
  industry?: string;
  email?: string;
}) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(1000 + Math.random() * 9000);
    const business = await prisma.business.create({
      data: {
        name: data.name,
        slug,
        industry: data.industry || "CONSULTING",
        email: data.email || null,
      },
    });

    // Create BusinessMember record for user as OWNER
    await prisma.businessMember.create({
      data: {
        userId: data.userId,
        businessId: business.id,
        role: "OWNER",
      },
    });

    revalidatePath("/dashboard/admin");
    return { success: true, business };
  } catch (error: any) {
    console.error("Create Business Error:", error);
    return { success: false, error: error.message || "Failed to create business entity." };
  }
}

export async function getInquiriesAction(businessId?: string) {
  try {
    const business = businessId
      ? await prisma.business.findUnique({ where: { id: businessId } })
      : await prisma.business.findFirst();

    if (!business) return { success: false, inquiries: [] };

    const inquiries = await prisma.inquiry.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, inquiries };
  } catch (error: any) {
    return { success: false, inquiries: [] };
  }
}

export async function submitInquiryAction(data: {
  businessSlugOrId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const business = await prisma.business.findFirst({
      where: { OR: [{ id: data.businessSlugOrId }, { slug: data.businessSlugOrId }] },
    });

    if (!business) return { success: false, error: "Business destination not found." };

    const inquiry = await prisma.inquiry.create({
      data: {
        businessId: business.id,
        name: data.name,
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        message: data.message,
        status: "UNREAD",
      },
    });

    try {
      await inngest.send({
        name: "inquiry.received",
        data: {
          inquiryId: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          businessId: business.id,
        },
      });
    } catch (inngestErr) {
      console.warn("Inngest inquiry dispatch warning:", inngestErr);
    }

    revalidatePath(`/business/${business.slug}`);
    revalidatePath("/dashboard/admin");

    return { success: true, inquiryId: inquiry.id };
  } catch (error: any) {
    console.error("Inquiry Error:", error);
    return { success: false, error: error.message || "Failed to submit inquiry." };
  }
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  try {
    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status },
    });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: string) {
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/admin/appointments");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createOrUpdateService(data: {
  id?: string;
  businessId?: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  bufferTime?: number;
}) {
  try {
    const business = data.businessId
      ? await prisma.business.findUnique({ where: { id: data.businessId } })
      : await prisma.business.findFirst();

    if (!business) return { success: false, error: "Business not found." };

    if (data.id) {
      await prisma.service.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          duration: data.duration,
          price: data.price,
          bufferTime: data.bufferTime || 0,
        },
      });
    } else {
      await prisma.service.create({
        data: {
          businessId: business.id,
          title: data.title,
          description: data.description,
          category: data.category,
          duration: data.duration,
          price: data.price,
          bufferTime: data.bufferTime || 0,
        },
      });
    }

    revalidatePath("/dashboard/admin/services");
    revalidatePath("/book");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(serviceId: string) {
  try {
    await prisma.service.delete({
      where: { id: serviceId },
    });
    revalidatePath("/dashboard/admin/services");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
