// "The bar we build to" — one store that IS ours, then the sites we point clients
// at when we say "custom". Every card carries a sticker saying which it is
// ("Our build" vs "Inspiration"), and the closing note repeats it, so the collage
// never reads as a portfolio claim.
//
// Screenshots are the sites' own public homepages, captured 2026-09. Each card
// links to the live site. If any brand asks, drop the image and keep the link.

interface Pick {
  slug: string;
  name: string;
  url: string;
  kind: "Shopify" | "Store" | "Web app" | "Website";
  why: string;
  mine?: boolean;
}

const picks: Pick[] = [
  { slug: "sreya-creates", name: "Sreya Creates", url: "https://sreyacreates.com/", kind: "Shopify", mine: true,
    why: "Brand and custom storefront, built by us — one-of-a-kind stock, Pujo drops, gift-wrap at checkout." },
  { slug: "astrid-miyu", name: "Astrid & Miyu", url: "https://www.astridandmiyu.com/", kind: "Shopify",
    why: "Ear-stacking as a navigation idea — the store is organised the way people actually buy." },
  { slug: "completedworks", name: "Completedworks", url: "https://completedworks.com/", kind: "Shopify",
    why: "Jewellery photographed like sculpture. The store gets out of the way and lets the pieces argue." },
  { slug: "graza", name: "Graza", url: "https://www.graza.co/", kind: "Shopify",
    why: "One product, one colour, one voice. Proof that a tight brand beats a big catalogue." },
  { slug: "ghia", name: "Ghia", url: "https://drinkghia.com/", kind: "Shopify",
    why: "Type and colour carry the whole thing. The kind of palette a brand build should hand over." },
  { slug: "bellroy", name: "Bellroy", url: "https://bellroy.com/", kind: "Store",
    why: "Custom-built, not Shopify — but the product pages explain rather than display, and that's the bar." },
  { slug: "linear", name: "Linear", url: "https://linear.app/", kind: "Web app",
    why: "The product is the hero. Dark, fast, nothing decorative that isn't also informative." },
  { slug: "raycast", name: "Raycast", url: "https://www.raycast.com/", kind: "Web app",
    why: "Restraint with one accent. Every section shows the thing working, not a sentence about it." },
  { slug: "calcom", name: "Cal.com", url: "https://cal.com/", kind: "Website",
    why: "Pricing on the page, one CTA, no mystery. The honesty we want on our own pages." },
];

export default function Showcase({ only }: { only?: Pick["kind"][] }) {
  const list = only ? picks.filter((p) => only.includes(p.kind)) : picks;
  return (
    <>
      <div className="showcase">
        {list.map((p) => (
          <a key={p.slug} className={`showcase__card${p.mine ? " showcase__card--mine" : ""}`} href={p.url} target="_blank" rel={p.mine ? "noopener" : "noopener nofollow"}>
            <figure className="showcase__shot">
              {p.mine && <span className="showcase__tag">Our build</span>}
              <img src={p.mine ? "/pixel-and-code/assets/screenshots/shopify/sreya-creates-home.jpg" : `/pixel-and-code/assets/showcase/${p.slug}.jpg`} alt={`${p.name} homepage`} loading="lazy" width={1280} height={800} />
            </figure>
            <div className="showcase__meta">
              <div className="showcase__name">{p.name}<span>{p.kind} &#8599;</span></div>
              <p className="showcase__why">{p.why}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="showcase__note">
        Sreya Creates is ours. The rest are the sites we open on a scoping call to agree what
        &ldquo;custom&rdquo; should mean before a line is drawn &mdash; we rate them, we
        didn&rsquo;t build them. Screenshots are each brand&rsquo;s own public homepage and link to it.
      </p>
    </>
  );
}
