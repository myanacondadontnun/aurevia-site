import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ChannelBadge, type ChannelKind } from "./ChannelIcons";
import { GmailLogo, ShopifyLogo } from "./BrandLogos";
import s from "./channelsBand.module.css";

/**
 * Home: the four places the agent answers. A wide photo of a shopper on their phone, with one frosted card per
 * channel across its top (stacked under the photo on phones). Each card opens that channel on /channels.
 */

const CARDS: { kind: ChannelKind; name: string; line: string; link: string; logo: ReactNode }[] = [
  {
    kind: "store",
    name: "Storefront",
    line: "Sells on every page of your Shopify store.",
    link: "See a store chat",
    logo: <ShopifyLogo className="h-10 w-10" />,
  },
  {
    kind: "whatsapp",
    name: "WhatsApp",
    line: "Answers on your own business number.",
    link: "See a WhatsApp chat",
    logo: <ChannelBadge kind="whatsapp" className="h-10 w-10 rounded-xl" />,
  },
  {
    kind: "email",
    name: "Email",
    line: "Sends cart follow-ups and answers the replies.",
    link: "See an email reply",
    logo: <GmailLogo className="h-[30px] w-10" />,
  },
  {
    kind: "instagram",
    name: "Instagram",
    line: "Replies to DMs with products to tap.",
    link: "See an Instagram DM",
    logo: <ChannelBadge kind="instagram" className="h-10 w-10 rounded-xl" />,
  },
];

export default function Channels() {
  return (
    <section id="channels" className={s.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00665A] mb-3">Channels</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-4 text-foreground">
            One agent, <span className="green-highlight font-fraunces font-normal">wherever they message</span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The same catalogue, the same answers and one inbox for your team, across your store, WhatsApp, Instagram
            and email.
          </p>
        </div>

        <div className={s.wrap}>
          <div className={s.banner}>
            <img
              src="/images/site/channels-home.webp"
              alt="A shopper on the sofa, chatting with a store on their phone"
              className={s.photo}
              loading="lazy"
            />
          </div>

          <ul className={s.cards}>
            {CARDS.map((card) => (
              <li key={card.kind}>
                <Link href={`/channels#${card.kind}`} className={s.card}>
                  <span className={s.logo}>{card.logo}</span>
                  <span className={s.name}>{card.name}</span>
                  <span className={s.line}>{card.line}</span>
                  <span className={s.link}>
                    {card.link}
                    <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
