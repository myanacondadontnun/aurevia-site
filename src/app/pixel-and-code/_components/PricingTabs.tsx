// "Pick the shape that fits" as a tabbed price list: one nav pill per service,
// two or three packages each, every one with a "from" price. Numbers are pegged
// to UK market rates for the scope (theme-based store builds ~£3k, custom stores
// £8–20k, agencies "from £5k", MVP studios $8.9k–$24.9k) and sit just under the
// agency floor. script.js (initTabs) switches panels; the first is open without JS.
interface Pkg { name: string; who: string; price: string; time: string; inc: string[]; lead?: boolean; }
interface Tab { key: string; label: string; intro: string; pkgs: Pkg[]; }

const tabs: Tab[] = [
  {
    key: "shopify", label: "Shopify", intro: "Brand and store, or either on its own. Every package is fixed price and you own the store, the files and the theme from week one.",
    pkgs: [
      { name: "Brand only", who: "You have a store, you need an identity", price: "from £1,900", time: "3 weeks",
        inc: ["Logo & wordmark with every export", "Colour & type system, written down", "Packaging templates, print-ready", "A short brand guide your developer can build against"] },
      { name: "Brand + custom store", who: "Launching or relaunching on Shopify", price: "from £4,900", time: "6 weeks", lead: true,
        inc: ["Everything in Brand only", "Custom Shopify theme on your own store", "Collection & product pages built to sell", "Apps wired in: reviews, email, analytics, shipping", "Launch, first-orders watch and full handover"] },
      { name: "Store only", who: "You like your brand, the store lets it down", price: "from £2,900", time: "3–4 weeks",
        inc: ["Custom theme around the identity you have", "Migration on your live store, no downtime", "Product pages, cart and checkout flow", "Handover with theme code and a walkthrough"] },
    ],
  },
  {
    key: "website", label: "Website", intro: "Marketing sites that load fast and say one thing well. Fixed scope, fixed price, live in weeks not months.",
    pkgs: [
      { name: "Landing page", who: "One offer, one page, built for ads", price: "from £1,200", time: "1–2 weeks",
        inc: ["One page, designed around one action", "Copy structure, form and tracking events", "Fast on mobile, tested at four widths", "Editable in your CMS or as code, your call"] },
      { name: "Marketing site", who: "The site that sells the business", price: "from £2,400", time: "2–3 weeks", lead: true,
        inc: ["Up to eight pages designed and built", "Brand applied properly, not bolted on", "SEO basics, analytics and forms wired in", "Handover with docs and a recorded walkthrough"] },
    ],
  },
  {
    key: "webapp", label: "Web app", intro: "Software built around your operation — dashboards, portals, marketplaces, job boards. Milestone payments, weekly demos, your repos from day one.",
    pkgs: [
      { name: "MVP", who: "A first product real users can sign up for", price: "from £7,900", time: "6 weeks", lead: true,
        inc: ["Scope and clickable prototype in week one", "Auth, roles, payments and admin", "A working demo link every Friday", "Deployed to your cloud, code in your repos"] },
      { name: "Production platform", who: "Portals, marketplaces, internal systems", price: "from £14,900", time: "8–10 weeks",
        inc: ["Everything in MVP", "Multiple user types with separate access", "Integrations with the tools you already run", "Monitoring, docs and a full handover"] },
    ],
  },
  {
    key: "ai", label: "AI automation", intro: "One workflow at a time, plugged into the systems you already use, with a human kept in the loop where it matters. Audit first, so the build is scoped on your data, not a demo.",
    pkgs: [
      { name: "Automation audit", who: "Find the hours worth removing", price: "£490", time: "1 week",
        inc: ["Map the workflow and its data", "Rank what's automatable by hours saved", "A written plan with fixed prices per automation", "Credited against the build if you go ahead"] },
      { name: "Automation build", who: "One workflow, end to end", price: "from £1,900", time: "2–4 weeks", lead: true,
        inc: ["Built on current Claude models", "CRM / API integrations, monitoring, alerts", "Human-in-the-loop where it matters", "Judged on the hours it removes"] },
      { name: "AI agent", who: "Conversational, inside your product or stack", price: "from £6,900", time: "4–8 weeks",
        inc: ["Retrieval over your own data", "Tool use against your systems", "Evaluation set and guardrails", "Deployed, watched, handed over"] },
    ],
  },
];

export default function PricingTabs() {
  return (
    <div className="ptabs" data-tabs>
      <div className="ptabs__nav" role="tablist" aria-label="Choose a service">
        {tabs.map((t, i) => (
          <button key={t.key} type="button" role="tab" className={`ptabs__tab${i === 0 ? " is-active" : ""}`} data-tab={t.key} aria-selected={i === 0} aria-controls={`ptab-${t.key}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.key} id={`ptab-${t.key}`} role="tabpanel" className={`ptabs__panel${i === 0 ? " is-active" : ""}`} data-panel={t.key} hidden={i !== 0}>
          <p className="ptabs__intro">{t.intro}</p>
          <div className={`ptabs__grid ptabs__grid--${t.pkgs.length}`}>
            {t.pkgs.map((p, i) => {
              const from = p.price.startsWith("from ");
              const amount = from ? p.price.slice(5) : p.price;
              return (
                <article className={`qs${p.lead ? " qs--lead" : ""}`} key={p.name}>
                  <header className="qs__head">
                    <span className="qs__ref">Quote &middot; {t.label} &middot; {p.name}</span>
                    <span className="qs__no">No. 0{i + 1}</span>
                  </header>
                  <h3 className="qs__name">{p.name}</h3>
                  <span className="qs__who">{p.who}</span>
                  <ol className="qs__lines">
                    {p.inc.map((x) => (
                      <li key={x}><span>{x}</span><i aria-hidden="true" /><b>incl.</b></li>
                    ))}
                  </ol>
                  <div className="qs__total">
                    <span className="qs__total-label">{from ? "Total, from" : "Total"}</span>
                    <b className="qs__amount"><em>{amount}</em></b>
                    <small>{p.time} &middot; fixed price</small>
                  </div>
                  <span className="qs__stamp" aria-hidden="true">Fixed</span>
                  {p.lead && <span className="qs__stamp qs__stamp--lead" aria-hidden="true">Recommended</span>}
                  <a href="#contact" className="qs__sign">Get a fixed quote <i aria-hidden="true">&#8594;</i></a>
                </article>
              );
            })}
          </div>
        </div>
      ))}
      <p className="models__note">Every price is a &ldquo;from&rdquo; for the scope described. After a free 30-minute call you get a written scope and a fixed number within one business day, whether or not you go ahead. Prices ex VAT.</p>
    </div>
  );
}
