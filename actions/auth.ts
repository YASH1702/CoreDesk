"use server";

import { prisma } from "@/lib/prisma";

export async function registerUser(formData: {
  name: string;
  email: string;
  password?: string;
  role?: string;
  businessName?: string;
  industry?: string;
}) {
  try {
    const existing = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    let businessId: string | undefined = undefined;

    // If registering as Business Owner, create their business instance
    if (formData.role === "BUSINESS_OWNER" && formData.businessName) {
      const slug = formData.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      const business = await prisma.business.create({
        data: {
          name: formData.businessName,
          slug,
          industry: formData.industry || "CONSULTING",
          email: formData.email,
        },
      });
      businessId = business.id;
    }

    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password || "password123",
        role: formData.role || "CUSTOMER",
        businessId,
      },
    });

    return { success: true, user: { id: user.id, email: user.email, role: user.role } };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message || "Failed to create account." };
  }
}

export const registerUserAction = registerUser;
