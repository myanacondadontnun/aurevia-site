"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import st from "./setup.module.css";

/**
 * "Live on your store in about ten minutes": one board whose emerald field plays each step in turn (the app embed
 * switching on; products, collections and discounts syncing; a first live chat), and a clock that runs from 00:00
 * to 10:00 alongside. Loops while on screen; shows the finished state under reduced motion.
 */

const STEPS = [
  { when: "Minute 1", title: "Install from the Shopify App Store", body: "One click. Aurevia adds itself to your theme as an app embed, with no code." },
  { when: "Minutes 2–5", title: "Your store syncs itself", body: "Products, variants, prices, stock, policies and pages are pulled in and kept up to date." },
  { when: "Minutes 5–10", title: "Set the voice and the rules", body: "Pick a tone, write when to hand off to your team, and go live. Change anything later." },
];

const SYNC_ROWS = ["Products", "Collections", "Discounts"];

/** Play time (ms) → simulated store time (s): each step's share of the ten minutes. */
const TIMELINE: [number, number][] = [
  [0, 0],
  [1800, 60],
  [5000, 300],
  [8800, 600],
];
const END = TIMELINE[TIMELINE.length - 1][0];
/** How long the finished state holds before the board plays again. */
const HOLD = 3600;

function simSeconds(ms: number) {
  for (let i = 1; i < TIMELINE.length; i++) {
    const [t0, s0] = TIMELINE[i - 1];
    const [t1, s1] = TIMELINE[i];
    if (ms <= t1) return s0 + ((ms - t0) / (t1 - t0)) * (s1 - s0);
  }
  return TIMELINE[TIMELINE.length - 1][1];
}

function usePlayback() {
  const ref = useRef<HTMLElement>(null);
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMs(END);
      return;
    }
    let raf = 0;
    let start = 0;
    // Loops while on screen: play, hold the finished state, start again. Pauses off screen.
    const tick = (t: number) => {
      if (!start) start = t;
      const e = t - start;
      if (e >= END + HOLD) start = t;
      setMs(Math.min(e >= END + HOLD ? 0 : e, END));
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting) {
          start = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, ms };
}

/** Whole minutes only: the minute steps, the seconds stay at :00. */
const clock = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:00`;

/** 0 → 1 progress of a window inside the playback. */
const span = (ms: number, from: number, to: number) => Math.max(0, Math.min(1, (ms - from) / (to - from)));

/* Each visual is one quiet object on the emerald field: the app tile and its embed switch; a sync ring; the
   agent's first line in the chosen tone. */

function InstallVisual({ ms }: { ms: number }) {
  const on = ms >= 1100;
  return (
    <div className={st.install}>
      <span className={st.appTile}><img src="/images/aurevia-logo-mark.webp" alt="" /></span>
      <span className={`${st.bigSwitch} ${on ? st.bigSwitchOn : ""}`}><span /></span>
      <span className={st.caption}>{on ? "App embed on" : "App embed off"}</span>
    </div>
  );
}

const RING = 2 * Math.PI * 52;

function SyncVisual({ ms }: { ms: number }) {
  const p = span(ms, 1900, 4800);
  const done = Math.floor(p * SYNC_ROWS.length + 0.0001);
  const current = SYNC_ROWS[Math.min(SYNC_ROWS.length - 1, done)];
  return (
    <div className={st.sync}>
      <span className={st.ring}>
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" className={st.ringTrack} />
          <circle cx="60" cy="60" r="52" className={st.ringFill} style={{ strokeDasharray: RING, strokeDashoffset: RING * (1 - p) }} />
        </svg>
        <span className={st.ringPct}>{Math.round(p * 100)}%</span>
      </span>
      <span className={st.caption}>{p >= 1 ? "Store synced" : p > 0 ? `Syncing ${current.toLowerCase()}…` : "Ready to sync"}</span>
      <span className={st.syncChips}>
        {SYNC_ROWS.map((row, i) => (
          <span key={row} className={`${st.syncChip} ${i < done ? st.syncChipOn : ""}`}>
            <Check aria-hidden="true" />
            {row}
          </span>
        ))}
      </span>
    </div>
  );
}

function VoiceVisual({ ms }: { ms: number }) {
  const live = ms >= 5300;
  const asked = ms >= 5900;
  const typing = ms >= 6600 && ms < 7700;
  const answered = ms >= 7700;
  return (
    <div className={st.chat}>
      <span className={`${st.live} ${live ? st.liveOn : ""}`}><i aria-hidden="true" />{live ? "Live on your store" : "Going live…"}</span>
      <span className={`${st.msg} ${st.msgShopper} ${asked ? st.msgOn : ""}`}>Does this run true to size?</span>
      {typing && (
        <span className={`${st.msg} ${st.msgAgent} ${st.msgOn} ${st.typing}`}><i /><i /><i /></span>
      )}
      <span className={`${st.msg} ${st.msgAgent} ${answered ? st.msgOn : ""} ${typing ? st.msgHidden : ""}`}>
        It does. Most shoppers take their usual size.
      </span>
    </div>
  );
}

export default function SetupSteps() {
  const { ref, ms } = usePlayback();
  const sec = simSeconds(ms);
  // Which step is playing: 0, 1, 2, or 3 once finished.
  const phase = ms >= END ? 3 : ms >= 5000 ? 2 : ms >= 1800 ? 1 : 0;

  return (
    <section ref={ref} className={st.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={st.head}>
          <div>
            <h2 className={st.title}>Live on your store in about ten minutes</h2>
            <p className={st.lede}>No developers, no theme edits, no training sessions.</p>
          </div>
          <div className={st.clock} aria-hidden="true">
            <span className={st.clockTime}>{clock(sec)}</span>
            <span className={st.clockLabel}>{phase === 3 ? "Live" : "Install to live"}</span>
          </div>
        </div>

        {/* One board: a continuous emerald field holding the three visuals, the copy for each step beneath. */}
        <ol className={st.board}>
          <span className={st.boardMark} aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li key={s.title} className={`${st.col} ${phase >= i ? st.colOn : ""}`}>
              <div className={st.visual} aria-hidden="true">
                {i === 0 && <InstallVisual ms={ms} />}
                {i === 1 && <SyncVisual ms={ms} />}
                {i === 2 && <VoiceVisual ms={ms} />}
              </div>
              <div className={st.copy}>
                <p className={st.when}>{s.when}</p>
                <h3 className={st.stepTitle}>{s.title}</h3>
                <p className={st.body}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
