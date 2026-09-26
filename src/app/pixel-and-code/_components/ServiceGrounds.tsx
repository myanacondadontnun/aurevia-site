// "Three ways to work with us" as the page's three grounds, side by side: the
// flagship on ink at double width, web apps on mint, AI on white. Each panel is
// one link — the whole surface is the CTA — with the section's watermark
// number, the showcase's rotated sticker, and a mono terms pill. Hierarchy comes
// from ground and width, not from a border or a bigger icon.
//
// Terms pills carry "from" prices pegged to UK market rates (theme builds ~£3k,
// custom stores £8–20k, agencies "from £5k"); the full packages live in PricingTabs.
const services = [
  {
    ground: "ink", n: "01", href: "/pixel-and-code/",
    tag: "What we're known for", title: "Shopify brand building",
    desc: "A brand built from nothing — logo, colour, type, packaging and product design — and a custom Shopify storefront built to match. Already trading? We rebuild the store around the brand you have.",
    terms: "From £4,900 · live in 6 weeks", cta: "See how we build Shopify brands",
  },
  {
    ground: "mint", n: "02", href: "/pixel-and-code/web-app-development/",
    title: "Websites & web apps",
    desc: "Software built around your operation — dashboards, portals, marketplaces and job boards — plus the marketing site that sells it.",
    terms: "Sites from £2,400 · apps from £7,900", cta: "See how we build platforms",
  },
  {
    ground: "white", n: "03", href: "/pixel-and-code/ai-automation/",
    title: "AI automation",
    desc: "Practical AI plugged into the systems you already run, so the repetitive work stops landing on someone's desk.",
    terms: "Audit £490 · automations from £1,900", cta: "See how we build AI",
  },
];

export default function ServiceGrounds() {
  return (
    <div className="grounds">
      {services.map((s) => (
        <a className={`ground ground--${s.ground}`} href={s.href} key={s.n}>
          <span className="ground__num" aria-hidden="true">{s.n}</span>
          {s.tag && <span className="ground__tag">{s.tag}</span>}
          <h3 className="ground__title">{s.title}</h3>
          <p className="ground__desc">{s.desc}</p>
          <span className="ground__foot">
            <span className="ground__terms">{s.terms}</span>
            <span className="ground__cta">{s.cta} <i aria-hidden="true">&#8599;</i></span>
          </span>
        </a>
      ))}
    </div>
  );
}
