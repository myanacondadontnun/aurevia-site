"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Bot, Globe, UserCheck } from "lucide-react";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ChannelIcons";
import s from "./inbox.module.css";

/**
 * "Your team stays in control": the merchant side of the story. A faithful replica of the Live tab in the
 * Aurevia dashboard (same tabs, channel tags, state lines, take-over and hand-back controls and bubble colours
 * as app-frontend's LiveActivityTab), playing one take-over on a loop: a shopper asks for a human, Maya takes
 * over, answers, and hands the chat back to the AI. A phone-sized copy shows the same chat on the go.
 */

type Channel = "website" | "whatsapp" | "instagram";
type State = "waiting" | "ai" | "human" | "ended";

const CHANNEL: Record<Channel, { label: string; color: string; Glyph: ComponentType<{ className?: string }> }> = {
  website: { label: "Website", color: "#009973", Glyph: ({ className }) => <Globe className={className} strokeWidth={2} /> },
  whatsapp: { label: "WhatsApp", color: "#25d366", Glyph: WhatsAppGlyph },
  instagram: { label: "Instagram", color: "#d6249f", Glyph: InstagramGlyph },
};

const GRADIENTS = [
  ["#00cc99", "#009973"],
  ["#8b5cf6", "#6d28d9"],
  ["#f59e0b", "#ea580c"],
  ["#38bdf8", "#2563eb"],
  ["#f472b6", "#db2777"],
];

type Msg = { from: "shopper" | "ai" | "human" | "note"; text: string };

/* The conversation, step by step. `at` is when it appears (ms into the loop); `phase` is the chat's state
   from then on. */
const SCRIPT: { at: number; msg?: Msg; phase?: "waiting" | "pressTake" | "human" | "pressBack" | "ai" }[] = [
  { at: 0, msg: { from: "shopper", text: "Hi! I bought the Linen Midi Dress last week. Can I swap it for a size up?" } },
  { at: 0, msg: { from: "ai", text: "Of course. Exchanges are free within 30 days. Would you like the M instead of the S?" } },
  { at: 0, msg: { from: "shopper", text: "Yes, but I need it by Saturday. Can someone check?" } },
  { at: 0, msg: { from: "note", text: "Olivia asked for a human" }, phase: "waiting" },
  { at: 2600, phase: "pressTake" },
  { at: 3000, msg: { from: "note", text: "Maya took over" }, phase: "human" },
  { at: 4400, msg: { from: "human", text: "Hi Olivia, Maya here. I've reserved an M and upgraded it to express, so it arrives Friday." } },
  { at: 6400, msg: { from: "shopper", text: "Amazing, thank you!" } },
  { at: 8400, phase: "pressBack" },
  { at: 8800, msg: { from: "note", text: "Handed back to Aurevia" }, phase: "ai" },
];
const LOOP_MS = 13500;

function useScript() {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(7000);
      return;
    }
    const timers: number[] = [];
    const run = () => {
      setT(0);
      for (const step of SCRIPT) if (step.at > 0) timers.push(window.setTimeout(() => setT(step.at), step.at));
      timers.push(window.setTimeout(run, LOOP_MS));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);
  const shown = SCRIPT.filter((step) => step.at <= t);
  const phase = shown.reduce<string>((p, step) => step.phase ?? p, "waiting");
  const messages = shown.flatMap((step) => (step.msg ? [step.msg] : []));
  return { phase, messages };
}

function Avatar({ name, index, size }: { name: string; index: number; size: number }) {
  const [from, to] = GRADIENTS[index % GRADIENTS.length];
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  return (
    <span className={s.avatar} style={{ width: size, height: size, fontSize: size * 0.34, backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }} aria-hidden="true">
      {initials}
    </span>
  );
}

function ChannelTag({ channel }: { channel: Channel }) {
  const { label, color, Glyph } = CHANNEL[channel];
  return (
    <span className={s.tag}>
      <span style={{ color }}><Glyph className={s.tagGlyph} /></span>
      {label}
    </span>
  );
}

function Bubble({ m }: { m: Msg }) {
  if (m.from === "note") return <div className={`${s.noteRow} ${s.enter}`}><span className={s.note}>{m.text}</span></div>;
  const cls = m.from === "shopper" ? s.shopper : m.from === "human" ? s.human : s.ai;
  return (
    <div className={`${s.msgRow} ${m.from === "shopper" ? s.left : s.right} ${s.enter}`}>
      <div className={`${s.bubble} ${cls}`}>{m.text}</div>
      {m.from !== "shopper" && <span className={s.by}>{m.from === "human" ? "Maya" : "AI"}</span>}
    </div>
  );
}

