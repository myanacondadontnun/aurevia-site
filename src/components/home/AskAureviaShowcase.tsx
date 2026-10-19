"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DashboardFrame, EMPTY_SCENE, type Scene, type ThreadPart } from "./DashboardHome";
import s from "./ask.module.css";

/**
 * "Ask your store anything": a replica of the dashboard's Home page (Chat mode) playing one of three demos,
 * picked from tabs on the right. Each demo starts on the analytics board, types its question into the real
 * input, sends it, and plays the reply the way Ask Aurevia streams it: thinking line, text, then a chart, a
 * product change to approve, or a generated image to add. The tabs advance on their own until clicked.
 */

type Tok = [string, boolean?];

/** Reveals a reply word by word, keeping bold runs bold. */
function streamed(paragraphs: Tok[][], progress: number): ReactNode {
  const words = paragraphs.flatMap((p, pi) => p.flatMap(([text, bold]) => text.split(" ").filter(Boolean).map((w) => ({ w, bold: !!bold, pi }))));
  const n = Math.round(words.length * Math.min(1, Math.max(0, progress)));
  const shown = words.slice(0, n);
  return paragraphs.map((_, pi) => {
    const ws = shown.filter((x) => x.pi === pi);
    if (!ws.length) return null;
    return (
      <p key={pi}>
        {ws.map((x, i) => (
          <span key={i}>{x.bold ? <strong>{x.w}</strong> : x.w}{i < ws.length - 1 ? " " : ""}</span>
        ))}
      </p>
    );
  });
}

type Demo = {
  id: string;
  title: string;
  body: string;
  question: string;
  /** Length of the whole demo, ms. */
  end: number;
  /** What the thread shows `dt` ms after the question was sent. */
  after: (dt: number) => Pick<Scene, "thinking" | "streaming" | "parts">;
};

const TYPE_START = 800;
const CHAR_MS = 26;
const sendTime = (q: string) => TYPE_START + q.length * CHAR_MS + 560;

const window_ = (dt: number, from: number, to: number) => (dt - from) / (to - from);

const DEMOS: Demo[] = [
  {
    id: "charts",
    title: "Charts and answers from your real store data",
    body: "Ask in plain English. The answer and the chart come from your own orders and conversations.",
    question: "Chart revenue sold by AI this month",
    end: sendTime("Chart revenue sold by AI this month") + 9500,
    after: (dt) => {
      if (dt < 1800) return { thinking: dt < 900 ? "Looking at your store..." : "Crunching the numbers...", streaming: true, parts: [] };
      const text: Tok[][] = [
        [["You've sold"], ["$4,820", true], ["through Aurevia in the last 30 days, across"], ["61 orders.", true], ["Every week beat the one before, and the Linen Midi Dress drove the most."]],
        [["Here it is by week:"]],
      ];
      const parts: ThreadPart[] = [{ kind: "text", html: streamed(text, window_(dt, 1800, 2900)) }];
      if (dt >= 2900) parts.push({ kind: "chart" });
      return { thinking: null, streaming: dt < 3300, parts };
    },
  },
  {
    id: "fixes",
    title: "Proposes product fixes",
    body: "It drafts the change from what shoppers keep asking. Nothing changes until you approve.",
    question: "Shoppers keep asking if the Linen Midi Dress runs small. Add a fit note to it.",
    end: sendTime("Shoppers keep asking if the Linen Midi Dress runs small. Add a fit note to it.") + 10500,
    after: (dt) => {
      if (dt < 1700) return { thinking: "Looking at your store...", streaming: true, parts: [] };
      const text: Tok[][] = [[["Fit came up in"], ["14 chats", true], ["this week, and shoppers were told it runs true to size. Here's the description change for you to review:"]]];
      const parts: ThreadPart[] = [{ kind: "text", html: streamed(text, window_(dt, 1700, 2500)) }];
      if (dt >= 2700) {
        const status = dt < 4600 ? "pending" : dt < 4820 ? "pressing" : dt < 5900 ? "applying" : "done";
        parts.push({ kind: "productCard", status });
      }
      return { thinking: null, streaming: dt < 2700, parts };
    },
  },
  {
    id: "images",
    title: "Creates product images on request",
    body: "Describe the shot, then add it to the product in one click.",
    question: "Create a lifestyle photo of the Silk Slip Dress for its product page",
    end: sendTime("Create a lifestyle photo of the Silk Slip Dress for its product page") + 11500,
    after: (dt) => {
      if (dt < 1300) return { thinking: "Thinking...", streaming: true, parts: [] };
      const text: Tok[][] = [[["On it. A soft, sunlit shot to match your other product photos:"]]];
      const parts: ThreadPart[] = [{ kind: "text", html: streamed(text, window_(dt, 1300, 1900)) }];
      if (dt >= 2000 && dt < 4600) parts.push({ kind: "imageGenerating" });
      if (dt >= 4600) {
        const status = dt < 6400 ? "pending" : dt < 6620 ? "pressing" : dt < 7400 ? "applying" : "done";
        parts.push({ kind: "generatedImage", src: "/images/site/fashion-silk-dress.webp", status });
      }
      return { thinking: null, streaming: dt < 4600, parts };
    },
  },
];

