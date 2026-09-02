/**
 * RSVP → Google Sheet webhook.
 *
 * What this does: every time a guest submits the RSVP form on the site,
 * Next.js POSTs the response as JSON to whatever URL you set as
 * RSVP_WEBHOOK_URL. This script turns a Google Sheet into that URL —
 * it appends one row per submission.
 *
 * SETUP
 * 1. Open (or create) the Google Sheet you want responses in.
 * 2. Extensions → Apps Script.
 * 3. Delete anything in Code.gs and paste this whole file in.
 * 4. Save (the disk icon), name the project something like "RSVP Webhook".
 * 5. Deploy → New deployment → gear icon → "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted (it's your own script, on your
 *    own sheet — the scary-looking warning is normal, click Advanced →
 *    Go to [project name] → Allow).
 * 6. Copy the "Web app URL" it gives you (ends in /exec).
 * 7. Set that URL as RSVP_WEBHOOK_URL in the site's environment:
 *      - Locally: add RSVP_WEBHOOK_URL=<url> to .env.local
 *      - On Vercel: Project → Settings → Environment Variables → add
 *        RSVP_WEBHOOK_URL, then redeploy.
 * 8. Submit a test RSVP on the site and confirm a row appears.
 *
 * If you ever change the form's fields, update HEADERS and the
 * `values` array below to match — they must stay the same length/order.
 */

const HEADERS = [
  "Timestamp",
  "Name",
  "Phone",
  "Nikkah",
  "Valima",
  "Duas & Wishes",
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  const payload = JSON.parse(e.postData.contents);

  const attendingFor = (id) => {
    const found = (payload.events || []).find((ev) => ev.id === id);
    if (!found) return "";
    return found.attending ? "Yes" : "No";
  };

  const submittedAt = payload.submittedAt
    ? new Date(payload.submittedAt)
    : new Date();

  sheet.appendRow([
    submittedAt,
    payload.name || "",
    payload.phone || "",
    attendingFor("nikkah"),
    attendingFor("valima"),
    payload.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const isEmpty = firstRow.every((cell) => cell === "" || cell === null);
  if (isEmpty) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

/** Optional: run this once manually (Run ▶ in the Apps Script editor) to
 * sanity-check the sheet + headers without needing a real form submission. */
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test Guest",
        phone: "555-0100",
        submittedAt: new Date().toISOString(),
        message: "So happy for you both!",
        events: [
          { id: "nikkah", name: "Nikkah", attending: true },
          { id: "valima", name: "Valima", attending: false },
        ],
      }),
    },
  };
  doPost(fakeEvent);
}
