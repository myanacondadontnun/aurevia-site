// Shared Resend-backed lead email sender, used by /api/chat (the Claude
// agent's save_lead tool).

function escapeHtml(v) {
  return String(v).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

async function sendLeadEmail(lead, transcript) {
  const key = process.env.RESEND_API_KEY;
  // LEAD_EMAIL may be a single address or a comma-separated list
  const to = (process.env.LEAD_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return false;
  const from = process.env.RESEND_FROM || "Pixel & Code <onboarding@resend.dev>";

  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#888;text-transform:capitalize">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("");

  let transcriptHtml = "";
  if (Array.isArray(transcript) && transcript.length) {
    const lines = transcript
      .slice(-30)
      .map((m) => `<p style="margin:0 0 8px"><strong>${m.who === "user" ? "Visitor" : "Pixl"}:</strong> ${escapeHtml(m.text)}</p>`)
      .join("");
    transcriptHtml = `<h3 style="margin:24px 0 8px">Conversation so far</h3>${lines}`;
  }

  const html = `<div style="font-family:system-ui,sans-serif"><h2>New lead from the website chat</h2><table style="border-collapse:collapse">${rows}</table>${transcriptHtml}</div>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: "Bearer " + key },
    body: JSON.stringify({ from, to, subject: "New lead: " + (lead.name || "website chat"), html }),
  });
  return r.ok;
}

async function sendErrorAlert(reason, detail, sessionId) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return false;
  const from = process.env.RESEND_FROM || "Pixel & Code <onboarding@resend.dev>";

  const html = `<div style="font-family:system-ui,sans-serif">
    <h2>Chat agent error</h2>
    <p><strong>Reason:</strong> ${escapeHtml(reason)}</p>
    ${detail ? `<p><strong>Detail:</strong> ${escapeHtml(detail)}</p>` : ""}
    ${sessionId ? `<p><strong>Session:</strong> ${escapeHtml(sessionId)}</p>` : ""}
    <p style="color:#888;font-size:13px">Sent automatically from the website chat backend — the visitor was shown a generic "something went wrong" message.</p>
  </div>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: "Bearer " + key },
    body: JSON.stringify({ from, to, subject: "Chat error: " + reason, html }),
  });
  return r.ok;
}

module.exports = { sendLeadEmail, sendErrorAlert, escapeHtml };
