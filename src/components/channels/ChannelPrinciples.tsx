import Link from "next/link";
import c from "./channels.module.css";

/* How Aurevia handles customers' messages. Shown on the WhatsApp and Instagram pages, where Meta's reviewers look for
   the data handling; the business behind the service is in the footer on every page. */

const PRINCIPLES = [
  {
    heading: "Customers message you first",
    body:
      "Aurevia replies to conversations your customers start. We do not send marketing broadcasts. The one exception is the cart reminder: a single message, by email or WhatsApp, sent only to shoppers who ticked the box asking for it, with a way to stop in every one.",
  },
  {
    heading: "Your data stays yours",
    body:
      "Messages and comments are used to answer that conversation for your store, and nothing else. We never use them for advertising, never sell them, and never mix one store's data with another's.",
  },
  {
    heading: "You stay in control",
    body:
      "Every conversation appears in your Aurevia dashboard. You choose which replies go out automatically, you can take over by hand, and you can disconnect a channel whenever you like. Disconnecting removes our access to that account.",
  },
];

export default function ChannelPrinciples() {
  return (
    <section className={c.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className={c.h2}>How we handle your customers&apos; messages</h2>
        <ul className={c.principles}>
          {PRINCIPLES.map((item) => (
            <li key={item.heading} className={c.principle}>
              <h3 className={c.principleTitle}>{item.heading}</h3>
              <p className={c.principleBody}>{item.body}</p>
            </li>
          ))}
        </ul>
        <p className={c.legal}>
          Full detail is in our <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
          <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/gdpr">GDPR Compliance</Link> pages. To
          request deletion of data held for a connected account, email <a href="mailto:sales@aurevia.io">sales@aurevia.io</a>.
        </p>
      </div>
    </section>
  );
}
