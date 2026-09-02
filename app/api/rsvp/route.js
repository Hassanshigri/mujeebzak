export const runtime = "nodejs";
// Google Apps Script web apps can be slow to "wake up" after sitting idle
// (occasionally 20-30s on the first hit) — give the platform enough room
// that we don't get killed mid-request before our own retry logic below
// even gets a chance to run.
export const maxDuration = 30;

/**
 * RSVP endpoint.
 * Set RSVP_WEBHOOK_URL in .env.local to the Google Apps Script Web App URL
 * once the client shares the Sheet. Until then responses are logged so the
 * form is fully testable end to end.
 */

// One attempt at forwarding to the sheet, aborted if it hangs too long.
async function postToSheet(url, payload, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`sheet responded ${res.status}`);
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  if (!payload?.name || !Array.isArray(payload?.events)) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  const url = process.env.RSVP_WEBHOOK_URL;

  if (!url) {
    console.log("[RSVP — no webhook configured yet]", JSON.stringify(payload, null, 2));
    return Response.json({ ok: true, stored: "console" });
  }

  // Apps Script cold-starts are usually only slow on the very first call —
  // a second attempt right after a failed/aborted one is almost always
  // fast, so retry once before telling the guest it failed.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await postToSheet(url, payload, 12000);
      return Response.json({ ok: true, stored: "sheet" });
    } catch (err) {
      console.error(`[RSVP webhook attempt ${attempt} failed]`, err);
    }
  }

  return Response.json({ ok: false, error: "webhook failed" }, { status: 502 });
}
