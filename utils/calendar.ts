export interface CalendarEventParams {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  organizerName?: string;
  organizerEmail?: string;
}

/**
 * Format a Date to iCalendar UTC format (e.g., 20261015T103000Z)
 */
function formatToUTCString(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
}

/**
 * Generates an RFC 5545 compliant .ics calendar event string
 */
export function generateICSFile(params: CalendarEventParams): string {
  const dtStart = formatToUTCString(params.startTime);
  const dtEnd = formatToUTCString(params.endTime);
  const dtStamp = formatToUTCString(new Date());
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@coredesk.app`;

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CoreDesk//Executive Business OS//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${params.title.replace(/\n/g, " ")}`,
    `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${(params.location || "Online Executive Video Consultation").replace(/\n/g, " ")}`,
    "STATUS:CONFIRMED",
    // 15-minute popup notification alarm
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Upcoming Session with CoreDesk",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return icsLines.join("\r\n");
}

/**
 * Initiates direct browser file download for .ics format
 */
export function downloadICSFile(paramsOrFilename: any, content?: string) {
  if (typeof window === "undefined") return;

  let finalFilename = "appointment-invite.ics";
  let finalContent = "";

  if (typeof paramsOrFilename === "object") {
    finalFilename = paramsOrFilename.filename || "appointment-invite.ics";
    finalContent = generateICSFile({
      title: paramsOrFilename.title,
      description: paramsOrFilename.description,
      location: paramsOrFilename.location,
      startTime: paramsOrFilename.startTime instanceof Date ? paramsOrFilename.startTime : new Date(paramsOrFilename.startTime),
      endTime: paramsOrFilename.endTime instanceof Date ? paramsOrFilename.endTime : new Date(paramsOrFilename.endTime),
    });
  } else {
    finalFilename = paramsOrFilename;
    finalContent = content || "";
  }

  const blob = new Blob([finalContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", finalFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Generates direct one-click Add to Google Calendar web URL
 */
export function getGoogleCalendarUrl(params: CalendarEventParams): string {
  const dtStart = formatToUTCString(params.startTime);
  const dtEnd = formatToUTCString(params.endTime);

  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    dates: `${dtStart}/${dtEnd}`,
    details: params.description,
    location: params.location || "Online Executive Video Consultation",
  });

  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

/**
 * Generates direct one-click Add to Outlook.com Calendar web URL
 */
export function getOutlookWebUrl(params: CalendarEventParams): string {
  const query = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: params.title,
    startdt: params.startTime.toISOString(),
    enddt: params.endTime.toISOString(),
    body: params.description,
    location: params.location || "Online Executive Video Consultation",
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${query.toString()}`;
}

/**
 * Generates direct one-click Add to Microsoft 365 / Office 365 Calendar URL
 */
export function getOffice365Url(params: CalendarEventParams): string {
  const query = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: params.title,
    startdt: params.startTime.toISOString(),
    enddt: params.endTime.toISOString(),
    body: params.description,
    location: params.location || "Online Executive Video Consultation",
  });

  return `https://outlook.office.com/calendar/0/deeplink/compose?${query.toString()}`;
}

/**
 * Generates direct one-click Add to Yahoo Calendar URL
 */
export function getYahooCalendarUrl(params: CalendarEventParams): string {
  const dtStart = formatToUTCString(params.startTime);
  const dtEnd = formatToUTCString(params.endTime);

  const query = new URLSearchParams({
    v: "60",
    title: params.title,
    st: dtStart,
    et: dtEnd,
    desc: params.description,
    in_loc: params.location || "Online Executive Video Consultation",
  });

  return `https://calendar.yahoo.com/?${query.toString()}`;
}
