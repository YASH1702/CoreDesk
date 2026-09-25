"use server";

import { prisma } from "@/lib/prisma";

export async function getServicesCatalog() {
  try {
    const business = await prisma.business.findFirst();
    if (!business) return { success: false, services: [] };

    const services = await prisma.service.findMany({
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, services };
  } catch (error: any) {
    return { success: false, services: [] };
  }
}
