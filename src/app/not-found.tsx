import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

const helpfulLinks = [
  { href: "/products", label: "Explore the platform" },
  { href: "/solutions", label: "Browse solutions" },
  { href: "/pricing", label: "See pricing" },
  { href: "/resources/blogs", label: "Read the blog" },
  { href: "/contact", label: "Talk to us" },
];

export default function NotFound() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-16 sm:py-24 text-center">
          <p className="font-fraunces italic text-7xl sm:text-8xl text-primary/20 mb-4 select-none" aria-hidden="true">
            404
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-4 leading-tight">
            Even our AI can&apos;t <span className="green-highlight">find this one</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist, moved, or never did. Let&apos;s get you back on
            track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Button asChild className="cta-button rounded-xl px-6 py-3 h-auto text-base border-0">
              <Link href="/home">
                Back to home
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl px-6 py-3 h-auto text-base border-border/60">
              <Link href="/contact">
                <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                Talk to a human
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Or try one of these
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {helpfulLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-[#00CC99]"
                >
                  {l.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
