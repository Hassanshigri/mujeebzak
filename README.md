# Wedding Invitation & RSVP — Mujeeb (Fiverr)

Next.js 14 (App Router) + Tailwind. One single shared link — guests type
their own name to unlock the invitation, and see only the celebrations
they're invited to. Five-stage experience (gate → transition → name gate →
invitation → celebrations + RSVP), English/Urdu toggle, background music.
Theme: deep wine/burgundy + antique gold.

## How guest access works now

There's no more `?invite=` link per guest/group. Everyone gets the same
link. After the gate, a "What's your name?" screen asks the guest to type
their name; it's matched case-insensitively (whitespace trimmed) against
`data/guests.json`. Whoever matches sees only the events listed for them —
2, 3, or all 6.

**This is currently a small hand-typed placeholder list (3 dummy names)
while waiting on the client's Google Sheet.** Once he sends it, swap
`data/guests.json` for real entries pulled from the sheet (see
`findGuestByName` in `data/guests.js` if the sheet needs a different
matching strategy, e.g. matching a household name instead of every
individual).

Current placeholder guests:

| Type "..." | Sees |
|---|---|
| Mujeeb | Nikkah, Valima |
| Ahmed Family | Mehndi, Nikkah, Valima |
| Anwar Dhanani | all 6 |

## Run

```bash
npm install
npm run dev
# open http://localhost:3000 — click through, then type "mujeeb" (or any
# name from data/guests.json) at the name screen
```

An unrecognized name shows an inline "we couldn't find that name" message
with a chance to retry — not a dead-end page, since it's very likely just a
typo.

## Where everything lives

| What | File |
|---|---|
| Names, parents, all 6 events, dates, venues, notes | `data/wedding.config.js` |
| Guest list + who is invited to which events (name-matched) | `data/guests.json` |
| Name-matching logic | `data/guests.js` |
| English / Urdu UI strings | `data/i18n.js` |
| RSVP submit handler | `app/api/rsvp/route.js` |
| Background track | `public/audio/theme.mp3` |

## Still TODO (waiting on client)

- [x] Bride & groom first names, monogram initials — **Urooj & Zameer**, monogram **UZ**
- [x] Both sets of parents' names — from the formal Nikah card:
      bride is daughter of Mr. & Mrs. Mohammed Mujeeb, groom is son of Mr. & Mrs. Ahmed Mohiuddin,
      blessing line is Alhaj Mohammad Yousuf / Late Syed Ahmed Ali
- [x] Time + venue + full address + map link for **Mehndi, Nikkah, Valima** — taken from the three
      printed invitation cards he sent
- [ ] Time + venue + full address for **Dua-e-Khair, Dolki, Mayoun** — no cards for these yet, only
      the dates from his original text message
- [x] RSVP deadline date — **November 16, 2026** (per the Mehndi card)
- [x] **Event/date pairing confirmed** by the printed cards:
      Dua-e-Khair Dec 5 · Dolki Dec 12 · Mayoun Dec 13 · Mehndi Dec 16 (Wed) · Nikkah Dec 18 (Fri) · Valima Dec 19 (Sat)
- [ ] Confirm exact Elite Banquet Hall street address — the card text was cramped ("11315 S Texas 6 h");
      entered as `11315 S Texas 6 Hwy, Sugar Land, TX 77498` (Hwy 6 runs through Sugar Land) — please double-check
- [ ] Google Sheet link → paste into `RSVP_WEBHOOK_URL` in `.env.local`
- [ ] Background mp3

## Wiring the Google Sheet (2 min, once he sends the link)

1. In the Sheet: **Extensions → Apps Script**, paste:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  data.events.forEach(ev => {
    sheet.appendRow([
      data.submittedAt, data.slug, data.name, data.phone, ev.name,
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

## Adding or editing guests

Add/edit an entry in `data/guests.json`:

```json
"jane-family": { "name": "Jane Family", "events": ["mehndi", "nikkah", "valima"] }
```

The object key is just an internal id (used for the RSVP local-storage key
and the sheet's `slug` column) — it's never shown to the guest or matched
against. Only `name` is matched against what they type.
