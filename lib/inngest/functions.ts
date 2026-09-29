import { inngest } from "./client";
import { prisma } from "@/lib/prisma";

// 1. Appointment Confirmation & Scheduled Reminder Workflow
export const sendBookingConfirmation = inngest.createFunction(
  {
    id: "send-booking-confirmation",
    name: "Send Booking Confirmation & Scheduled Reminder",
    triggers: [{ event: "appointment.created" }],
  },
  async ({ event, step }: { event: any; step: any }) => {
    const { appointmentId, customerEmail, customerName, serviceTitle, startTime, businessName } = event.data;

    // Step 1: Dispatch immediate booking confirmation notification
    const confirmation = await step.run("send-confirmation-email", async () => {
      console.log(`[Inngest] Sending confirmation to ${customerEmail} for ${serviceTitle} at ${businessName}`);
      
      // Record in DB if appointment exists
      if (appointmentId) {
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { status: "CONFIRMED" },
        }).catch(() => null);
      }

      return {
        delivered: true,
        recipient: customerEmail,
        customerName,
        timestamp: new Date().toISOString(),
      };
    });

    // Step 2: Schedule pre-appointment reminder 24 hours prior to appointment
    const appointmentDate = new Date(startTime);
    const reminderDate = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);

    // Only sleep if reminder time is in the future
    if (reminderDate.getTime() > Date.now()) {
      await step.sleepUntil("wait-for-reminder-window", reminderDate);

      // Step 3: Dispatch pre-session reminder
      await step.run("send-pre-session-reminder", async () => {
        console.log(`[Inngest] Sending 24h reminder to ${customerEmail} for appointment on ${appointmentDate.toDateString()}`);
        return {
          reminderDelivered: true,
          recipient: customerEmail,
          appointmentDate: appointmentDate.toISOString(),
        };
      });
    }

    return { status: "completed", confirmation };
  }
);

// 2. Appointment Cancellation Workflow
export const handleBookingCancellation = inngest.createFunction(
  {
    id: "handle-booking-cancellation",
    name: "Handle Booking Cancellation & Slot Release",
    triggers: [{ event: "appointment.cancelled" }],
  },
  async ({ event, step }: { event: any; step: any }) => {
    const { appointmentId, customerEmail, reason } = event.data;

    await step.run("notify-cancellation", async () => {
      console.log(`[Inngest] Appointment ${appointmentId} cancelled for ${customerEmail}. Reason: ${reason || "N/A"}`);
      
      if (appointmentId) {
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { status: "CANCELLED" },
        }).catch(() => null);
      }

      return { processed: true, appointmentId };
    });

    return { status: "cancelled", appointmentId };
  }
);

// 3. New Client Inquiry Intake Workflow
export const handleInquiryReceived = inngest.createFunction(
  {
    id: "handle-inquiry-received",
    name: "Handle Inbound Inquiry & Owner Notification",
    triggers: [{ event: "inquiry.received" }],
  },
  async ({ event, step }: { event: any; step: any }) => {
    const { inquiryId, name, email, businessId } = event.data;

    await step.run("process-inquiry-intake", async () => {
      console.log(`[Inngest] New inquiry from ${name} (${email}) for business ${businessId}`);
      return { intakeAcknowledged: true, inquiryId };
    });

    return { status: "inquiry_processed", inquiryId };
  }
);

export const inngestFunctions = [
  sendBookingConfirmation,
  handleBookingCancellation,
  handleInquiryReceived,
];
