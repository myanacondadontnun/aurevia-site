// Pixel & Code — chat agent (Netlify Function, dependency-free)
// Runs a Claude agent with a save_lead tool; emails captured leads via Resend.
// Required env vars: ANTHROPIC_API_KEY, LEAD_EMAIL, RESEND_API_KEY
// Optional: RESEND_FROM (verified sender), CHAT_MODEL
//
// Ported from the standalone Pixel & Code Vercel app (api/chat.js) when that
// site merged into aurevia-site at /pixel-and-code. This file is deliberately
// its own Netlify Function, not a Next.js route handler — aurevia-site builds
// as a static export (next.config.js: output: 'export') with no API routes,
// and isolating this chat backend here means it can't affect that build.

const { sendLeadEmail, sendErrorAlert } = require("./_lib/email");

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.CHAT_MODEL || "claude-haiku-4-5";
const CALENDLY = process.env.CALENDLY_URL || "https://calendly.com/km-kkishal/30min";

const SYSTEM = `You are the assistant for Pixel & Code, a product studio that designs and builds AI apps, job boards & marketplaces, and custom web & mobile applications.

Voice: warm, sharp, and concise — a helpful pre-sales assistant, not a generic chatbot.

Facts you may use:
- Services: AI Applications (assistants, RAG, agents on the latest Claude models); Job Boards & Marketplaces (search, matching, applications, payments); Web Applications; Mobile Apps (cross-platform iOS & Android).
- Process: Discover -> Design -> Build -> Launch & Scale. Around 6 weeks to a first launch, on average.
- Selected work: Aurevia (AI sales agent for Shopify), an AI CPQ Agent, JCR Pharma (life-sciences recruitment platform), Masters in Minds (consulting website).
- Contact: sales@aurevia.io.

Goals, in order:
1) Understand what the visitor wants to build and genuinely help them — ask a question or two (or use ask_options) before moving to contact details, so you actually have a project to summarize.
2) Naturally qualify and capture the lead. Once you have a decent sense of their project, show the lead form to grab their name + email — the form does NOT ask for a project description, so gather that through conversation first, not from the form. Once you have name + email (from the form or from chat) and your own understanding of their project, call save_lead using your own summary of what they want as the "project" field. Ask for budget and timeline when the conversation allows, but name + email + your own project summary is enough to save.

Interactive tools (prefer these over plain questions when they fit):
- ask_options: pose a question with 2-5 tappable choices — use to guide the conversation (what they want to build, budget range, etc.). Keep the same question in your message text too.
- show_lead_form: render an inline name + email form (nothing else). Only use this once you already understand their project from the conversation — never show it as your first response.
- offer_meeting: show a "Book a 30-min call" button. Use whenever the visitor wants to book, schedule, or talk to a human.
- save_lead: email the team. Call it once you have name + email (from chat or the form) and can summarize their project yourself from the conversation so far.

Rules:
- Keep replies short (1-3 sentences) and ask one thing at a time.
- Never invent specific prices; projects are scoped per engagement.
- Only say the team will follow up after you have actually called save_lead in this turn or a previous one — never promise a follow-up you haven't captured contact details for.
- If asked something off-topic, gently steer back to how Pixel & Code can help.
- Light markdown is supported and rendered (bold, short bullet lists, links) — use it sparingly to stay scannable, not as a wall of formatting.
- CRITICAL: every single response must include a short message in your own words — even when you're also calling a tool. Never call ask_options, show_lead_form, or offer_meeting without writing the accompanying question or context as plain text in the same turn. A tool call alone, with no text, is a broken reply the visitor can't understand.`;

