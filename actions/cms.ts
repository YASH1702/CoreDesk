"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCMSData() {
  try {
    const business = await prisma.business.findFirst({
      include: {
        services: { where: { isActive: true } },
        testimonials: true,
        faqs: { orderBy: { order: "asc" } },
        cmsSettings: true,
      },
    });

    return { success: true, data: business };
  } catch (error: any) {
    console.error("CMS Fetch Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCMSSettings(formData: {
  businessId: string;
  heroTitle?: string;
  heroSubtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  primaryColor?: string;
}) {
  try {
    await prisma.settings.upsert({
      where: { businessId: formData.businessId },
      update: {
        heroTitle: formData.heroTitle,
        heroSubtitle: formData.heroSubtitle,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        primaryColor: formData.primaryColor,
      },
      create: {
        businessId: formData.businessId,
        heroTitle: formData.heroTitle,
        heroSubtitle: formData.heroSubtitle,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        primaryColor: formData.primaryColor || "#3B82F6",
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/admin/cms");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
