import { siteConfig } from "@/config/site";

function getStartEnd() {
  const start = new Date(siteConfig.eventDate);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  return { start, end };
}

const toUTCStamp = (d: Date) =>
  d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export function buildGoogleCalendarUrl() {
  const { start, end } = getStartEnd();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Majlis Pertunangan ${siteConfig.brideName} & ${siteConfig.groomName}`,
    dates: `${toUTCStamp(start)}/${toUTCStamp(end)}`,
    location: siteConfig.venueAddress,
    details: siteConfig.thankYouLine,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Works for Apple Calendar, Outlook, and most other calendar apps.
export function downloadICSFile() {
  const { start, end } = getStartEnd();
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Engagement E-Card//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@ecard`,
    `DTSTAMP:${toUTCStamp(new Date())}`,
    `DTSTART:${toUTCStamp(start)}`,
    `DTEND:${toUTCStamp(end)}`,
    `SUMMARY:Majlis Pertunangan ${siteConfig.brideName} & ${siteConfig.groomName}`,
    `LOCATION:${siteConfig.venueAddress}`,
    `DESCRIPTION:${siteConfig.thankYouLine}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "engagement-day.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
