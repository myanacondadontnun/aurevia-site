import Link from "next/link";

const link = "text-sky-400 underline decoration-sky-400/40 underline-offset-2 hover:text-[#02DFA6] hover:decoration-[#02DFA6]";

function ReviewVisual({ caption }: { caption: string }) {
  return (
    <>
      <div className="my-5 overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-background shadow-md">
        <div className="flex aspect-[16/9] max-h-[220px] items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(2,223,166,0.12)_0%,_transparent_65%)] sm:max-h-[280px]">
          <div className="rounded-2xl border border-white/10 bg-black/30 px-8 py-6 text-center backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-[#02DFA6]/90">Product preview</p>
            <p className="mt-2 text-sm font-light text-muted-foreground">Interface mock · illustrative</p>
          </div>
        </div>
      </div>
      <p className="text-xs font-light leading-relaxed text-muted-foreground/90">{caption}</p>
    </>
  );
}

export default function DetailedReviews() {
  return (
    <div className="space-y-16">
      <p className="text-base font-light leading-relaxed text-muted-foreground">
        Below we use the same structure as long-form listicles: a visual, a candid &quot;why it&apos;s
        here,&quot; pros, caveats, and pricing — then{" "}
        <Link href="#full-landscape" className={link}>
          the full landscape
        </Link>{" "}
        for power readers who want every vendor in one pass.
      </p>

      {/* 1. Aurevia */}
      <section id="review-aurevia" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">1.</span>{" "}
          <Link href="/products/shopify/" className={link}>
            Aurevia.io
          </Link>
        </h3>
        <ReviewVisual caption="Illustrative panel: Aurevia positions as a Shopify-native sales co-pilot with guided checkout and upsell surfaces." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          Aurevia is built around one job: turn paid sessions into revenue. It combines proactive signals with
          catalog-aware answers and a guided path through checkout — not just hyperlinks to PDPs.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            It is the only entrant here pairing <strong className="text-white/90">behavioral engagement</strong>{" "}
            with <strong className="text-white/90">cart, checkout, and post-purchase upsells</strong> while keeping
            entry economics unusually accessible for SMBs.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>
            <Link href="/products/recommendations/" className={link}>
              Product recommendations
            </Link>{" "}
            grounded in live Shopify data — fewer &quot;hallucinated SKU&quot; moments that erode trust.
          </li>
          <li>
            <Link href="/products/cart-recovery/" className={link}>
              Cart recovery
            </Link>{" "}
            thinking is baked into the flow, not bolted on as a separate app.
          </li>
          <li>
            Attribution plus experimentation: pair reads with our{" "}
            <Link href="/resources/blogs/shopify-ecommerce-funnel-analytics/" className={link}>
              funnel analytics
            </Link>{" "}
            primer when you wire events end-to-end.
          </li>
          <li>
            Free pilot tier lowers risk while you validate lift — see{" "}
            <Link href="/pricing/" className={link}>
              pricing
            </Link>{" "}
            for positioning vs incumbents.
          </li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Newer brand vs helpdesk giants — procurement may ask for logo comfort; win on proof and speed.</li>
          <li>
            You&apos;ll want clean catalog/variant hygiene — same requirement as any serious merchandising AI.
          </li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> Free pilot (200 AI messages/mo) and an
          aggressive Pro tier (~$9.99/mo) described in our research narrative — confirm current numbers on the{" "}
          <a href="https://apps.shopify.com/aurevia-io" className={link} target="_blank" rel="noopener noreferrer">
            Shopify listing
          </a>
          .
        </p>
      </section>

      {/* 2. Zipchat */}
      <section id="review-zipchat" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">2.</span> Zipchat AI
        </h3>
        <ReviewVisual caption="Illustrative panel: Zipchat emphasizes proactive, revenue-focused messaging and strong merchant ratings." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          Zipchat is the clearest &quot;sales agent&quot; peer: proactive triggers, solid catalog sync, and a
          narrative built around conversion — a strong benchmark for the category.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            It proved merchants will pay for autonomous, behavioral AI — and raised the bar for what
            &quot;proactive&quot; means in Shopify.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>High marks publicly (~4.8/5) for turning sessions into sales — credible social proof.</li>
          <li>WhatsApp and cross-sell paths suit growth brands running aggressive paid acquisition.</li>
          <li>Strong fit if your bottleneck is engagement, not helpdesk ticket throughput.</li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>No permanent free tier and a $49/mo floor — harder for side projects to experiment.</li>
          <li>Checkout orchestration is lighter vs a guided handoff all the way through payment.</li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> From $49/mo — verify on Zipchat&apos;s site
          before budgeting; model payback with our{" "}
          <Link href="/resources/roi-calculator/" className={link}>
            ROI calculator
          </Link>
          .
        </p>
      </section>

      {/* 3. Tidio */}
      <section id="review-tidio" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">3.</span> Tidio (Lyro)
        </h3>
        <ReviewVisual caption="Illustrative panel: Tidio pairs live chat with Lyro AI for FAQs, policies, and operator handoff." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          Tidio is the friendly default for SMBs: live chat, Lyro, and automation in one surface — great when you
          still have humans in the loop.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            Massive adoption, multilingual support, and a credible path to deflect repetitive questions — as long
            as you understand the reactive posture.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Lyro Guidance helps keep tone aligned with scraped help content.</li>
          <li>Flows and channels make it a capable CX hub for lean teams.</li>
          <li>
            If your pain is volume FAQs, also read{" "}
            <Link href="/resources/blogs/reduce-repetitive-support-questions-shopify/" className={link}>
              reducing repetitive support questions
            </Link>
            .
          </li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Per-conversation pricing can spike during BFCM — watch usage caps.</li>
          <li>Reactive design: shoppers who never open chat may still bounce silently.</li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> Starter around $24.17/mo with Lyro add-ons
          and per-conversation costs — confirm on Tidio pricing before you commit.
        </p>
      </section>

      {/* 4. Gorgias */}
      <section id="review-gorgias" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">4.</span> Gorgias
        </h3>
        <ReviewVisual caption="Illustrative panel: Gorgias shines when agents live inside tickets and Shopify order actions." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          Gorgias is the operational backbone for many scaling brands — especially when post-purchase complexity is
          the daily reality.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            If you need deep order edits, refunds, and SLA-driven workflows, Gorgias remains a category anchor —
            even when front-end sales automation is not its hero story.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Agents resolve issues without tab-hopping — massive for high-volume teams.</li>
          <li>AI assists drafting and automation inside a mature ticketing model.</li>
          <li>
            Pair with broader CX strategy — our{" "}
            <Link href="/resources/blogs/24-7-ai-support-after-hours-sales/" className={link}>
              after-hours support
            </Link>{" "}
            article covers staffing tradeoffs.
          </li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Learning curve and cost ramp as tickets and AI add-ons scale.</li>
          <li>Automation rates (~60% support) trail specialized conversational stacks per public comparisons.</li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> Entry marketing ~$10/mo but real stacks climb
          with volume — model fully loaded cost before you compare to sales-first tools.
        </p>
      </section>

      {/* 5. Re:amaze */}
      <section id="review-reamaze" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">5.</span> Re:amaze
        </h3>
        <ReviewVisual caption="Illustrative panel: Re:amaze targets teams wanting a unified inbox without enterprise bloat." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          Re:amaze sits in the pragmatic middle: chat, light bots, and Shopify context for teams that outgrew a
          bare widget but do not want Gorgias-scale ops.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            Strong ratings and a straightforward inbox story make it a credible stepping stone — especially for
            SMB multi-channel support.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Unified inbox with Shopify order sync keeps context tight.</li>
          <li>Automation templates help teams move faster without a full R&amp;D org.</li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Still skews helpdesk over autonomous GMV — expect to add sales-specific tooling elsewhere.</li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> From ~$26.10/mo — confirm seats/channels on
          their pricing page.
        </p>
      </section>

      {/* 6. VanChat */}
      <section id="review-vanchat" className="scroll-mt-28">
        <h3 className="text-xl font-normal text-white sm:text-2xl">
          <span className="text-[#02DFA6]">6.</span> VanChat
        </h3>
        <ReviewVisual caption="Illustrative panel: VanChat highlights buyer intent and AI-first shopping assistance." />
        <p className="mt-6 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          VanChat represents the newer wave of AI shopping assistants: intent-aware, conversational, and aimed at
          closing without a human — a useful foil to legacy chat widgets.
        </p>
        <p className="mt-4">
          <strong className="font-medium text-white">Why it&apos;s on the list:</strong>{" "}
          <span className="font-light text-muted-foreground">
            It signals where the market experiments beyond helpdesks — worth understanding alongside Zipchat and
            Aurevia.
          </span>
        </p>
        <p className="mt-4 font-medium text-white">What&apos;s great about it:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Free tier lowers friction for stores testing AI shopping experiences.</li>
          <li>Buyer-intent framing can improve relevance vs generic scripts.</li>
          <li>
            For positioning AI assistants more broadly, see{" "}
            <Link href="/resources/blogs/ecommerce-ai-shopping-assistant-2026/" className={link}>
              ecommerce AI shopping assistants in 2026
            </Link>
            .
          </li>
        </ul>
        <p className="mt-4 font-medium text-white">What to keep in mind:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <li>Upsell customization and stack consolidation may lag apex platforms.</li>
          <li>Always validate inventory grounding — hallucinated stock is a trust killer.</li>
        </ul>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-medium text-white">Pricing:</strong> Free tier advertised — confirm feature gates
          and paid ladders on VanChat&apos;s site.
        </p>
      </section>
    </div>
  );
}
