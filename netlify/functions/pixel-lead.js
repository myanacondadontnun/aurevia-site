// Pixel & Code — homepage lead form (Netlify Function, dependency-free)
// POST /pixel-and-code/api/lead  ->  emails the lead via Resend, same pipeline as pixel-chat.
// Required env vars: LEAD_EMAIL, RESEND_API_KEY. Optional: RESEND_FROM.
const { sendLeadEmail, sendErrorAlert } = require("./_lib/email");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({ ok: false }) };
  let b = {};
  try { b = JSON.parse(event.body || "{}"); } catch { return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Bad request." }) }; }
  if (b.company_url) return { statusCode: 200, body: JSON.stringify({ ok: true }) }; // honeypot
  const name = String(b.name || "").trim().slice(0, 120);
  const email = String(b.email || "").trim().slice(0, 200);
  const store = String(b.store || "").trim().slice(0, 300);
  // The founders-section call form sends a store URL instead of a brief; a
  // project line is synthesised so the email still reads as a lead.
  const project = String(b.project || "").trim().slice(0, 4000) || (store ? `Booked a call. Store: ${store}` : "");
  const source = b.source === "founders call" ? "founders call" : "homepage form";
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !project) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Name, a valid email and a short project description are required." }) };
  }
  try {
    const ok = await sendLeadEmail({ name, email, store, project, source, page: String(b.page || "").slice(0, 200) });
    if (!ok) await sendErrorAlert("lead form: email not sent (missing RESEND_API_KEY / LEAD_EMAIL?)", JSON.stringify({ name, email }), "form");
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    try { await sendErrorAlert("lead form failed", String((e && e.message) || e), "form"); } catch {}
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: "We couldn't send that. Email sales@aurevia.io instead." }) };
  }
};
