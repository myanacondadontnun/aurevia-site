import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChannelBadge } from "./ChannelIcons";
import { CHANNELS } from "@/lib/channels";

/** Home: the four channels the agent answers on, linking to /channels. */
export default function Channels() {
  return (
    <section id="channels" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">Channels</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-4 text-foreground">
            One agent, <span className="green-highlight">wherever they message</span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The same catalogue, the same answers and one inbox for your team, across your store, WhatsApp, Instagram
            and email.
          </p>
        </div>

        <ul className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel) => (
            <li key={channel.kind}>
              <Link
                href={`/channels#${channel.kind}`}
                className="block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[#0b3c2f]"
              >
                <ChannelBadge kind={channel.kind} />
                <h3 className="mt-5 text-lg font-semibold text-foreground">{channel.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{channel.short}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/channels"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00795c] hover:text-foreground transition-colors"
          >
            How each channel works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
