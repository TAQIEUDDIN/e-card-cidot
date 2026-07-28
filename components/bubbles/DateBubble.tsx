"use client";

import { CalendarDays, CalendarPlus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildGoogleCalendarUrl, downloadICSFile } from "@/lib/calendar";

export default function DateBubble() {
  return (
    <div className="text-center">
      <p className="font-display text-xl text-ink">
        {siteConfig.eventDayDisplay}, {siteConfig.eventDateDisplay}
      </p>
      <p className="mt-1 font-body text-sm text-ink-light">
        {siteConfig.eventTimeDisplay}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-rose-100 px-4 py-3 text-left text-sm text-ink transition hover:bg-blush-50"
        >
          <span className="flex items-center gap-3">
            <CalendarDays size={18} className="text-rose-500" />
            Google Calendar
          </span>
          <span className="text-ink-light">›</span>
        </a>

        <button
          onClick={downloadICSFile}
          className="flex items-center justify-between rounded-2xl border border-rose-100 px-4 py-3 text-left text-sm text-ink transition hover:bg-blush-50"
        >
          <span className="flex items-center gap-3">
            <CalendarPlus size={18} className="text-gold" />
            Apple / Outlook Calendar
          </span>
          <span className="text-ink-light">›</span>
        </button>
      </div>
    </div>
  );
}
