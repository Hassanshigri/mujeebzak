# Wedding Invitation & RSVP — Mujeeb (Fiverr)

Next.js 14 (App Router) + Tailwind. One single link, same for every guest.
Two stages: envelope-opening video (tap to play, butterflies flutter while
it plays) → one continuous page with the invitation, a live countdown, the
two celebrations in a calendar-card layout, RSVP, and the footer. English/
Urdu toggle, background music. Theme: mehroon (maroon) + beige, solid
cardstock-style surfaces (no glass/blur).

## How it works

Everyone gets the same link. Tap the envelope → the opening video plays
(~4.2s, with a handful of butterflies fluttering across the screen) →
straight into the invitation. No name gate, no per-guest links.

Scrolling down from the invitation, on the same page: a live countdown to
the Nikkah, then both celebrations (Nikkah + Valima) as calendar-style
cards, then the RSVP form, then the footer. Guests identify themselves only
when they RSVP — the form asks for their name and phone number directly
(`components/RsvpForm.jsx`), which is what shows up in the Google Sheet.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000 — tap the envelope, wait ~4.2s, scroll down
```

## Where everything lives

| What | File |
|---|---|
| Names, parents, the 2 events (Nikkah + Valima), dates, venues, notes | `data/wedding.config.js` |
| English / Urdu UI strings | `data/i18n.js` |
| Envelope-opening video | `public/videos/envelope-open.mp4` |
| Butterfly animation (gate screen) | `components/Butterflies.jsx` |
| Live countdown | `components/Countdown.jsx` |
| Calendar-style event card | `components/CalendarEventCard.jsx` |
| RSVP submit handler | `app/api/rsvp/route.js` |
| Background track | `public/audio/theme.mp3` |

Each event needs both a display `date`/`time` (what's printed on the card)
and an `isoDate` (drives the countdown + the calendar card's day/month —
always formatted in the venue's own timezone, America/Chicago, so every
guest sees the same date regardless of their own device's timezone).

## Still TODO (waiting on client)

- [x] Bride & groom first names, monogram — **Urooj & Zameer** (displayed as "Zameer & Urooj"), monogram is the client's Z&U gold crest
- [x] Both sets of parents' names — from the formal Nikah card:
      bride is daughter of Mr. & Mrs. Mohammed Mujeeb, groom is son of Mr. & Mrs. Ahmed Mohiuddin,
      blessing line is Alhaj Mohammad Yousuf / Late Syed Ahmed Ali / Late Ghulam Dastagir
- [x] Time + venue + full address + map link for **Nikkah, Valima** — taken from the printed invitation cards
- [x] Event/date pairing confirmed: **Nikkah Dec 18 (Fri) · Valima Dec 19 (Sat), 2026**
- [ ] Google Sheet link → paste into `RSVP_WEBHOOK_URL` in `.env.local`
- [ ] Envelope video currently has a visible "Pika" watermark (free-tier AI export) — swap for the clean/paid version before launch

## Wiring the Google Sheet (2 min, once he sends the link)

1. In the Sheet: **Extensions → Apps Script**, paste:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  data.events.forEach(ev => {
    sheet.appendRow([
      data.submittedAt, data.name, data.phone, ev.name,
      ev.attending ? "Attending" : "Declined", data.message
    ]);
  });
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

2. **Deploy → New deployment → Web app**, Execute as *Me*, Access *Anyone*.
3. Copy the `/exec` URL into `.env.local`:

```
RSVP_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
```

Until that's set, submissions return success and print to the server console —
so the form is testable now.

## Deploy

Push to GitHub → import on Vercel → add `RSVP_WEBHOOK_URL` as an env var. Done.
