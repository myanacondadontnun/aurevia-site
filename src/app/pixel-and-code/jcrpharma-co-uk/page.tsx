import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";

export const metadata: Metadata = {
  title: "JCR Pharma — Life Sciences Recruitment Platform | Pixel & Code",
  description:
    "How Pixel & Code built JCR Pharma's full recruitment platform — job board, admin dashboard and automated email — on React + Vite in six weeks, cutting time-to-hire by 50%.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/jcrpharma-co-uk/" },
  openGraph: {
    type: "article",
    title: "JCR Pharma — Life Sciences Recruitment Platform | Pixel & Code",
    description: "A six-week build: the full job platform, admin dashboard and automated email behind JCR Pharma's life-sciences recruitment.",
    images: ["https://aurevia.io/pixel-and-code/assets/logos/jcrpharma.png"],
  },
  twitter: { card: "summary" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "JCR Pharma — Life Sciences Recruitment Platform",
  creator: { "@type": "Organization", name: "Pixel & Code" },
  about: "Life sciences & biometrics recruitment job platform",
  url: "https://aurevia.io/pixel-and-code/jcrpharma-co-uk/",
  image: "https://aurevia.io/pixel-and-code/assets/logos/jcrpharma.png",
};

export default function JcrPharmaCaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Chrome />

      <PxcNav
        logoHref="/pixel-and-code/"
        links={[
          { href: "/pixel-and-code/shopify-brand-building/", label: "Shopify" },
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
        ]}
        ctaHref="https://calendly.com/km-kkishal/30min"
        ctaLabel="Book a call"
        ctaExternal
      />

      <main id="top">
        {/* CASE STUDY HERO */}
        <section className="case-hero section">
          <a href="/pixel-and-code/#work" className="case-breadcrumb reveal-up">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to work
          </a>
          <div className="case-hero__inner">
            <span className="case-eyebrow reveal-up"><span className="px"></span> Recruitment Tech · Job Platform · 2024</span>
            <h1 className="case-title reveal-up">JCR Pharma</h1>
            <p className="case-summary reveal-up">
              JCR Pharma recruits for one of the narrowest, most technical corners of hiring — biostatistics,
              clinical data management, statistical programming, data science, and bioinformatics — where a
              precise match matters more than a big pile of CVs. We built the platform that runs that whole
              process: job board, admin dashboard, and automated email, on React + Vite, in six weeks.
            </p>
            <div className="case-meta reveal-up">
              <div className="case-meta__item">
                <span className="case-meta__label">Role</span>
                <span className="case-meta__value">Full platform build</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Stack</span>
                <span className="case-meta__value">React + Vite</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Timeline</span>
                <span className="case-meta__value">~6 weeks</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Hosting</span>
                <span className="case-meta__value">Free-tier, low-ops</span>
              </div>
            </div>
            <div className="case-actions reveal-up">
              <a className="btn btn--primary" href="https://jcrpharma.co.uk" target="_blank" rel="noopener">
                <span>Visit jcrpharma.co.uk</span>
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a className="btn btn--ghost" href="https://jcrpharma.co.uk/find-jobs" target="_blank" rel="noopener"><span>Find Jobs ↗</span></a>
              <a className="btn btn--ghost" href="https://www.linkedin.com/company/jcr-pharma/" target="_blank" rel="noopener"><span>LinkedIn ↗</span></a>
            </div>
          </div>
        </section>

        <div className="case-shot-full">
          <figure className="case-shot reveal-up">
            <img src="/pixel-and-code/assets/screenshots/jcrpharma/hero.png" alt="JCR Pharma homepage" loading="eager" />
          </figure>
        </div>

        {/* THE PROBLEM */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> The problem</span>
            <h2 className="section__title" data-split>Specialist recruiting, run by hand.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, fontSize: "1.1rem" }}>
            JCR Pharma&apos;s whole edge is depth, not volume — shortlisting five to seven candidates who
            genuinely fit a biotech or pharma team&apos;s technical needs, rather than flooding employers with
            CVs. But running that consultative process — job postings, candidate intake, screening,
            employer communication — without dedicated software meant more manual coordination for every
            search, and a slower, harder-to-track hiring pipeline for clients across the UK, US, and Europe.
          </p>
        </section>

        {/* WHAT WE BUILT */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we built</span>
            <h2 className="section__title">A job board, both portals, and the admin behind them.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            We built JCR Pharma a full two-sided job platform on React and Vite — fast to load, easy to
            extend — covering employers, candidates, and the JCR Pharma team itself, deployed on free-tier
            hosting to keep ongoing operating costs close to zero for a lean recruitment business.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Public</span>
              <h3>The job board</h3>
              <p>A searchable board of live roles, filtered by specialism, contract type, seniority and work mode, with featured listings the team controls.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Employers</span>
              <h3>Post &amp; Manage Roles</h3>
              <p>Employers post openings across biostatistics, clinical data, and bioinformatics, and track applicants in one place.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Candidates</span>
              <h3>Job Search &amp; Apply</h3>
              <p>Candidates browse and apply to specialised life-sciences roles directly through the platform.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Internal</span>
              <h3>Admin Dashboard</h3>
              <p>A dedicated dashboard for the JCR Pharma team to manage listings, candidates, and communications end to end.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Automation</span>
              <h3>Automated Email</h3>
              <p>New applications, status changes, and job alerts go out automatically — nothing chased down manually.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Access</span>
              <h3>Secure Admin Login</h3>
              <p>A dedicated, access-controlled login keeps day-to-day platform management separate from public job seekers.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Ops</span>
              <h3>Low-Cost Hosting</h3>
              <p>Runs on free-tier infrastructure, so the platform&apos;s overhead doesn&apos;t eat into a lean team&apos;s margins.</p>
            </article>
          </div>

          <div className="case-shot-grid">
            <figure className="case-shot reveal-up"><img src="/pixel-and-code/assets/screenshots/jcrpharma/jobs-list.png" alt="JCR Pharma job search with specialism, contract, seniority and work-mode filters" loading="lazy" /></figure>
            <figure className="case-shot reveal-up"><img src="/pixel-and-code/assets/screenshots/jcrpharma/blogs.png" alt="JCR Pharma insights and blog listing" loading="lazy" /></figure>
          </div>
        </section>

        <div className="case-shot-full">
          <figure className="case-shot reveal-up">
            <img src="/pixel-and-code/assets/screenshots/jcrpharma/jobs-featured.png" alt="JCR Pharma featured opportunities on the homepage" loading="lazy" />
          </figure>
        </div>

        {/* THE ADMIN */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Behind the scenes</span>
            <h2 className="section__title">The admin they run it from.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            Every public page above is edited from one internal dashboard: jobs are posted, featured and
            archived; applications arrive with CVs attached and move through a status pipeline; blog posts
            are grouped and published. No developer needed for day-to-day changes.
          </p>
          <div className="case-shot-grid case-shot-grid--3">
            <figure className="case-shot reveal-up"><img src="/pixel-and-code/assets/screenshots/jcrpharma/admin-jobs.png" alt="JCR Pharma admin — job board with status, featured flag and applicant counts" loading="lazy" /></figure>
            <figure className="case-shot reveal-up"><img src="/pixel-and-code/assets/screenshots/jcrpharma/admin-applications.png" alt="JCR Pharma admin — candidate applications with CV download and status" loading="lazy" /></figure>
            <figure className="case-shot reveal-up"><img src="/pixel-and-code/assets/screenshots/jcrpharma/admin-blogs.png" alt="JCR Pharma admin — blog management with featured and group toggles" loading="lazy" /></figure>
          </div>
        </section>

        {/* IMPACT */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Impact</span>
            <h2 className="section__title" data-split>Faster hiring, less overhead.</h2>
          </div>
          <div className="stats__grid" style={{ marginBottom: "2rem" }}>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="50">0</span>%</div>
              <div className="stat__label">Cut in time-to-hire</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="6">0</span>wk</div>
              <div className="stat__label">Idea to live platform</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num">2</div>
              <div className="stat__label">Sides served: employers &amp; candidates</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num">$0</div>
              <div className="stat__label">Monthly hosting cost</div>
            </div>
          </div>
          <p className="case-note reveal-up">
            By centralising job posting, candidate intake, and communication into one platform with
            automated email, JCR Pharma cut its overall time-to-hire by roughly 50% and made day-to-day
            recruitment operations dramatically simpler to manage.
          </p>

          <div className="case-pullquote reveal-up">
            <span className="case-pullquote__mark" aria-hidden="true">&ldquo;</span>
            <p>On launch day, JCR Pharma&apos;s founder posted on LinkedIn that the team was &quot;really proud&quot; to
               share the new site — built to make it simple to browse and apply for live roles, read the
               company&apos;s blog, understand their recruitment process end to end, and find every social
               channel in one place.</p>
            <cite><b>James Carpenter</b>, Founder, JCR Pharma, via LinkedIn</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner case-cta">
            <span className="section__label reveal-up"><span className="px"></span> Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Need a platform, not a prototype?</h2>
            <p className="contact__sub reveal-up">
              We build two-sided marketplaces and job boards that ship fast and run lean. Tell us what you&apos;re building.
            </p>
            <div className="hero__actions reveal-up" style={{ justifyContent: "center" }}>
              <a href="/pixel-and-code/#contact" className="btn btn--primary">
                <span>Start a project</span>
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/pixel-and-code/#work" className="btn btn--ghost"><span>See more work</span></a>
            </div>
          </div>
        </section>
      </main>

      <div className="case-crosslink">
        <a href="/pixel-and-code/#work">↑ All work</a>
        <a href="/pixel-and-code/aurevia-io/">Next case study: Aurevia →</a>
      </div>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/#services", label: "Services" },
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/about/", label: "Who we are" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
