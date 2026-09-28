"use server";

import { prisma } from "@/lib/prisma";

export async function getServicesCatalog(businessIdentifier?: string) {
  try {
    const business = businessIdentifier
      ? await prisma.business.findFirst({
          where: { OR: [{ id: businessIdentifier }, { slug: businessIdentifier }] },
        })
      : await prisma.business.findFirst();

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