const TOOLS = [
  {
    name: "save_lead",
    description: "Save a qualified lead and notify the Pixel & Code team by email. Call this once you have the visitor's name and email, and can summarize what they want to build yourself from the conversation.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's name" },
        email: { type: "string", description: "Visitor's email address" },
        project: { type: "string", description: "Your own summary of what they want to build, based on the conversation — not something the visitor typed into a form" },
        budget: { type: "string", description: "Budget, if mentioned" },
        timeline: { type: "string", description: "Timeline, if mentioned" },
        company: { type: "string", description: "Company, if mentioned" },
      },
      required: ["name", "email", "project"],
    },
  },
  {
    name: "ask_options",
    description: "Ask the visitor a question and present 2-5 tappable options to guide the conversation.",
    input_schema: {
      type: "object",
      properties: {
        question: { type: "string", description: "The question to ask" },
        options: { type: "array", items: { type: "string" }, description: "2-5 short choices" },
      },
      required: ["question", "options"],
    },
  },
  {
    name: "show_lead_form",
    description: "Render an inline name + email form (no project field). Only use once you already understand their project from the conversation — this just captures contact details.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "offer_meeting",
    description: "Show a button that lets the visitor book a 30-minute call. Use when they want to book, schedule, or talk to a human.",
    input_schema: { type: "object", properties: {} },
  },
];

async function callClaude(apiKey, messages) {
  const r = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, system: SYSTEM, tools: TOOLS, messages }),
  });
  if (!r.ok) throw new Error("anthropic " + r.status + ": " + (await r.text()));
  return r.json();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "method_not_allowed" }) };
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    await sendErrorAlert("ANTHROPIC_API_KEY not configured", null, null);
    return { statusCode: 500, body: JSON.stringify({ error: "not_configured" }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { body = {}; }
  const sessionId = String(body.sessionId || "").slice(0, 64);

  try {
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    const messages = incoming
      .slice(-20)
      .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 4000) }))
      .filter((m) => m.content);
    if (!messages.length) {
      return { statusCode: 400, body: JSON.stringify({ error: "no_messages" }) };
    }

    let leadSaved = false;
    let final = "";
    const actions = [];
    for (let i = 0; i < 4; i++) {
      const resp = await callClaude(apiKey, messages);
      // Keep the last non-empty text — a later tool-only turn (no accompanying
      // text) must not wipe out a good reply from an earlier turn in this loop.
      const textPart = (resp.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (textPart) final = textPart;
      if (resp.stop_reason === "tool_use") {
        messages.push({ role: "assistant", content: resp.content });
        const results = [];
        for (const block of resp.content) {
          if (block.type !== "tool_use") continue;
          const input = block.input || {};
          let note = "Done.";
          if (block.name === "save_lead") {
            const lead = Object.assign({}, input);
            if (sessionId) lead.session = sessionId;
            const transcript = messages
              .filter((m) => typeof m.content === "string")
              .map((m) => ({ who: m.role === "user" ? "user" : "bot", text: m.content }));
            const ok = await sendLeadEmail(lead, transcript);
            leadSaved = leadSaved || ok;
            note = ok ? "Lead saved and the team was notified." : "Lead recorded.";
          } else if (block.name === "ask_options") {
            actions.push({ type: "options", question: input.question || "", options: (input.options || []).slice(0, 5) });
            note = "Options shown to the visitor; awaiting their choice.";
          } else if (block.name === "show_lead_form") {
            actions.push({ type: "lead_form" });
            note = "Lead form shown to the visitor; awaiting submission.";
          } else if (block.name === "offer_meeting") {
            actions.push({ type: "meeting", url: CALENDLY });
            note = "Booking button shown to the visitor.";
          }
          results.push({ type: "tool_result", tool_use_id: block.id, content: note });
        }
        messages.push({ role: "user", content: results });
        continue;
      }
      break;
    }

    // No fabricated text, ever: if the model never produced a real reply after
    // 4 tool-use turns, that's a genuine failure, not something to paper over.
    if (!final) {
      await sendErrorAlert("Claude produced no reply text", "Loop exhausted after tool-use turns with no accompanying text.", sessionId);
      return { statusCode: 502, body: JSON.stringify({ error: "empty_reply" }) };
    }
    return { statusCode: 200, body: JSON.stringify({ reply: final, leadSaved, actions }) };
  } catch (e) {
    await sendErrorAlert("Chat request failed", String((e && e.message) || e), sessionId);
    return { statusCode: 500, body: JSON.stringify({ error: "chat_failed" }) };
  }
};
