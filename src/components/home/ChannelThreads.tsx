import {
  Archive,
  ArrowLeft,
  Camera,
  CheckCheck,
  ChevronLeft,
  EllipsisVertical,
  ExternalLink,
  Forward,
  Image as ImageIcon,
  Mail,
  Mic,
  Paperclip,
  Phone,
  Reply,
  Smile,
  Star,
  Sticker,
  Trash2,
  Video,
} from "lucide-react";
import c from "./channels.module.css";

/**
 * The channels Aurevia answers in, drawn the way the shopper sees them on their phone: an opened Gmail
 * message, a WhatsApp chat and an Instagram DM. The store's replies come from the store's own account,
 * so there is no Aurevia mark here (unlike the website widget). No device frames, no third-party logos.
 */

export type ThreadMessage =
  | { from: "me" | "them"; text: string; time?: string; /** A link button under the message (WhatsApp template). */ button?: string }
  | { from: "them"; cards: { title: string; price: string; image: string | null }[] };

function Monogram({ name, size, className = "" }: { name: string; size: number; className?: string }) {
  return (
    <span className={`${c.mono} ${className}`} style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden="true">
      {name.charAt(0)}
    </span>
  );
}

function Img({ src, className }: { src: string | null; className: string }) {
  return src ? <img src={src} alt="" className={className} /> : <span className={`${className} ${c.ph}`} aria-hidden="true" />;
}

/* ---------------- Gmail: an opened message in the Gmail app ---------------- */

export function GmailMessage({
  store,
  to,
  time,
  subject,
  photo,
  product,
  price,
}: {
  store: string;
  to: string;
  time: string;
  subject: string;
  photo: string | null;
  product: string;
  price: string;
}) {
  return (
    <div className={c.gm}>
      <div className={c.gmBar}>
        <ArrowLeft />
        <span className={c.gmBarRight}>
          <Archive />
          <Trash2 />
          <Mail />
          <EllipsisVertical />
        </span>
      </div>

      <div className={c.gmSubject}>
        <span>
          {subject} <span className={c.gmLabel}>Inbox</span>
        </span>
        <Star className={c.gmStar} />
      </div>

      <div className={c.gmFrom}>
        <Monogram name={store} size={40} className={c.gmAvatar} />
        <span className={c.gmWho}>
          <span className={c.gmName}>
            {store} <span className={c.gmTime}>{time}</span>
          </span>
          <span className={c.gmTo}>to {to} ▾</span>
        </span>
        <Reply className={c.gmIcon} />
        <EllipsisVertical className={c.gmIcon} />
      </div>

      {/* The store's email itself, as Gmail renders it inline. */}
      <div className={c.gmBody}>
        <div className={c.mailer}>
          <p className={c.mailerBrand}>{store}</p>
          <p className={c.mailerHead}>Still thinking it over?</p>
          <p className={c.mailerText}>Your cart is saved. Here&apos;s what you left behind.</p>
          <div className={c.mailerItem}>
            <Img src={photo} className={c.mailerImg} />
            <span className={c.mailerName}>
              {product}
              <small>Qty 1</small>
            </span>
            <span className={c.mailerPrice}>{price}</span>
          </div>
          <span className={c.mailerBtn}>Return to your cart</span>
          <p className={c.mailerNote}>Questions? Just reply to this email.</p>
        </div>
      </div>

      <div className={c.gmActions}>
        <span className={c.gmAction}><Reply />Reply</span>
        <span className={c.gmAction}><Forward />Forward</span>
      </div>
    </div>
  );
}

/* ---------------- WhatsApp: a business chat in the WhatsApp app ---------------- */

export function WhatsAppChat({ business, status, messages }: { business: string; status: string; messages: ThreadMessage[] }) {
  return (
    <div className={c.wa}>
      <div className={c.waHead}>
        <ArrowLeft className={c.waHeadIcon} />
        <Monogram name={business} size={36} className={c.waAvatar} />
        <span className={c.waWho}>
          <span className={c.waName}>{business}</span>
          <span className={c.waStatus}>{status}</span>
        </span>
        <span className={c.waHeadRight}>
          <Video />
          <Phone />
          <EllipsisVertical />
        </span>
      </div>

      <div className={c.waBody}>
        <span className={c.waDay}>Today</span>
        {messages.map((m, i) => {
          if (!("text" in m)) return null;
          const first = i === 0 || messages[i - 1].from !== m.from;
          return (
            <div key={i} className={`${c.waMsg} ${m.from === "me" ? c.waOut : c.waIn} ${first ? c.waTail : ""} ${m.button ? c.waHasButton : ""} ${c.enter}`}>
              <span>{m.text}</span>
              <span className={c.waMeta}>
                {m.time}
                {m.from === "me" && <CheckCheck className={c.waTicks} />}
              </span>
              {m.button && (
                <span className={c.waButton}>
                  <ExternalLink />
                  {m.button}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className={c.waInput}>
        <span className={c.waField}>
          <Smile />
          <span className={c.waPlaceholder}>Message</span>
          <Paperclip />
          <Camera />
        </span>
        <span className={c.waMic}><Mic /></span>
      </div>
    </div>
  );
}

/* ---------------- Instagram: a DM thread in the Instagram app ---------------- */

export function InstagramChat({
  name,
  handle,
  context,
  messages,
}: {
  name: string;
  handle: string;
  /** Small line above the shopper's first message, e.g. that they replied to a reel. */
  context?: string;
  messages: ThreadMessage[];
}) {
  const lastMine = messages.map((m) => m.from).lastIndexOf("me");
  return (
    <div className={c.ig}>
      <div className={c.igHead}>
        <ChevronLeft className={c.igHeadIcon} />
        <Monogram name={name} size={32} className={c.igAvatar} />
        <span className={c.igWho}>
          <span className={c.igName}>{name}</span>
          <span className={c.igHandle}>{handle}</span>
        </span>
        <span className={c.igHeadRight}>
          <Phone />
          <Video />
        </span>
      </div>

      <div className={c.igBody}>
        {messages.map((m, i) => {
          const lastOfGroup = i === messages.length - 1 || messages[i + 1].from !== m.from;
          if (m.from === "me") {
            return (
              <div key={i} className={`${c.igOutWrap} ${c.enter}`}>
                {context && i === messages.findIndex((x) => x.from === "me") && <span className={c.igContext}>{context}</span>}
                <span className={`${c.igBubble} ${c.igOut}`}>{"text" in m ? m.text : null}</span>
                {i === lastMine && i === messages.length - 1 && <span className={c.igSeen}>Seen</span>}
              </div>
            );
          }
          return (
            <div key={i} className={`${c.igInRow} ${c.enter}`}>
              {lastOfGroup ? <Monogram name={name} size={28} className={c.igAvatarSm} /> : <span className={c.igSpacer} />}
              {"text" in m ? (
                <span className={`${c.igBubble} ${c.igIn}`}>{m.text}</span>
              ) : (
                <div className={c.igCards}>
                  {m.cards.map((card) => (
                    <div key={card.title} className={c.igCard}>
                      <Img src={card.image} className={c.igCardImg} />
                      <span className={c.igCardText}>
                        <strong>{card.title}</strong>
                        <small>{card.price}</small>
                      </span>
                      <span className={c.igCardBtn}>View product</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={c.igInput}>
        <span className={c.igCam}><Camera /></span>
        <span className={c.igPlaceholder}>Message...</span>
        <span className={c.igInputRight}>
          <Mic />
          <ImageIcon />
          <Sticker />
        </span>
      </div>
    </div>
  );
}
