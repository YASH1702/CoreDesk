import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { inngestFunctions } from "@/lib/inngest/functions";

// Inngest endpoint handler for Next.js App Router
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: inngestFunctions,
});
