"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

    return {
      success: true,
      stats: {
        totalRevenue,
        totalAppointments,
        confirmedAppointments,
        totalCustomers,
        recentAppointments,
        topServices,
        businessName: business.name,
        businessSlug: business.slug,
      },
    };
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
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
