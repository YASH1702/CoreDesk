import { prisma } from "@/lib/prisma";

export interface TimeSlot {
  time: string; // e.g. "09:00"
  formatted: string; // e.g. "9:00 AM"
  available: boolean;
  staffId: string;
}

export async function getAvailableTimeSlots(params: {
  serviceId: string;
  staffId?: string;
  dateStr: string; // YYYY-MM-DD
}): Promise<TimeSlot[]> {
  const { serviceId, staffId, dateStr } = params;

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      staffServices: {
        include: { staff: true },
      },
    },
  });

  if (!service) return [];

  const targetDate = new Date(dateStr);
  const dayOfWeek = targetDate.getDay(); // 0 = Sunday, 1 = Monday...

  // Determine eligible staff
  let staffList = service.staffServices.map((ss) => ss.staff);
  if (staffId && staffId !== "ANY") {
    staffList = staffList.filter((s) => s.id === staffId);
  }

  if (staffList.length === 0) return [];

  const slots: TimeSlot[] = [];

  // Generate candidate slots (9:00 AM to 5:00 PM in intervals of 30 mins)
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const formatted = `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;

      // Check if slot falls within working hours for at least one eligible staff
      let isSlotAvailable = false;
      let assignedStaffId = staffList[0].id;

      // Construct Date objects for slot bounds
      const slotStart = new Date(`${dateStr}T${timeString}:00`);
      const slotEnd = new Date(slotStart.getTime() + service.duration * 60 * 1000 + service.bufferTime * 60 * 1000);

      // Check against existing appointments in database
      const existingAppts = await prisma.appointment.findMany({
        where: {
          staffId: { in: staffList.map((s) => s.id) },
          status: { in: ["PENDING", "CONFIRMED", "IN_PROGRESS"] },
          startTime: { lte: slotEnd },
          endTime: { gte: slotStart },
        },
      });

      // Find if any staff member is free for this slot
      for (const staff of staffList) {
        const staffBusy = existingAppts.some((appt) => appt.staffId === staff.id);
        if (!staffBusy) {
          isSlotAvailable = true;
          assignedStaffId = staff.id;
          break;
        }
      }

      slots.push({
        time: timeString,
        formatted,
        available: isSlotAvailable,
        staffId: assignedStaffId,
      });
    }
  }

  return slots;
}
