export const runtime = "nodejs";

/**
 * RSVP endpoint.
 * Set RSVP_WEBHOOK_URL in .env.local to the Google Apps Script Web App URL
 * once the client shares the Sheet. Until then responses are logged so the
 * form is fully testable end to end.
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  if (!payload?.slug || !Array.isArray(payload?.events)) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  const url = process.env.RSVP_WEBHOOK_URL;

  if (!url) {
    console.log("[RSVP — no webhook configured yet]", JSON.stringify(payload, null, 2));
    return Response.json({ ok: true, stored: "console" });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`sheet responded ${res.status}`);
    return Response.json({ ok: true, stored: "sheet" });
  } catch (err) {
    console.error("[RSVP webhook failed]", err);
    return Response.json({ ok: false, error: "webhook failed" }, { status: 502 });
  }
}
