import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Live Takeover & Support Tickets for Shopify | Aurevia";
const desc =
  "Watch every conversation as it happens, take over from your phone, and run support tickets and email replies from one place. The AI hands off with the full story.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/ticket-management" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/ticket-management/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "I need to change the shipping address on order #1042. Can I talk to a person?" },
  { type: "bot", text: "Of course. I've raised a ticket and pinged the team — one moment." },
  {
    type: "card",
    delay: 600,
    head: "Support ticket",
    title: "#2481 · Address change on order #1042",
    note: "Assigned to Ritwik · usually replies in about 2 min",
    progress: true,
  },
  { type: "agent", name: "Ritwik", role: "Live agent · Lucien Vallière", delay: 2200 },
  { type: "bot", text: "Hi, Ritwik here. Address updated on #1042 — it ships tomorrow. Anything else I can do?", delay: 900 },
  { type: "user", text: "That's it, thank you!", delay: 1400 },
];

const afterHoursScript: ChatStep[] = [
  { type: "user", text: "My package says delivered but it isn't here. Can someone help?" },
  { type: "bot", text: "I'm sorry — that's stressful. I've opened a ticket with your order attached." },
  { type: "card", delay: 600, head: "Support ticket", title: "#2483 · Marked delivered, not received", note: "Team is back at 9:00 · you'll get an email reply", progress: true },
  { type: "bot", text: "It's 11:40pm here, so the team will pick this up first thing at 9. Meanwhile, could you check with neighbours or a building office? Carriers often leave parcels there.", delay: 900 },
  { type: "user", text: "Will do, thanks.", delay: 1600 },
];

export default function TicketManagementPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Live takeover & tickets"
      headline={
        <>
          Step in when it matters. <span className="green-highlight">Hand back when it's done.</span>
        </>
      }
      subtitle="The AI answers the routine questions on its own. When a shopper asks for a person, a ticket opens, your team is pinged, and the same chat becomes a live conversation with the transcript, cart and order already on screen."
      heroBullets={[
        "Take over any chat in one click",
        "Tickets with transcript, cart and order attached",
        "Reply by email from the dashboard",
      ]}
      demo={<FeatureChatDemo agentName="Lucien" script={demoScript} loopPause={5500} />}
      proofStrip={[
        { label: "No blank tickets", text: "Every escalation carries what they asked, what they bought, and what the AI already said." },
        { label: "Working-hours aware", text: "Out of hours, the ticket still opens and the shopper is told when the team is next in. Nobody is paged at 3am." },
        { label: "The cart stays warm", text: "Escalating a question never means abandoning the sale mid-thread." },
      ]}
      featureBlocks={[
        {
          title: "Live Activity",
          body: "Every open session in one list, refreshing as it happens. Filter by AI, human or ended, search by shopper, and open the transcript with their current cart beside it.",
        },
        {
          title: "Takeover from your phone",
          body: "Get the notification, tap Take over, reply as yourself, share a product or a cart link, then hand the conversation back to the AI.",
        },
        {
          title: "A ticket queue that fits a small team",
          body: "Open, in progress, waiting and resolved. Assign to anyone, resolve in a click, and reply by email in the same thread the shopper already has.",
        },
        {
          title: "Correct the AI without leaving the chat",
          body: "See an answer you'd have phrased differently? Correct it inline and the agent uses your version from then on.",
        },
      ]}
      howItWorks={[
        { title: "The AI handles first", body: "FAQs, order tracking and product questions get answered from your catalog and documents." },
        { title: "A shopper asks for a person", body: "Or one of your handoff rules fires: cart value, refunds, complex requests. A ticket opens and the assigned agent is pinged." },
        { title: "You take over, then hand back", body: "Reply in the same window. When you're done, the AI picks up with the full context." },
      ]}
      relatedLinks={[
        { href: "/products/automated-responses", label: "Automated responses" },
        { href: "/help/take-over-a-live-chat", label: "How to take over a chat" },
        { href: "/help/support-tickets-and-the-inbox", label: "Tickets and the inbox" },
        { href: "/channels", label: "WhatsApp & Instagram" },
      ]}
      faqs={[
        {
          q: "What does an agent see on handoff?",
          a: "The full transcript, the shopper's contact details, session timing, their current cart, and any products the AI already showed. Nobody has to ask the shopper to repeat themselves.",
        },
        {
          q: "Can the AI issue refunds or replacements on its own?",
          a: "No. Refunds, address changes and anything that touches an order go to a human by default. The AI collects the details and opens the ticket.",
        },
        {
          q: "What happens outside our hours?",
          a: "Set your team hours once. Outside them, the ticket still opens and the shopper is told when someone will be back. Alerts go out when you're next in.",
        },
      ]}
      secondDemo={{
        eyebrow: "Out of hours",
        title: "The ticket still opens. Nobody gets paged at 3am.",
        body: "Set your team hours once. Outside them the agent still raises the ticket, tells the shopper when someone will be back, and the alert waits until you're in.",
        demo: <FeatureChatDemo agentName="Lucien" script={afterHoursScript} loopPause={5000} />,
        points: ["Working-hours aware", "Honest expectations", "Nothing lost overnight"],
      }}
      screenshot={{
        src: "/images/app/tickets-desktop.webp",
        url: "app.aurevia.io/lead-management",
        title: "A queue a small team can actually run",
        caption: "Open, in progress, waiting and resolved, with the source, assignee and shopper on every row. Assign to anyone, resolve in a click, reply by email from the same panel.",
      }}
      setup={{
        title: "How merchants set it up",
        steps: [
          { src: "/images/app/schedule-desktop.webp", title: "Set team hours", body: "Per-day hours in your timezone. Overnight ranges are fine." },
          { src: "/images/app/handoff-desktop.webp", title: "Decide what needs a human", body: "Handoff phrases, a cart-value threshold, refunds and complex requests." },
          { src: "/images/app/team-desktop.webp", title: "Invite the team", body: "Admins shape the AI, members handle conversations and tickets. Seats come with the plan." },
        ],
      }}
      review={getReview("littleangel")}
      alsoSee={[
        { href: "/products/automated-responses", title: "Automated responses", body: "What the agent handles before anyone needs to step in." },
        { href: "/help/take-over-a-live-chat", title: "Help: taking over a chat", body: "The exact clicks, from the notification to hand-back." },
        { href: "/channels", title: "WhatsApp & Instagram", body: "The same handoff on messaging channels, in early access." },
      ]}
    />
  );
}
