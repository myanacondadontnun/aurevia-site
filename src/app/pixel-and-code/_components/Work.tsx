// "Things we've built" in the showcase's collage dialect — tilt, lift, a rotated
// sticker — except here every sticker is a real outcome and every screenshot is
// work we actually did. Sits on the ink band so the white cards pop.
interface Job {
  slug: string; name: string; href: string; external?: boolean;
  what: string; sticker: string; img?: string; logo?: string; year: string;
}

const jobs: Job[] = [
  { slug: "sreya", name: "Sreya Creates", href: "https://sreyacreates.com/", external: true, year: "'25",
    what: "Handmade jewellery, Kolkata · brand + custom Shopify storefront",
    sticker: "Brand + store", img: "/pixel-and-code/assets/screenshots/shopify/sreya-creates-home.jpg" },
  { slug: "aurevia", name: "Aurevia", href: "/pixel-and-code/aurevia-io/", year: "'25",
    what: "AI sales agent for Shopify · our own product, named, branded and built in-house",
    sticker: "Live on the App Store", img: "/pixel-and-code/assets/screenshots/aurevia/shopify_install_page.png" },
  { slug: "jcr", name: "JCR Pharma", href: "/pixel-and-code/jcrpharma-co-uk/", year: "'24",
    what: "Life-sciences recruitment · candidate portal, employer portal, internal dashboard",
    sticker: "3 portals · 6 weeks", img: "/pixel-and-code/assets/screenshots/jcrpharma/hero.png" },
  { slug: "mim", name: "Masters in Minds", href: "https://www.mastersinminds.com/", external: true, year: "'24",
    what: "Business consulting · marketing site designed and built end to end",
    sticker: "Website", img: "/pixel-and-code/assets/work/mim.jpg" },
  { slug: "cpq", name: "AI CPQ Agent", href: "https://www.expeditecommerce.com/cpq-software/", external: true, year: "'25",
    what: "Expedite Commerce · a Claude-powered quoting agent inside a live enterprise sales stack",
    sticker: "AI automation", img: "/pixel-and-code/assets/work/cpq.jpg" },
];

export default function Work() {
  return (
    <div className="showcase showcase--work">
      {jobs.map((j) => (
        <a key={j.slug} className="showcase__card" href={j.href} target={j.external ? "_blank" : undefined} rel={j.external ? "noopener" : undefined}>
          <figure className={`showcase__shot${j.logo ? " showcase__shot--logo" : ""}`}>
            <span className="showcase__tag showcase__tag--proof">{j.sticker}</span>
            {j.img
              ? <img src={j.img} alt={j.name} loading="lazy" width={1280} height={800} />
              : <img src={j.logo} alt={j.name} loading="lazy" className="showcase__logo" />}
          </figure>
          <div className="showcase__meta">
            <div className="showcase__name">{j.name}<span>{j.year} &#8599;</span></div>
            <p className="showcase__why">{j.what}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
