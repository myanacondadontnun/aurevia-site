import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { HandoffMini, InviteMini, TeamHoursMini, TicketsScene } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Live Takeover & Support Tickets for Shopify | Aurevia";
const desc =
  "Watch every conversation as it happens, take over from your phone, and handle support tickets and email replies in one place. The agent hands over with the whole conversation.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/ticket-management" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/ticket-management/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "I need to change the shipping address on order #1042. Can I talk to a person?" },
  { type: "bot", text: "Of course. I've raised a ticket and let the team know. One moment.", cue: { icon: "ticket", eyebrow: "Handoff", title: "Ticket #2481 raised" } },
  {
    type: "card",
    delay: 600,
    head: "Support ticket",
    title: "#2481 · Address change on order #1042",
    note: "Assigned to Ritwik · usually replies in about 2 min",
    progress: true,
  },
  { type: "agent", name: "Ritwik", role: "Live agent · Lucien Vallière", delay: 2200, cue: { icon: "user", eyebrow: "Live takeover", title: "Ritwik took over" } },
  { cue: { icon: "check", eyebrow: "Resolved", title: "Address updated" }, type: "bot", text: "Hi, Ritwik here. I've updated the address on #1042 and it ships tomorrow. Anything else I can help with?", delay: 900 },
  { type: "user", text: "That's it, thank you!", delay: 1400 },
];

const afterHoursScript: ChatStep[] = [
  { type: "user", text: "My package says delivered but it isn't here. Can someone help?" },
  { type: "bot", text: "Sorry, that's stressful. I've opened a ticket with your order attached." },
  { type: "card", delay: 600, head: "Support ticket", title: "#2483 · Marked delivered, not received", note: "Team is back at 9:00 · you'll get an email reply", progress: true },
  { type: "bot", text: "It's 11:40pm here, so the team will pick this up first thing at 9. In the meantime, could you check with neighbours or a building office? Carriers often leave parcels there.", delay: 900 },
  { type: "user", text: "Will do, thanks.", delay: 1600 },
];

export default function TicketManagementPage() {
  return (
    <FeatureSubpageLayout
      path="/products/ticket-management"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Live takeover & tickets"
      headline={
        <>
          Step in when you're needed. <span className="green-highlight">Hand back when you're done.</span>
        </>
      }
      subtitle="The agent answers routine questions on its own. When a shopper asks for a person, a ticket opens, your team is pinged, and the same chat becomes a live conversation with the transcript, cart and order already on screen."
      heroBullets={[
        "Take over any chat in one click",
        "Tickets with the transcript, cart and order attached",
        "Reply by email from the dashboard",
      ]}
      demo={<FeatureChatDemo agentName="Lucien" script={demoScript} loopPause={5500} />}
      featureBlocks={[
        {
          visual: { kind: "live" },
          title: "Live Activity",
          body: "Every open session in one list, updating as it happens. Filter by AI, human or ended, search by shopper, and open the transcript with their current cart beside it.",
        },
        {
          visual: { kind: "phone" },
          title: "Take over from your phone",
          body: "Get the notification, tap Take over and reply as yourself. Share a product or a cart link, then hand the conversation back to the agent.",
        },
        {
          visual: { kind: "ticket" },
          title: "A ticket queue that suits a small team",
          body: "Open, in progress, waiting and resolved. Assign tickets to anyone, resolve them in a click, and reply by email in the thread the shopper already has.",
        },
        {
          visual: { kind: "correction" },
          title: "Correct the agent without leaving the chat",
          body: "See an answer you'd have phrased differently? Correct it there and the agent uses your version from then on.",
        },
      ]}
      howItWorks={[
        { title: "The agent goes first", body: "FAQs, order tracking and product questions are answered from your catalogue and documents." },
        { title: "A shopper asks for a person", body: "Or one of your handover rules is triggered, such as cart value, refunds or complex requests. A ticket opens and the assigned team member is pinged." },
        { title: "You take over, then hand back", body: "Reply in the same window. When you're done, the agent picks up again with the full context." },
      ]}
      relatedLinks={[
        { href: "/products/automated-responses", label: "Automated responses" },
        { href: "/help/take-over-a-live-chat", label: "How to take over a chat" },
        { href: "/help/support-tickets-and-the-inbox", label: "Tickets and the inbox" },
        { href: "/channels/whatsapp", label: "WhatsApp & Instagram" },
      ]}
      faqs={[
        {
          q: "What does my team see on handover?",
          a: "The full transcript, the shopper's contact details, session timing, their current cart and any products the agent already showed. Nobody has to ask the shopper to repeat themselves.",
        },
        {
          q: "Can the agent issue refunds or replacements on its own?",
          a: "No. Refunds, address changes and anything else that changes an order go to a person by default. The agent collects the details and opens the ticket.",
        },
        {
          q: "What happens outside our hours?",
          a: "Set your team hours once. Outside them, the ticket still opens and the shopper is told when someone will be back. Alerts go out when you're next in.",
        },
      ]}
      secondDemo={{
        eyebrow: "Out of hours",
        title: "The ticket still opens. Nobody gets paged at 3am.",
        body: "Set your team hours once. Outside them, the agent still raises the ticket and tells the shopper when someone will be back. The alert waits until you're in.",
        demo: <FeatureChatDemo agentName="Lucien" script={afterHoursScript} loopPause={5000} />,
        points: ["Knows your team hours", "Clear about when you'll reply", "Nothing lost overnight"],
      }}
      screenshot={{
        scene: <TicketsScene />,
        title: "A queue a small team can actually run",
        caption: "Open, in progress, waiting and resolved, with the source, assignee and shopper on every row. Assign to anyone, resolve in a click and reply by email from the same panel.",
      }}
      setup={{
        title: "How merchants set it up",
        steps: [
          { scene: <TeamHoursMini />, title: "Set team hours", body: "Hours for each day in your time zone. Overnight shifts work too." },
          { scene: <HandoffMini />, title: "Decide what needs a person", body: "Handover phrases, a cart-value threshold, refunds and complex requests." },
          { scene: <InviteMini />, title: "Invite the team", body: "Admins set up the agent, and members handle conversations and tickets. Seats come with the plan." },
        ],
      }}
      review={getReview("littleangel")}
      alsoSee={[
        { href: "/products/automated-responses", title: "Automated responses", body: "What the agent handles before anyone needs to step in." },
        { href: "/help/take-over-a-live-chat", title: "Help: taking over a chat", body: "The exact clicks, from the notification to handing back." },
        { href: "/channels/whatsapp", title: "WhatsApp & Instagram", body: "The same handover in WhatsApp and Instagram DMs." },
      ]}
    />
  );
}
