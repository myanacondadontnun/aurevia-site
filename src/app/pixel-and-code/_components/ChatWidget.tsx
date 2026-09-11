import PcMark from "./PcMark";

// Lead-capture chat assistant — byte-identical markup on every page.
// Wired up client-side by script.js (initChat), which posts to
// /pixel-and-code/api/chat (proxied to the pixel-chat Netlify Function).
export default function ChatWidget() {
  return (
    <div className="chat" data-chat>
      <button className="chat__ping" data-chat-ping type="button" aria-label="Open chat">
        <span className="chat__ping-body">
          <span className="chat__ping-name">Pixl</span>
          <span className="chat__ping-text" data-chat-ping-text></span>
        </span>
        <span className="chat__ping-dismiss" data-chat-ping-dismiss aria-label="Dismiss">✕</span>
      </button>
      <button className="chat__launcher" data-chat-toggle aria-label="Open chat assistant">
        <PcMark />
        <span className="chat__launcher-close" aria-hidden="true">✕</span>
        <span className="chat__unread" aria-hidden="true"></span>
      </button>
      <div className="chat__panel" data-chat-panel role="dialog" aria-label="Pixel and Code assistant">
        <div className="chat__head">
          <PcMark />
          <span className="chat__head-meta">
            <span className="chat__brand"><span className="logo-pixel">Pixel</span><span className="logo-amp">&amp;</span><span className="logo-code">Code</span></span>
            <span className="chat__status"><i></i> Pixl · always shipping</span>
          </span>
          <button className="chat__close" data-chat-close aria-label="Close chat">✕</button>
        </div>
        <div className="chat__log" data-chat-log data-lenis-prevent></div>
        <div className="chat__actions" data-chat-actions></div>
        <div className="chat__chips" data-chat-chips></div>
        <form className="chat__form" data-chat-form>
          <input type="text" placeholder="Ask about our work…" data-chat-input autoComplete="off" />
          <button type="submit" aria-label="Send message">→</button>
        </form>
      </div>
    </div>
  );
}
