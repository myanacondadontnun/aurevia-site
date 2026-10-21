"use client";

/**
 * /partners: the two programs (agency, referral) as cards, then whatever the page puts between them and the form
 * (how it works), then the application form. Picking a card sets the form's program and scrolls to it.
 */

import { useRef, useState, type ReactNode } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import p from "@/components/partners/partners.module.css";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec";

type ProgramId = "agency" | "referral";

const PROGRAMS: {
  id: ProgramId;
  name: string;
  who: string;
  /** The commercial headline: the figure, a word before it, and how long it runs. */
  lead?: string;
  figure: string;
  term: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "agency",
    name: "Agency partner",
    who: "Shopify agencies and freelancers",
    lead: "Up to",
    figure: "30%",
    term: "Recurring, for as long as the store stays",
    body: "You build and run stores for clients. Add Aurevia to the stores you manage and earn on every one, with our help on setup.",
    points: ["Commission on every client store", "Onboarding help for each store", "A direct line to our team"],
  },
  {
    id: "referral",
    name: "Referral partner",
    who: "Consultants, creators and communities",
    figure: "20%",
    term: "Of the monthly subscription, for 18 months",
    body: "You talk to Shopify merchants. Point them to Aurevia and earn on every store you refer. No client work needed.",
    points: ["Earn on every store you refer", "No client work required", "No cap on referrals"],
  },
];

const STORE_COUNTS = ["None yet", "1 to 5", "6 to 20", "More than 20"];

const emptyForm = { name: "", email: "", company: "", website: "", stores: "", notes: "" };

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export default function PartnerPrograms({ between }: { between?: ReactNode }) {
  const formRef = useRef<HTMLElement>(null);
  const [program, setProgram] = useState<ProgramId>("agency");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const choose = (id: ProgramId) => {
    setProgram(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const programName = PROGRAMS.find((x) => x.id === program)?.name ?? program;
    try {
      const body = new URLSearchParams();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("company", form.company);
      body.append("subject", `Partner application: ${programName}`);
      body.append(
        "message",
        [
          `Program: ${programName}`,
          `Website: ${form.website || "None"}`,
          `Shopify stores they work with: ${form.stores || "None"}`,
          form.notes ? `Notes: ${form.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n")
      );
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Server error ${response.status}`);
      trackEvent("partner_application_submitted", { form_name: "partners", program });
      setStatus("sent");
    } catch (err) {
      trackEvent("partner_application_error", {
        form_name: "partners",
        error_message: err instanceof Error ? err.message : "Unknown error",
      });
      setError("That didn't send. Please try again, or email sales@aurevia.io.");
      setStatus("idle");
    }
  };

  return (
    <>
      {/* ─── The programs ─── */}
      <section id="programs" className={p.section}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={p.h2}>Two ways to partner</h2>
          <div className={p.programs}>
            {PROGRAMS.map((x) => {
              const on = x.id === program;
              return (
                <article key={x.id} className={cx(p.program, on && p.programOn)}>
                  <span className={p.eyebrow}>{x.who}</span>
                  <h3 className={p.programName}>{x.name}</h3>
                  <p className={p.figureRow}>
                    {x.lead ? <span className={p.figureLead}>{x.lead}</span> : null}
                    <span className={p.figure}>{x.figure}</span>
                  </p>
                  <p className={p.term}>{x.term}</p>
                  <p className={p.programBody}>{x.body}</p>
                  <ul className={p.points}>
                    {x.points.map((pt) => (
                      <li key={pt}>
                        <Check aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => choose(x.id)} className={on ? p.primary : p.secondary}>
                    Apply as {x.name.toLowerCase()} {on ? <ArrowRight aria-hidden="true" /> : null}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {between}

      {/* ─── Apply ─── */}
      <section ref={formRef} id="apply" className={cx(p.section, p.apply)}>
        <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${p.applyGrid}`}>
          <div>
            <h2 className={p.h2}>Tell us how you work with Shopify stores</h2>
            <p className={p.applyLede}>
              A few details are enough. We read every application and reply by email with your partner agreement and
              the next step.
            </p>
          </div>

          {status === "sent" ? (
            <div className={cx(p.formCard, p.sent)} role="status">
              <span className={p.sentTick}><Check aria-hidden="true" /></span>
              <h3 className={p.sentTitle}>Application received</h3>
              <p className={p.applyLede}>
                Thanks, {form.name.split(" ")[0] || "there"}. We&rsquo;ll reply to {form.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} aria-busy={status === "sending"} className={p.formCard}>
              {error ? (
                <div className={p.error} role="alert">
                  <AlertCircle aria-hidden="true" />
                  <p>{error}</p>
                </div>
              ) : null}

              <fieldset className={p.field}>
                <legend className={p.label}>Program</legend>
                <div className={p.choice} role="radiogroup">
                  {PROGRAMS.map((x) => (
                    <label key={x.id} className={cx(p.choiceOption, x.id === program && p.choiceOn)}>
                      <input
                        type="radio"
                        name="program"
                        value={x.id}
                        checked={x.id === program}
                        onChange={() => setProgram(x.id)}
                        className="sr-only"
                      />
                      {x.name.replace(" partner", "")}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={p.fieldGrid}>
                <div className={p.field}>
                  <label htmlFor="partner-name" className={p.label}>Full name</label>
                  <input id="partner-name" required autoComplete="name" value={form.name} onChange={update("name")} className={p.input} />
                </div>
                <div className={p.field}>
                  <label htmlFor="partner-email" className={p.label}>Work email</label>
                  <input id="partner-email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={p.input} />
                </div>
                <div className={p.field}>
                  <label htmlFor="partner-company" className={p.label}>Company or agency</label>
                  <input id="partner-company" required autoComplete="organization" value={form.company} onChange={update("company")} className={p.input} />
                </div>
                <div className={p.field}>
                  <label htmlFor="partner-website" className={p.label}>Website or profile <span className={p.optional}>Optional</span></label>
                  <input id="partner-website" inputMode="url" value={form.website} onChange={update("website")} placeholder="youragency.com" className={p.input} />
                </div>
              </div>

              <div className={p.field}>
                <label htmlFor="partner-stores" className={p.label}>Shopify stores you work with</label>
                <select id="partner-stores" required value={form.stores} onChange={update("stores")} className={p.input}>
                  <option value="" disabled>Choose one</option>
                  {STORE_COUNTS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={p.field}>
                <label htmlFor="partner-notes" className={p.label}>Anything we should know <span className={p.optional}>Optional</span></label>
                <textarea
                  id="partner-notes"
                  rows={4}
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder="Who your clients or audience are, and how you'd like to work together."
                  className={cx(p.input, p.textarea)}
                />
              </div>

              <button type="submit" disabled={status === "sending"} className={cx(p.primary, p.submit)}>
                {status === "sending" ? (
                  <>
                    <Loader2 className={p.spin} aria-hidden="true" /> Sending
                  </>
                ) : (
                  <>
                    Send application <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
