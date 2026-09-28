import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In development or when webhook secret is pending, parse raw payload
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const paymentIntentId = paymentIntent.id;

        // Find payment associated with this intent ID or metadata
        const existingPayment = await prisma.payment.findFirst({
          where: { stripeIntentId: paymentIntentId },
          include: { appointment: true },
        });

        if (existingPayment) {
          await prisma.payment.update({
            where: { id: existingPayment.id },
            data: { status: "PAID" },
          });

          await prisma.appointment.update({
            where: { id: existingPayment.appointmentId },
            data: { status: "CONFIRMED" },
          });
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const paymentIntentId = paymentIntent.id;

        const existingPayment = await prisma.payment.findFirst({
          where: { stripeIntentId: paymentIntentId },
        });

        if (existingPayment) {
          await prisma.payment.update({
            where: { id: existingPayment.id },
            data: { status: "FAILED" },
          });
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;

        if (paymentIntentId) {
          const payment = await prisma.payment.findFirst({
            where: { stripeIntentId: paymentIntentId },
          });

          if (payment) {
            await prisma.payment.update({
              where: { id: payment.id },
              data: { status: "PAID" },
            });
            await prisma.appointment.update({
              where: { id: payment.appointmentId },
              data: { status: "CONFIRMED" },
            });
          }
        }
        break;
      }

      default:
        // Unhandled event types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
