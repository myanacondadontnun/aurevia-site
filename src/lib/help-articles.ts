/**
 * Help center content. Every article describes a feature that ships today in the
 * merchant app (app.aurevia.io); keep this in step with the product, not the roadmap.
 */

export type HelpCategory =
  | "Getting started"
  | "Training the AI"
  | "Conversations & support"
  | "Automation & channels"
  | "Account & billing";

export interface HelpSection {
  heading: string;
  paragraphs?: string[];
  steps?: string[];
  tips?: string[];
}

export interface HelpArticle {
  slug: string;
  title: string;
  summary: string;
  category: HelpCategory;
  minutes: number;
  updated: string;
  sections: HelpSection[];
  related?: string[];
}

export const HELP_CATEGORIES: HelpCategory[] = [
  "Getting started",
  "Training the AI",
  "Conversations & support",
  "Automation & channels",
  "Account & billing",
];

export const helpArticles: HelpArticle[] = [
  {
    slug: "install-and-enable-the-widget",
    title: "Install Aurevia and enable the widget on your store",
    summary: "From the Shopify App Store to a live chat on your storefront in about ten minutes.",
    category: "Getting started",
    minutes: 6,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Install from the Shopify App Store",
        paragraphs: [
          "Aurevia installs like any Shopify app. Shopify asks you to approve the permissions Aurevia needs to read your products, orders and theme, then hands you to the Aurevia onboarding.",
        ],
        steps: [
          "Open Aurevia on the Shopify App Store and click Install.",
          "Approve the requested permissions. Products and orders are needed for recommendations and attribution; theme access is needed to turn the widget on.",
          "You land in onboarding, signed in as the store owner.",
        ],
      },
      {
        heading: "Walk through onboarding",
        paragraphs: [
          "Onboarding does the setup you would otherwise do by hand. It syncs your catalog, drafts your store's sales approach and asks for the few details the AI can't infer.",
        ],
        steps: [
          "Enter your name and a support email. The support email is where ticket alerts go; you can skip it and add it later in Settings.",
          "Set a password so you can sign in without going through Shopify.",
          "Wait for the catalog sync. Products, collections and discounts are pulled from Shopify and stay in sync from then on.",
          "Answer the business profile questions (role, team size, monthly orders) and your goals. These shape the AI's default tone and priorities.",
          "Name your agent and give it a designation, for example \"Lucien\" and \"Style advisor\". Shoppers see both in the chat header.",
          "Click Enable widget. Shopify's theme editor opens with the Aurevia app embed selected; save the theme.",
          "Return to Aurevia. It checks your theme every few seconds and moves on once the embed is live.",
        ],
        tips: [
          "The widget shows on your home page, product pages, collections, the cart page and standard pages. It never renders inside checkout.",
          "If the status stays on \"checking\" for more than two minutes, open the theme editor again and confirm the Aurevia embed toggle is on and the theme is saved.",
        ],
      },
      {
        heading: "Check it on your storefront",
        steps: [
          "Open your store in a new tab and wait for the launcher pill in the bottom corner.",
          "Ask something a shopper would ask, for example \"What's your return policy?\" or \"Something for a gallery opening\".",
          "Watch the conversation appear under Leads → Live Activity in the app.",
        ],
      },
    ],
    related: ["train-the-ai-with-your-content", "set-tone-persona-and-handoff-rules"],
  },
  {
    slug: "train-the-ai-with-your-content",
    title: "Train the AI with links, files and corrections",
    summary: "Feed the agent your policies and guides so it stops guessing, and correct any answer once.",
    category: "Training the AI",
    minutes: 5,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Add knowledge sources",
        paragraphs: [
          "The agent answers product questions from your catalog automatically. Everything else, such as shipping, returns, sizing and brand story, comes from the Knowledge Base.",
        ],
        steps: [
          "Go to Knowledge → Knowledge Base.",
          "Paste a link, drop a file (PDF, DOC, DOCX or TXT) or type text straight into the box, then press Enter.",
          "Use the suggested sources block to add your Shopify policy pages and store pages in one click with Add all.",
          "Wait for the status to change from Processing to Synced. Errors show the reason next to the source.",
        ],
        tips: [
          "One topic per source keeps answers precise. A single 40-page PDF works, but a short shipping page and a short returns page work better.",
          "Refresh a link source after you edit the page it points to. Aurevia does not re-crawl on its own.",
        ],
      },
      {
        heading: "Correct an answer",
        paragraphs: [
          "When the agent gets something wrong, you don't retrain it. You record the shopper's message and the answer you wanted, and the agent uses that pair from then on.",
        ],
        steps: [
          "From Knowledge → Corrections, click New correction, or click Correct this answer under any AI message in Live Activity.",
          "Paste the shopper's message and write the revised answer.",
          "Leave the default 90-day expiry for seasonal facts, or switch on Keep forever for things that never change.",
        ],
        tips: ["Corrections are searchable and show time-to-expiry, so a quick monthly review keeps them honest."],
      },
      {
        heading: "Custom instructions",
        paragraphs: [
          "Standing rules such as \"never promise delivery dates\" or \"always mention the loyalty programme\" belong in AI Behaviour → Identity & Persona under Always and Never, not in the Knowledge Base.",
        ],
      },
    ],
    related: ["set-tone-persona-and-handoff-rules", "take-over-a-live-chat"],
  },
  {
    slug: "set-tone-persona-and-handoff-rules",
    title: "Set the agent's tone, persona and handoff rules",
    summary: "Make the agent sound like your brand, sell the way you want, and know when to call a human.",
    category: "Training the AI",
    minutes: 5,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Identity & Persona",
        steps: [
          "Open AI Behaviour → Identity & Persona.",
          "Pick a tone: Friendly, Professional, Witty, Empathetic, Luxury or Gen Z. Each shows a sample reply so you can hear the difference.",
          "Write a short persona, for example who the agent is and what it cares about.",
          "Choose reply length (concise or detailed) and initiative (reactive or proactive).",
          "Add Always and Never rules. These are hard constraints the agent follows in every reply.",
          "Set upsell strength, what recommendations should be based on (intent, cart, popularity, inventory), cross-sell prompts and urgency triggers.",
          "Decide whether to ask for marketing consent, what the message says and when it appears.",
        ],
      },
      {
        heading: "Handoff Rules",
        paragraphs: [
          "The agent only hands off when a shopper actually asks for a person, or when one of your rules fires.",
        ],
        steps: [
          "Open AI Behaviour → Handoff Rules.",
          "Add handoff phrases as tags, for example \"speak to someone\" or \"manager\".",
          "Set a cart-value threshold, and whether complex requests or refunds should always go to a human.",
          "Under Only answer when you're away, choose whether the AI should take over outside hours and on weekends.",
        ],
      },
      {
        heading: "Widget Configuration",
        steps: [
          "Open AI Behaviour → Widget Configuration.",
          "Set the agent name and designation shown in the chat header.",
          "Turn lead capture on to ask for name and email before the first reply, or off to let shoppers chat anonymously.",
          "Turn swipe discovery on if you want the agent to offer a swipe deck of products when a shopper is browsing.",
        ],
      },
    ],
    related: ["team-hours-and-out-of-hours-behaviour", "train-the-ai-with-your-content"],
  },
  {
    slug: "team-hours-and-out-of-hours-behaviour",
    title: "Team hours and what happens out of hours",
    summary: "Tell Aurevia when your team is around, so handoffs and alerts land at the right time.",
    category: "Conversations & support",
    minutes: 3,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Set your schedule",
        steps: [
          "Open AI Behaviour → Schedule.",
          "Pick your timezone.",
          "Set hours for each day. Overnight ranges such as 20:00 to 02:00 are fine.",
        ],
      },
      {
        heading: "What changes outside hours",
        paragraphs: [
          "A shopper who asks for a human outside your hours still gets a ticket. The agent tells them nobody is available right now and when the team is next in, and the team is not pinged until then.",
          "Inside hours, a human request pings the assigned agent immediately and shows up in Live Activity with an unread marker.",
        ],
      },
    ],
    related: ["take-over-a-live-chat", "support-tickets-and-the-inbox"],
  },
  {
    slug: "take-over-a-live-chat",
    title: "Take over a live chat and hand it back",
    summary: "Watch conversations as they happen, step in yourself, then let the AI carry on.",
    category: "Conversations & support",
    minutes: 4,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Find the conversation",
        steps: [
          "Open Leads → Live Activity. Active sessions refresh every few seconds.",
          "Filter by All, Mine, AI, Human or Ended, or search by shopper name.",
          "Click a session to see the transcript, the shopper's details, session timing and their current cart.",
        ],
      },
      {
        heading: "Take over",
        steps: [
          "Click Take over conversation. The shopper sees your name and avatar in the chat header and the AI stops replying.",
          "Type your reply. It goes straight into the shopper's chat window.",
          "Use Share products to pick items from your catalog, or Send cart link to give them a one-tap checkout.",
          "Click Hand over to AI when you're done. The AI picks up with the full context.",
        ],
        tips: [
          "Thumbs up or down on individual messages and the CSAT score appear inline, so you can see how the conversation is going before you step in.",
          "Click Correct this answer under any AI message to fix it for next time without leaving the page.",
        ],
      },
      {
        heading: "Notifications",
        paragraphs: [
          "The bell in the sidebar streams new human requests, new messages during a takeover, orders and system notices. Mark one or all as read from the panel.",
        ],
      },
    ],
    related: ["support-tickets-and-the-inbox", "team-roles-and-seats"],
  },
  {
    slug: "support-tickets-and-the-inbox",
    title: "Support tickets and the email inbox",
    summary: "Every human request becomes a ticket; every reply can go out by email from your store's support address.",
    category: "Conversations & support",
    minutes: 4,
    updated: "2026-09-26",
    sections: [
      {
        heading: "How tickets are created",
        paragraphs: [
          "When a shopper asks for a person, the agent collects their email, opens a ticket and assigns it to the least-loaded team member. The shopper gets the ticket number in the chat. You can also create tickets manually.",
        ],
      },
      {
        heading: "Work the queue",
        steps: [
          "Open Leads → Support Tickets.",
          "Filter by Open, In progress, Waiting or Resolved. Counts update as you work.",
          "Open a ticket to change its status, assign it to anyone on the team, or reply by email.",
          "Click Resolve when it's done. Resolved tickets stay searchable.",
        ],
        tips: ["Reply by email is disabled when the shopper never gave an address; the reason shows on the button."],
      },
      {
        heading: "The inbox",
        paragraphs: [
          "Leads → Inbox collects email threads in one place: support conversations and cart-recovery replies. Each store gets its own Aurevia-hosted address, and you can forward it to your own mailbox.",
        ],
        steps: [
          "Open Settings → Channels → Support inbox to choose the address name and set a forward-to address.",
          "Reply from the thread panel. Threading is preserved so replies land in the shopper's existing email thread.",
        ],
      },
    ],
    related: ["take-over-a-live-chat", "cart-recovery-emails"],
  },
  {
    slug: "cart-recovery-emails",
    title: "Set up cart recovery emails",
    summary: "Follow up abandoned carts in your store's voice, on your schedule, under your store's name.",
    category: "Automation & channels",
    minutes: 5,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Turn it on",
        steps: [
          "Open AI Behaviour → Cart Recovery and switch it on.",
          "Set how long a cart must sit idle before it counts as abandoned, from 10 minutes to a day.",
          "Choose who writes the email: Aurevia AI (uses your message quota) or your own wording.",
          "If the AI writes it, add guidance in your words, up to 1,000 characters. If you write it, fill in the subject and intro templates.",
          "Optionally add a second email with a delay of 1 to 72 hours.",
        ],
      },
      {
        heading: "Guardrails",
        steps: [
          "Add a discount code and choose whether it appears on the first email.",
          "Set a minimum cart value so tiny carts don't trigger emails.",
          "Set a frequency cap in days so a returning shopper isn't emailed twice in a week.",
          "Set quiet hours in your timezone. Emails due during quiet hours wait until they end.",
          "Set the sender name shoppers see. The address itself is hosted by Aurevia; pick its name under Settings → Channels → Cart recovery sender.",
        ],
        tips: ["Use the live preview to see the exact email before you enable it. It renders your real product images and prices."],
      },
      {
        heading: "Track results",
        paragraphs: [
          "The tab shows abandoned carts, emails sent, replies, recovered carts and recovered revenue. The carts table filters by status, from active through emailed, replied, recovered, purchased and opted out.",
          "Shopper replies land in Leads → Inbox under Recovery, and the agent answers them in the same thread with the cart still attached.",
        ],
      },
    ],
    related: ["support-tickets-and-the-inbox", "plans-trial-and-message-quota"],
  },
  {
    slug: "connect-whatsapp-and-instagram",
    title: "Connect WhatsApp and Instagram",
    summary: "Put the same agent on your WhatsApp number and Instagram DMs, and moderate comments.",
    category: "Automation & channels",
    minutes: 5,
    updated: "2026-09-26",
    sections: [
      {
        heading: "What the agent does on messaging channels",
        paragraphs: [
          "WhatsApp and Instagram are in early access. Connecting works as described below, but expect rough edges while we verify the channels with live traffic; tell us what you hit and we will fix it fast.",
          "On WhatsApp and Instagram the agent answers questions from your Knowledge Base, searches and recommends products, tracks orders and hands off to a human. It cannot add to a cart there, because the cart lives on your storefront; it sends product links instead.",
        ],
      },
      {
        heading: "WhatsApp",
        steps: [
          "Open Settings → Channels → WhatsApp. You need to be an admin.",
          "Click Connect with Meta. Meta's embedded signup walks you through picking or creating a WhatsApp Business account and phone number.",
          "Back in Aurevia the connection appears in the list. Send a test message to the number and watch it in Live Activity.",
        ],
        tips: ["Meta's 24-hour messaging window applies. If a shopper hasn't written in 24 hours, your reply from the dashboard will be refused with a clear reason."],
      },
      {
        heading: "Instagram",
        steps: [
          "Open Settings → Channels → Instagram and click Connect with Instagram.",
          "Sign in with the Instagram professional account you want to connect and approve the permissions.",
          "DMs to that account now route to the agent and show up in Live Activity.",
        ],
      },
      {
        heading: "Instagram comments",
        paragraphs: [
          "Leads → Comments lists comments on your posts, categorised as question, complaint, spam, praise or other, each with a suggested reply. You can reply publicly, dismiss, hide or delete.",
        ],
        steps: [
          "Turn on Auto-reply to let the agent answer plain product questions it can fully ground in your catalog and knowledge.",
          "Turn on Auto-hide spam to hide comments the agent classifies as spam. Nothing is ever deleted automatically.",
        ],
      },
    ],
    related: ["take-over-a-live-chat", "team-roles-and-seats"],
  },
  {
    slug: "team-roles-and-seats",
    title: "Invite your team and manage roles",
    summary: "Owners, admins and members, what each can do, and how seats work.",
    category: "Account & billing",
    minutes: 3,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Invite someone",
        steps: [
          "Open Settings → Team.",
          "Enter their email and choose Admin or Member.",
          "They get an invite link that expires in 24 hours. Pending invites are listed with a Revoke button.",
          "Invited teammates get a short onboarding: name, password, done.",
        ],
      },
      {
        heading: "What each role can do",
        paragraphs: [
          "Members can watch and take over conversations, work tickets and reply in the inbox. Admins can also train the AI, change its behaviour, manage the catalog, store settings, channels and the team. Only admins and the owner see billing.",
        ],
      },
      {
        heading: "Seats",
        paragraphs: [
          "Each plan includes a number of seats. Pending invites count toward the limit. If you move to a plan with fewer seats, the newest memberships are suspended until you free a seat or upgrade.",
        ],
      },
    ],
    related: ["plans-trial-and-message-quota", "take-over-a-live-chat"],
  },
  {
    slug: "plans-trial-and-message-quota",
    title: "Plans, the free trial and your message quota",
    summary: "How the 14-day trial works, what a message is, and what happens when you run out.",
    category: "Account & billing",
    minutes: 4,
    updated: "2026-09-26",
    sections: [
      {
        heading: "The trial",
        paragraphs: [
          "Every store gets 14 days and 500 shopper messages free, with no charge created in Shopify. Hitting the message cap pauses the widget; the app itself stays usable until the trial ends. Uninstalling and reinstalling does not restart the trial.",
        ],
      },
      {
        heading: "Choose a plan",
        steps: [
          "Open Settings → Subscription. You need to be an admin.",
          "Pick a plan. Each card shows the monthly price, the included messages and seats, and the top-up price.",
          "Approve the charge on Shopify's page. You're returned to Aurevia with the plan active.",
        ],
        tips: [
          "Upgrades apply immediately and are prorated. Downgrades take effect at your next billing date.",
          "Cancelling keeps access until the end of the paid cycle.",
        ],
      },
      {
        heading: "Messages and top-ups",
        paragraphs: [
          "A message is one shopper message the AI replies to. Agent replies you send yourself don't count. The usage meter in Settings → Subscription shows where you are, and a banner appears on the dashboard at 90%.",
          "When the quota is used up the widget pauses, recovery emails switch to your own template wording, and shopper email replies wait in the Inbox for you. Buy a top-up in fixed bundles that never expire, or upgrade.",
        ],
      },
      {
        heading: "Ask Aurevia",
        paragraphs: [
          "The copilot in the dashboard has its own monthly allowance, a quarter of your plan's messages with a minimum of 50, so exploring your data never eats the shopper quota.",
        ],
      },
    ],
    related: ["team-roles-and-seats", "read-the-dashboard-metrics"],
  },
  {
    slug: "read-the-dashboard-metrics",
    title: "Read the dashboard metrics",
    summary: "What each number on Home means, and how Aurevia attributes revenue to the AI.",
    category: "Getting started",
    minutes: 4,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Chat view",
        paragraphs: [
          "Active Chats is the number of sessions open right now. Total Conversations and AI Messages are counts for the selected range. Resolution Rate is the share of conversations that ended without a human. Human Escalations counts handoffs. Sold by AI is revenue and order count from orders the agent influenced.",
          "The heatmap shows conversations per day. Most Asked Questions clusters what shoppers ask into topics with the change versus the previous period; click Update now to re-cluster after a busy day.",
        ],
      },
      {
        heading: "Dashboard view",
        paragraphs: [
          "Revenue Influenced and Orders Influenced total the orders where the agent recommended, added to cart or generated the checkout. Shoppers Assisted counts unique shoppers who chatted. Recommendation Conversion is the share of shown products that were bought. Revenue per Conversation divides influenced revenue by conversations. AI-Assisted Conversion Rate compares sessions with a chat to sessions without.",
          "Top Recommended Products lists how often each product was shown, added to cart and bought, with the revenue it produced.",
        ],
        tips: ["A card that says Not tracked or No data means exactly that. Aurevia never fills a metric with an estimate."],
      },
      {
        heading: "How attribution works",
        paragraphs: [
          "When the agent adds to cart or creates a checkout, the cart is tagged with the chat session. When Shopify sends the order, Aurevia matches the tag and credits that session. Orders placed without any chat are never credited.",
        ],
      },
    ],
    related: ["use-ask-aurevia", "plans-trial-and-message-quota"],
  },
  {
    slug: "use-ask-aurevia",
    title: "Use Ask Aurevia, the merchant copilot",
    summary: "Ask questions about your store in plain English and approve the catalog fixes it proposes.",
    category: "Getting started",
    minutes: 3,
    updated: "2026-09-26",
    sections: [
      {
        heading: "Open it anywhere",
        steps: [
          "Press ⌘K (Ctrl+K on Windows) on any page, or click Ask Aurevia in the sidebar. On Home it's the chat box in the middle of the page.",
          "Ask something like \"Analyse this week's sales\" or \"Which listings are hurting conversion?\". Replies stream in with charts and cited sources where relevant.",
          "Recent chats are kept, so you can reopen an earlier thread from the history icon.",
        ],
      },
      {
        heading: "Approve a proposed change",
        paragraphs: [
          "When you ask it to fix something, the copilot proposes an edit as a card: a product title or description, a collection change, or an uploaded image to attach to a product. Nothing is written to Shopify until you click Confirm.",
        ],
        steps: [
          "Read the proposal. The card shows the product and the new values.",
          "Click Confirm to apply it through Shopify, or Cancel to discard it.",
          "Only admins and the owner can confirm catalog changes.",
        ],
        tips: ["From Products, click Ask Aurevia to fix on any low-scoring product to pre-fill a prompt with that product's issues."],
      },
    ],
    related: ["read-the-dashboard-metrics", "plans-trial-and-message-quota"],
  },
];

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug);
}

export function getHelpSlugs(): string[] {
  return helpArticles.map((a) => a.slug);
}

/** Anchor id for a section heading, stable across renders. */
export function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Articles in reading order: category order, then the order they appear in the file. */
export function getOrderedArticles(): HelpArticle[] {
  return HELP_CATEGORIES.flatMap((c) => helpArticles.filter((a) => a.category === c));
}

export function getAdjacentArticles(slug: string): { prev?: HelpArticle; next?: HelpArticle } {
  const ordered = getOrderedArticles();
  const i = ordered.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  return { prev: ordered[i - 1], next: ordered[i + 1] };
}
