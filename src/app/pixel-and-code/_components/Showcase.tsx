// "The bar we build to" — the work we've shipped and the sites we point clients
// at when we say "custom", in one collage, grouped by what kind of thing it is:
// Shopify stores, websites, web apps. No "our build" / "inspiration" stickers —
// the closing note carries the honesty line instead.
//
// Screenshots are each site's own public homepage, captured 2026-09, and every
// card links to the live site. The aurevia.io card renders the actual site in a
// scaled-down frame instead of a screenshot (`render`), since it's ours.

export type ShowcaseGroup = "Shopify stores" | "Websites" | "Web apps";

interface Pick {
  slug: string;
  name: string;
  url: string;
  group: ShowcaseGroup;
  why: string;
  img?: string;      // defaults to /assets/showcase/<slug>.jpg
  render?: string;   // same-origin URL to render live instead of an image
  external?: boolean; // default true; false for case-study pages inside this section
  tag?: string;      // small mono label next to the name (year, "App Store", …)
}

const picks: Pick[] = [
  // Shopify stores
  { slug: "sreya-creates", name: "Sreya Creates", url: "https://sreyacreates.com/", group: "Shopify stores", tag: "'25",
    img: "/pixel-and-code/assets/screenshots/shopify/sreya-creates-home.jpg",
    why: "Handmade jewellery, Kolkata. Brand and custom storefront: one-of-a-kind stock, Pujo drops, gift-wrap at checkout." },
  { slug: "astrid-miyu", name: "Astrid & Miyu", url: "https://www.astridandmiyu.com/", group: "Shopify stores",
    why: "Ear-stacking as a navigation idea — the store is organised the way people actually buy." },
  { slug: "completedworks", name: "Completedworks", url: "https://completedworks.com/", group: "Shopify stores",
    why: "Jewellery photographed like sculpture. The store gets out of the way and lets the pieces argue." },
  { slug: "graza", name: "Graza", url: "https://www.graza.co/", group: "Shopify stores",
    why: "One product, one colour, one voice. Proof that a tight brand beats a big catalogue." },
  { slug: "ghia", name: "Ghia", url: "https://drinkghia.com/", group: "Shopify stores",
    why: "Type and colour carry the whole thing. The kind of palette a brand build should hand over." },
  { slug: "bellroy", name: "Bellroy", url: "https://bellroy.com/", group: "Shopify stores",
    why: "Product pages that explain rather than display. That's the bar for a product page." },

  // Websites
  { slug: "aurevia", name: "Aurevia", url: "/pixel-and-code/aurevia-io/", group: "Websites", external: false, tag: "aurevia.io",
    render: "/home/",
    why: "AI sales agent for Shopify — named, branded, built and run in-house. This is the live site, not a screenshot." },
  { slug: "mim", name: "Masters in Minds", url: "https://www.mastersinminds.com/", group: "Websites", tag: "'24",
    img: "/pixel-and-code/assets/work/mim.jpg",
    why: "Business consulting. A marketing site designed and built end to end, from copy structure to launch." },

  // Web apps
  { slug: "jcr", name: "JCR Pharma", url: "/pixel-and-code/jcrpharma-co-uk/", group: "Web apps", external: false, tag: "'24",
    img: "/pixel-and-code/assets/screenshots/jcrpharma/hero.png",
    why: "Life-sciences recruitment. Job board, candidate portal, employer portal and the internal dashboard, in six weeks." },
  { slug: "cpq", name: "AI CPQ Agent", url: "https://www.expeditecommerce.com/cpq-software/", group: "Web apps", tag: "'25",
    img: "/pixel-and-code/assets/work/cpq.jpg",
    why: "Expedite Commerce. A Claude-powered quoting agent inside a live enterprise sales stack." },
  { slug: "linear", name: "Linear", url: "https://linear.app/", group: "Web apps",
    why: "The product is the hero. Dark, fast, nothing decorative that isn't also informative." },
];

const order: ShowcaseGroup[] = ["Shopify stores", "Websites", "Web apps"];

function Card({ p }: { p: Pick }) {
  const external = p.external !== false;
  const src = p.img ?? `/pixel-and-code/assets/showcase/${p.slug}.jpg`;
  return (
    <a
      className={`showcase__card${p.render ? " showcase__card--live" : ""}`}
      href={p.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
    >
      <figure className={`showcase__shot${p.render ? " showcase__shot--live" : ""}`}>
        {p.render ? (
          <>
            <iframe
              className="showcase__frame"
              src={p.render}
              title={`${p.name} — live site`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin"
            />
            <span className="showcase__live"><i /> Live</span>
          </>
        ) : (
          <img src={src} alt={`${p.name} homepage`} loading="lazy" width={1280} height={800} />
        )}
      </figure>
      <div className="showcase__meta">
        <div className="showcase__name">{p.name}<span>{p.tag ? `${p.tag} ` : ""}&#8599;</span></div>
        <p className="showcase__why">{p.why}</p>
      </div>
    </a>
  );
}

export default function Showcase({ only }: { only?: ShowcaseGroup[] }) {
  const groups = (only ?? order).filter((g) => order.includes(g));
  return (
    <>
      {groups.map((g) => {
        const list = picks.filter((p) => p.group === g);
        if (!list.length) return null;
        return (
          <div className="showcase__group" key={g}>
            <h3 className="showcase__heading"><span className="px" /> {g}<small>{list.length}</small></h3>
            <div className="showcase">
              {list.map((p) => <Card p={p} key={p.slug} />)}
            </div>
          </div>
        );
      })}
      <p className="showcase__note">
        A mix of what we&rsquo;ve shipped and the sites we open on a scoping call to agree what
        &ldquo;custom&rdquo; should mean before a line is drawn. Screenshots are each site&rsquo;s own
        public homepage and link to it.
      </p>
    </>
  );
}
