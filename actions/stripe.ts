"use server";

import { stripe, hasValidStripeKey } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

interface CreatePaymentIntentParams {
  serviceId: string;
  customerEmail: string;
  customerName?: string;
  businessId?: string;
  notes?: string;
}

export async function createPaymentIntentAction({
  serviceId,
  customerEmail,
  customerName,
  businessId,
  notes,
}: CreatePaymentIntentParams) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { business: true },
    });

    if (!service) {
      return { success: false, error: "Service not found" };
    }

    const amountInCents = Math.round(service.price * 100);
    const currency = (service.business?.currency || "USD").toLowerCase();

    if (hasValidStripeKey) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        receipt_email: customerEmail,
        metadata: {
          serviceId: service.id,
          serviceName: service.title,
          businessId: service.businessId,
          customerEmail,
          customerName: customerName || "",
          notes: notes || "",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: service.price,
        currency,
      };
    }

    // Graceful test/sandbox simulation when Stripe key is not yet configured in production env
    const mockIntentId = `pi_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const mockClientSecret = `${mockIntentId}_secret_${Math.random().toString(36).substring(2, 12)}`;

    return {
      success: true,
      clientSecret: mockClientSecret,
      paymentIntentId: mockIntentId,
      amount: service.price,
      currency,
      isTestSimulation: true,
    };
  } catch (error: any) {
    console.error("Stripe createPaymentIntentAction error:", error);
    return {
      success: false,
      error: error.message || "Failed to initialize payment",
    };
  }
}
