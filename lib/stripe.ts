import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20.acacia" as any,
  typescript: true,
});

export const hasValidStripeKey = Boolean(
  process.env.STRIPE_SECRET_KEY &&
  !process.env.STRIPE_SECRET_KEY.includes("placeholder")
);
