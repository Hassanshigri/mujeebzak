# Wedding Invitation & RSVP — Mujeeb (Fiverr)

Next.js 14 (App Router) + Tailwind. Two shared group invite links (not
per-guest — the guest's name is never shown on screen), three-stage
experience (gate → invitation → celebrations + RSVP), English/Urdu toggle,
background music. Theme: deep wine/burgundy + antique gold.

## The two links

| Group | Events | Link |
|---|---|---|
| Nikkah & Valima only | Nikkah, Valima | `https://mujeebzak.vercel.app/?invite=9kx3fq7m` |
| All celebrations | all 6 | `https://mujeebzak.vercel.app/?invite=p6wz4h2j` |

The slugs are deliberately random/opaque — not "nikkah-guests" or
sequential — so one group can't guess or infer the other group's link.
`guest.name` still exists in `data/guests.json` and rides along on RSVP
submissions (so responses can be told apart on the sheet), but it's never
rendered on the page.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000/?invite=p6wz4h2j
```

A link with no `?invite=` slug (or an unknown one) shows an "invitation not
found" card — the invite is private by design.

## Where everything lives

| What | File |
|---|---|
| Names, parents, all 6 events, dates, venues, notes | `data/wedding.config.js` |
| Guest list + who is invited to which events | `data/guests.json` |
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
      data.submittedAt, data.slug, data.name, ev.name,
      ev.attending ? "Attending" : "Declined", ev.adults, data.message
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

## Changing a link's slug or scope

Edit the key or `events` array directly in `data/guests.json`. Keep new
slugs random/opaque (not a name or a sequential number) so the two group
links can't be guessed from one another.
