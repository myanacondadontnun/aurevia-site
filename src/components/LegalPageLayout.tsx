import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
  relatedLinks,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  relatedLinks?: { href: string; label: string }[];
}) {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-10 sm:py-14">
        <Link
          href="/home"
          className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

        {intro ? (
          <p className="text-base text-muted-foreground leading-relaxed mb-10">{intro}</p>
        ) : null}

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-medium text-foreground mb-3">{s.heading}</h2>
              <div className="text-[15px] text-muted-foreground leading-relaxed space-y-3 [&_strong]:text-foreground [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#00CC99] [&_a]:hover:underline">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        {relatedLinks && relatedLinks.length > 0 ? (
          <div className="mt-14 pt-8 border-t border-border/30">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Related
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-[#00CC99] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