function sceneAt(demo: Demo, t: number): Scene {
  const send = sendTime(demo.question);
  const press = send - 160;
  if (t < send) {
    const n = t < TYPE_START ? 0 : Math.min(demo.question.length, Math.floor((t - TYPE_START) / CHAR_MS));
    return { ...EMPTY_SCENE, typed: demo.question.slice(0, n), sendPressed: t >= press };
  }
  return { ...EMPTY_SCENE, active: true, question: demo.question, ...demo.after(t - send) };
}

export default function AskAureviaShowcase() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [t, setT] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Plays the active demo; only advances while the section is on screen.
  useEffect(() => {
    if (reduced) return;
    let elapsed = 0;
    let last = performance.now();
    setT(0);
    const id = window.setInterval(() => {
      const now = performance.now();
      if (visible.current) elapsed += now - last;
      last = now;
      if (elapsed >= DEMOS[active].end) {
        window.clearInterval(id);
        if (interacted) setCycle((c) => c + 1);
        else setActive((a) => (a + 1) % DEMOS.length);
        return;
      }
      setT(elapsed);
    }, 50);
    return () => window.clearInterval(id);
  }, [active, cycle, interacted, reduced]);

  const pick = (i: number) => {
    setInteracted(true);
    setActive(i);
    setCycle((c) => c + 1);
  };

  const demo = DEMOS[active];
  const scene = sceneAt(demo, reduced ? demo.end : t);
  const progress = reduced ? 1 : Math.min(1, t / demo.end);

  return (
    <section className={s.section} ref={rootRef}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.head}>
          <h2 className={s.title}>Ask your store anything. Then let it help.</h2>
          <p className={s.lede}>
            Ask Aurevia is a copilot inside your dashboard. It reads your conversations, products and orders, answers in
            plain English and proposes changes for you to approve.
          </p>
        </div>

        <div className={s.grid}>
          <div className={s.stage}>
            <DashboardFrame scene={scene} label={`The Aurevia dashboard's Home page, with Ask Aurevia: ${demo.title}`} />
          </div>

          <div role="tablist" aria-label="What Ask Aurevia can do" aria-orientation="vertical" className={s.tabs}>
            {DEMOS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") pick((i + 1) % DEMOS.length);
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") pick((i + DEMOS.length - 1) % DEMOS.length);
                }}
                className={`${s.tab} ${active === i ? s.tabOn : ""}`}
              >
                <span className={s.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.tabTitle}>{item.title}</span>
                <span className={s.tabBodyWrap}>
                  <span className={s.tabBody}>{item.body}</span>
                </span>
                {active === i && (
                  <span className={s.progress} aria-hidden="true" style={{ transform: `scaleY(${progress})` }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
