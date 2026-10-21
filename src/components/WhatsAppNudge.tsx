/**
 * Cart-recovery nudge as it reads in WhatsApp. The first message is the real
 * template the backend sends (recovery/whatsapp_nudge.py): keep the wording,
 * footer and button in step with it. Lucien Vallière demo store.
 */

import { WhatsAppGlyph } from "./ChannelIcons";

/** The nudge template as the backend sends it (recovery/whatsapp_nudge.py). */
export const WA_NUDGE = {
  text: "Hi Camille, you left Silk Draped Blouse in your cart at Lucien Vallière. It is still waiting for you. Any questions before you decide? Just reply here.",
  footer: "Reply STOP to opt out",
  button: "Return to your cart",
};

export default function WhatsAppNudge() {
  return (
    <div className="demo-wa" aria-label="Example cart recovery message on WhatsApp">
      <div className="demo-wa-head">
        <span className="demo-wa-avatar">LV</span>
        <span className="demo-wa-head-text">
          <strong>Lucien Vallière</strong>
          <span>Business account</span>
        </span>
        <WhatsAppGlyph className="demo-wa-mark" />
      </div>
      <div className="demo-wa-body">
        <span className="demo-wa-day">Today</span>
        <div className="demo-wa-msg demo-wa-in">
          <p>{WA_NUDGE.text}</p>
          <span className="demo-wa-foot">{WA_NUDGE.footer}</span>
          <span className="demo-wa-time">10:42</span>
          <span className="demo-wa-cta">{WA_NUDGE.button}</span>
        </div>
        <div className="demo-wa-msg demo-wa-out">
          <p>Will it arrive before Friday?</p>
          <span className="demo-wa-time">10:47 ✓✓</span>
        </div>
        <div className="demo-wa-msg demo-wa-in">
          <p>Yes. Order today and express lands Wednesday, standard Thursday.</p>
          <span className="demo-wa-time">10:47</span>
        </div>
      </div>
    </div>
  );
}