export default function InboxShowcase() {
  const { phase, messages } = useScript();
  const oliviaState: State = phase === "human" || phase === "pressBack" ? "human" : phase === "ai" ? "ai" : "waiting";

  const sessions: { name: string; channel: Channel; state: State; line: string; when: string }[] = [
    {
      name: "Olivia Martin",
      channel: "website",
      state: oliviaState,
      line: `${oliviaState === "waiting" ? "Asked for a human" : oliviaState === "human" ? "Maya is handling" : "Aurevia is replying"} · $168.00 in cart`,
      when: "2m",
    },
    { name: "Camille Roy", channel: "whatsapp", state: "ai", line: "Aurevia is replying", when: "4m" },
    { name: "Jade Wilson", channel: "instagram", state: "ai", line: "Aurevia is replying", when: "6m" },
    { name: "Noah Patel", channel: "website", state: "human", line: "Sara is handling · $189.00 in cart", when: "9m" },
    { name: "Emma Lewis", channel: "whatsapp", state: "ended", line: "Ended · 4m 12s", when: "18m" },
  ];

  const takeButton = (
    <span className={`${s.take} ${phase === "pressTake" ? s.pressed : ""}`}>
      <UserCheck strokeWidth={2} />
      Take over
    </span>
  );
  const backButton = (
    <span className={`${s.back} ${phase === "pressBack" ? s.pressed : ""}`}>
      <Bot />
      Hand back to AI
    </span>
  );
  const controls = oliviaState === "human" ? backButton : takeButton;
  const lastFew = messages.slice(-4);

  return (
    <section className={s.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.head}>
          <h2 className={s.title}>Your team stays in control</h2>
          <p className={s.lede}>
            Conversations from your store, WhatsApp and Instagram land in one live inbox. Step in with one tap, then hand
            it back to the AI.
          </p>
        </div>

        <div className={s.stage}>
          <div className={s.topRow}>
            <span className={s.tabs} aria-hidden="true">
              {["Live", "Email", "Comments", "Tickets", "History"].map((t) => (
                <span key={t} className={t === "Live" ? s.tabOn : s.tab}>{t}</span>
              ))}
            </span>
            <span className={s.liveLine}><i className={s.liveDot} />5 sessions · live</span>
          </div>

          <div className={s.app} aria-label="The Live tab of the Aurevia dashboard" role="img">
            <div className={s.list}>
              <div className={s.filters} aria-hidden="true">
                {["All", "Mine", "AI", "Human", "Ended"].map((f) => (
                  <span key={f} className={f === "All" ? s.filterOn : s.filter}>{f}</span>
                ))}
              </div>
              {sessions.map((x, i) => (
                <div key={x.name} className={`${s.row} ${i === 0 ? s.rowOn : ""} ${x.state === "ended" ? s.rowEnded : ""}`}>
                  {i === 0 && <span className={s.rowBar} />}
                  <span className={`${s.ring} ${s[`ring_${x.state}`]}`}>
                    <Avatar name={x.name} index={i} size={36} />
                  </span>
                  <span className={s.rowText}>
                    <span className={s.rowTop}>
                      <span className={s.rowName}>{x.name}</span>
                      <ChannelTag channel={x.channel} />
                    </span>
                    <span className={`${s.rowLine} ${x.state === "waiting" ? s.amber : ""}`}>{x.line}</span>
                  </span>
                  <span className={`${s.rowWhen} ${x.state === "waiting" ? s.amber : ""}`}>{x.when}</span>
                </div>
              ))}
            </div>

            <div className={s.thread}>
              <div className={s.threadHead}>
                <span className={`${s.ring} ${s[`ring_${oliviaState}`]}`}>
                  <Avatar name="Olivia Martin" index={0} size={36} />
                </span>
                <span className={s.threadWho}>
                  <span className={s.rowTop}>
                    <span className={s.threadName}>Olivia Martin</span>
                    <ChannelTag channel="website" />
                  </span>
                  <span className={`${s.state} ${s[`state_${oliviaState}`]}`}>
                    {oliviaState === "waiting" ? "Waiting for a human" : oliviaState === "human" ? "Maya is handling" : "Aurevia is replying"}
                  </span>
                </span>
                {controls}
              </div>
              <div className={s.messages}>{messages.map((m, i) => <Bubble key={i} m={m} />)}</div>
              <div className={s.reply}>{oliviaState === "human" ? "Reply as a human agent…" : "Take over to reply"}</div>
            </div>
          </div>

          {/* The same chat on a phone. */}
          <div className={s.phone} aria-hidden="true">
            <div className={s.phoneHead}>
              <Avatar name="Olivia Martin" index={0} size={30} />
              <span className={s.threadWho}>
                <span className={s.phoneName}>Olivia Martin</span>
                <span className={`${s.state} ${s[`state_${oliviaState}`]}`}>
                  {oliviaState === "waiting" ? "Waiting for a human" : oliviaState === "human" ? "Maya is handling" : "Aurevia is replying"}
                </span>
              </span>
            </div>
            <div className={s.phoneBody}>{lastFew.map((m, i) => <Bubble key={messages.length - lastFew.length + i} m={m} />)}</div>
            <div className={s.phoneFoot}>{controls}</div>
          </div>
        </div>

        <ol className={s.points}>
          {[
            { title: "Every channel, one list", body: "Store, WhatsApp and Instagram chats arrive live and tagged. Email has its own tab." },
            { title: "Take over in one tap", body: "From your desk or your phone. Hand it back to the AI when you're done." },
            { title: "Tickets and team seats", body: "Anything that needs follow-up becomes a ticket, shared with your team by role." },
            { title: "Corrections stick", body: "Fix an answer once and the agent uses it from then on." },
          ].map(({ title, body }, i) => (
            <li key={title} className={s.point}>
              <span className={s.pointNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.pointTitle}>{title}</span>
              <span className={s.pointBody}>{body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
