"use server";

import { prisma } from "@/lib/prisma";

export async function getAppointmentsQueue(businessId?: string) {
  try {
    const business = businessId
      ? await prisma.business.findUnique({ where: { id: businessId } })
      : await prisma.business.findFirst();

    if (!business) return { success: false, appointments: [] };

    const appointments = await prisma.appointment.findMany({
      where: { businessId: business.id },
      orderBy: { startTime: "desc" },
      include: {
        service: true,
        staff: { include: { user: true } },
        customer: true,
        payment: true,
      },
    });

    return { success: true, appointments };
  } catch (error: any) {
    return { success: false, appointments: [] };
  }
}
