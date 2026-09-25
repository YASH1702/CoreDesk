"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBookingInitialData() {
  try {
    const business = await prisma.business.findFirst({
      include: {
        services: { where: { isActive: true } },
        staff: {
          where: { isActive: true },
          include: {
            user: true,
            services: true,
          },
        },
      },
    });

    return { success: true, business };
  } catch (error: any) {
    console.error("Booking Data Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getServicesAction() {
  try {
    const business = await prisma.business.findFirst();
    if (!business) return { success: false, services: [] };

    const services = await prisma.service.findMany({
      where: { businessId: business.id, isActive: true },
    });

    return { success: true, services };
  } catch (error: any) {
    return { success: false, services: [] };
  }
}

export async function getStaffAction() {
  try {
    const business = await prisma.business.findFirst();
    if (!business) return { success: false, staff: [] };

    const staff = await prisma.staff.findMany({
      where: { businessId: business.id, isActive: true },
      include: { user: true },
    });

    return { success: true, staff };
  } catch (error: any) {
    return { success: false, staff: [] };
  }
}

export async function fetchAvailableTimeSlots(staffId: string, dateStr: string, duration?: number) {
  try {
    const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];
    return { success: true, availableSlots: slots };
  } catch (error: any) {
    return { success: false, availableSlots: [] };
  }
}

export async function createBookingAction(data: {
  serviceId: string;
  staffId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  userId?: string;
}) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) return { success: false, error: "Service not found." };

    let customer = await prisma.customer.findFirst({
      where: {
        businessId: service.businessId,
        email: data.customerEmail,
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          businessId: service.businessId,
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
          notes: data.notes,
        },
      });
    }

    let staffId = data.staffId;
    if (!staffId || staffId === "ANY") {
      const staffMember = await prisma.staff.findFirst({
        where: { businessId: service.businessId, isActive: true },
      });
      if (staffMember) staffId = staffMember.id;
    }

    const startTime = new Date(`${data.date}T${data.timeSlot.includes("PM") ? "14:00:00" : "09:00:00"}`);
    const endTime = new Date(startTime.getTime() + service.duration * 60 * 1000);

    const appointment = await prisma.appointment.create({
      data: {
        businessId: service.businessId,
        serviceId: service.id,
        staffId,
        customerId: customer.id,
        userId: data.userId || null,
        startTime,
        endTime,
        status: "CONFIRMED",
        notes: data.notes,
      },
    });

    await prisma.payment.create({
      data: {
        appointmentId: appointment.id,
        amount: service.price,
        currency: "USD",
        status: "PAID",
        paymentMethod: "card_stripe",
        stripeIntentId: "pi_stripe_mock_" + Math.random().toString(36).substring(7),
      },
    });

    const invNumber = "INV-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    await prisma.invoice.create({
      data: {
        appointmentId: appointment.id,
        userId: data.userId || null,
        invoiceNumber: invNumber,
        amount: service.price,
        tax: 0,
        total: service.price,
      },
    });

    revalidatePath("/dashboard/admin/appointments");
    revalidatePath("/dashboard/customer");

    return { success: true, appointmentId: appointment.id };
  } catch (error: any) {
    console.error("Create Booking Error:", error);
    return { success: false, error: error.message || "Failed to create booking." };
  }
}

export async function rescheduleBooking(appointmentId: string, newDateStr: string, newTimeStr: string) {
  try {
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { service: true },
    });

    if (!appt) return { success: false, error: "Appointment not found." };

    const startTime = new Date(`${newDateStr}T${newTimeStr}:00`);
    const endTime = new Date(startTime.getTime() + appt.service.duration * 60 * 1000);

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        startTime,
        endTime,
        status: "CONFIRMED",
      },
    });

    revalidatePath("/dashboard/admin/appointments");
    revalidatePath("/dashboard/customer");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function cancelBooking(data: { appointmentId: string; reason?: string }) {
  try {
    await prisma.appointment.update({
      where: { id: data.appointmentId },
      data: { status: "CANCELLED" },
    });

    revalidatePath("/dashboard/admin/appointments");
    revalidatePath("/dashboard/customer");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
