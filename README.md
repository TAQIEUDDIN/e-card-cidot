# Blush Engagement E-Card

A floral digital invitation with a tap-to-open cover, a live countdown, and a
floating bottom nav (location / wish / date) that pops open a centered
"bubble" for each — no separate pages, no login required for guests, wishes
save straight to Supabase.

The bottom nav uses a scroll-shrink effect: it starts as a soft translucent
bar and settles into a smaller floating pill once you scroll past the hero —
identical behavior on mobile and desktop, no separate dropdown menu.

## 1. Edit your content

Open `config/site.ts`. That's the only file you need to touch for names,
date, venue, and wording — everything else pulls from it automatically.

## 2. Set up Supabase

1. Open your Supabase project → **SQL Editor** → New query.
2. Paste the contents of `supabase/schema.sql` and run it.
   This creates a `wishes` table and locks it so guests can only *submit*
   a wish — they can never read, edit, or delete anyone's wish (including
   their own). You'll read the wishes yourself later from **Table Editor**.
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Paste in your Project URL and anon key from step 2.

## 4. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — tap the cover to open the card and test the
wish form. Check Supabase Table Editor → `wishes` to confirm it saved.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project** → import the repo.
3. Under **Environment Variables**, add the same two variables from your
   `.env.local`.
4. Deploy. You'll get a `your-project.vercel.app` link — share that with
   your guests (or add a custom domain in Vercel's project settings).

## Reading the wishes later

Go to your Supabase project → **Table Editor** → `wishes` table. You'll see
every guest's name, message, and timestamp. As the project owner you bypass
the row-level security that blocks everyone else — that's what keeps
guests from seeing each other's messages.

## Customizing further

- **Colors**: `tailwind.config.ts` → the `rose` / `blush` / `gold` scales.
- **Fonts**: `app/layout.tsx` — currently Cormorant Garamond (display),
  Jost (body), Alex Brush (script accent), all free on Google Fonts.
- **Floral artwork**: `components/FloralSprig.tsx` is hand-drawn SVG that
  draws itself in on load — tweak the path data or colors directly, no
  external image assets needed.
- **Bubbles**: each nav item's popup content lives in `components/bubbles/`
  (`LocationBubble.tsx`, `DateBubble.tsx`, `WishBubble.tsx`). The Waze/Google
  Maps and Google/Apple Calendar links are built from `config/site.ts`
  automatically via `lib/calendar.ts` — nothing to hardcode.
- **A UI library**: you mentioned React Bits — it's a great fit if you
  want to swap in more animated text/reveal effects later (it's
  copy-paste components, not an npm install, so grab pieces from
  reactbits.dev and drop them into `components/`). This project already
  covers the core reveal/countdown/form interactions natively with
  Framer Motion, so you don't strictly need it, but it's a good place to
  pull extra flourishes from if you want more.
