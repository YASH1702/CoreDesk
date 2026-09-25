export function generateICSFile(params: {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CoreDesk//Booking Platform//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@coredesk.app`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(params.startTime)}`,
    `DTEND:${formatDate(params.endTime)}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description}`,
    `LOCATION:${params.location || "Online Session / Corporate Office"}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

export function downloadICSFile(paramsOrFilename: any, content?: string) {
  let finalFilename = "appointment-invite.ics";
  let finalContent = "";

  if (typeof paramsOrFilename === "object") {
    finalFilename = paramsOrFilename.filename || "appointment-invite.ics";
    finalContent = generateICSFile(paramsOrFilename);
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
}
