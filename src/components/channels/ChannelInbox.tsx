"use client";

/**
 * /channels hero: the Aurevia inbox with conversations arriving from all four channels, each answered by the same
 * agent, and one handed to the team. Lucien Vallière demo store; shoppers are fictional. Loops while on screen.
 */

import { Check, UserRound } from "lucide-react";
import { ChannelBadge, type ChannelKind } from "@/components/ChannelIcons";
import { useScene } from "@/components/sceneClock";
import c from "./channels.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

const ROWS: { kind: ChannelKind; channel: string; who: string; text: string; reply: string; team?: boolean }[] = [
  { kind: "store", channel: "Store chat", who: "Camille M.", text: "Does the silk blouse run small?", reply: "True to size. Your usual M is right." },
  { kind: "whatsapp", channel: "WhatsApp", who: "Oliver R.", text: "Where's my order #1042?", reply: "Shipped yesterday, due Thursday." },
  { kind: "instagram", channel: "Instagram", who: "Juliette B.", text: "Is the pink jacket waterproof?", reply: "Yes, it's a light rain shell. Link sent." },
  { kind: "email", channel: "Email", who: "Sam Parker", text: "Can I swap the boots for a 39?", reply: "Passed to your team with the order attached.", team: true },
];

const STEP = 1100;

export default function ChannelInbox() {
  const { ref, ms } = useScene(ROWS.length * STEP + 900, { fromStart: true });
  const arrived = (i: number) => ms >= 300 + i * STEP;
  const answered = (i: number) => ms >= 300 + i * STEP + 750;
  const count = ROWS.filter((_, i) => arrived(i)).length;

  return (
    <div ref={ref} className={c.inbox} role="img" aria-label="The Aurevia inbox: messages from the store chat, WhatsApp, Instagram and email, each answered by the same agent, one passed to the team">
      <div className={c.inboxHead}>
        <span className={c.inboxTitle}>Inbox</span>
        <span className={c.inboxCount}>{count} new</span>
      </div>
      <div className={c.filters} aria-hidden="true">
        <span className={cx(c.filter, c.filterOn)}>All channels</span>
        {ROWS.map((r) => (
          <span key={r.kind} className={c.filter}>
            <ChannelBadge kind={r.kind} className="h-4 w-4 rounded-[5px]" />
          </span>
        ))}
      </div>
      <ul className={c.threads}>
        {ROWS.map((r, i) => (
          <li key={r.kind} className={cx(c.threadWrap, arrived(i) && c.threadOn)}>
            <div className={c.thread}>
              <ChannelBadge kind={r.kind} className="h-9 w-9 rounded-[11px]" />
              <span className={c.threadMain}>
                <span className={c.threadTop}>
                  <b>{r.who}</b>
                  <span className={c.threadChannel}>{r.channel}</span>
                </span>
                <span className={c.threadText}>{r.text}</span>
                <span className={cx(c.reply, answered(i) && c.replyOn, r.team && c.replyTeam)}>
                  {r.team ? <UserRound aria-hidden="true" /> : <img src="/images/site/mark-ring.webp" alt="" />}
                  {answered(i) ? r.reply : "Typing…"}
                </span>
              </span>
              <span className={cx(c.status, answered(i) && c.statusOn, r.team && c.statusTeam)}>
                {answered(i) ? (r.team ? "Your team" : <><Check aria-hidden="true" /> Answered</>) : ""}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={c.inboxFoot}>One agent · one inbox · your catalogue</div>
    </div>
  );
}
