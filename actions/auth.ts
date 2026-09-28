"use server";

import bcrypt from "bcryptjs";
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
    const cleanEmail = formData.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const hashedPassword = formData.password
      ? await bcrypt.hash(formData.password, 10)
      : await bcrypt.hash("password123", 10);

    let businessId: string | undefined = undefined;

    // If registering as Business Owner, create their business entity and membership
    if (formData.role === "BUSINESS_OWNER" && formData.businessName) {
      const slug = formData.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      const business = await prisma.business.create({
        data: {
          name: formData.businessName,
          slug,
          industry: formData.industry || "CONSULTING",
          email: cleanEmail,
        },
      });
      businessId = business.id;
    }

    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: cleanEmail,
        password: hashedPassword,
        role: formData.role || "CUSTOMER",
        businessId,
      },
    });

    // If a business was created, assign the user as an OWNER in BusinessMember
    if (businessId) {
      await prisma.businessMember.create({
        data: {
          userId: user.id,
          businessId,
          role: "OWNER",
        },
      });
    }

    return {
      success: true,
      user: { id: user.id, email: user.email, role: user.role, businessId },
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message || "Failed to create account." };
  }
}

export const registerUserAction = registerUser;
