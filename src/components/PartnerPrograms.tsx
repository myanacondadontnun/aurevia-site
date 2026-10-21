"use client";

/**
 * /partners: the three programs as selectable cards, and the application form
 * below them. Picking a card sets the form's program and scrolls to it.
 */

import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, Check, Handshake, Loader2, Megaphone, Puzzle, type LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec";

type ProgramId = "agency" | "referral" | "tech";

// `terms` is the commercial headline for a program; a null one shows no figure.
const PROGRAMS: {
  id: ProgramId;
  icon: LucideIcon;
  name: string;
  who: string;
  body: string;
  points: string[];
  terms: string | null;
}[] = [
  {
    id: "agency",
    icon: Handshake,
    name: "Agency partner",
    who: "Shopify agencies and freelancers",
    body: "You build and run stores for clients. Add Aurevia to the stores you manage and earn on every one, with our help on setup.",
    points: ["Recurring commission on client stores", "Onboarding help for each store", "A direct line to our team"],
    terms: "Up to 30% recurring · lifetime",
  },
  {
    id: "referral",
    icon: Megaphone,
    name: "Referral partner",
    who: "Consultants, creators and communities",
    body: "You talk to Shopify merchants. Point them to Aurevia and earn 20% of the monthly subscription of every store you refer, for 18 months.",
    points: ["Earn on stores you refer", "No client work required", "No cap on referrals"],
    terms: "20% recurring · 18 months",
  },
  {
    id: "tech",
    icon: Puzzle,
    name: "Tech partner",
    who: "Apps and platforms for Shopify brands",
    body: "You serve the same merchants we do. Work with us on joint content, shared audiences and integrations that help both sets of customers.",
    points: ["Joint content and webinars", "Shared leads where it fits", "Integration ideas welcome"],
    terms: "Co-marketing · content · webinars",
  },
];

const STORE_COUNTS = ["None yet", "1 – 5", "6 – 20", "More than 20"];

const INPUT =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground/70 focus:border-[#00665A] focus:outline-none focus:ring-1 focus:ring-[#00665A]/40";
const LABEL = "mb-2 block text-sm font-semibold text-foreground";

const emptyForm = { name: "", email: "", company: "", website: "", stores: "", notes: "" };

export default function PartnerPrograms() {
  const formRef = useRef<HTMLDivElement>(null);
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
    const programName = PROGRAMS.find((p) => p.id === program)?.name ?? program;
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
      <div id="programs" className="scroll-mt-28 grid gap-4 md:grid-cols-3">
        {PROGRAMS.map((p) => {
          const on = p.id === program;
          return (
            <div
              key={p.id}
              className={`flex flex-col rounded-2xl border bg-card p-6 sm:p-7 transition-colors ${
                on ? "border-[#00665A]" : "border-border"
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00665A] text-white">
                <p.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-xl font-fraunces font-medium text-foreground">{p.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#00665A]">{p.who}</p>
              {p.terms ? <p className="mt-4 text-base font-semibold text-foreground">{p.terms}</p> : null}
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              <ul className="mt-5 space-y-2 mb-6">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm font-medium text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00665A]" strokeWidth={2.5} />
                    {pt}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => choose(p.id)}
                className={`mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors ${
                  on
                    ? "cta-button"
                    : "border border-border bg-background text-foreground hover:border-[#00665A]"
                }`}
              >
                Apply as {p.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div ref={formRef} id="apply" className="scroll-mt-28 mt-16 sm:mt-24 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00665A] mb-3">Apply</p>
          <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground leading-tight mb-4">
            Tell us how you work with Shopify stores
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A few details are enough. We read every application and reply by email with your partner agreement and
            the next step.
          </p>
        </div>

        <div className="lg:col-span-3">
          {status === "sent" ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center" role="status">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e6eeea] text-[#00665A]">
                <Check className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <h3 className="mt-5 text-xl font-fraunces font-medium text-foreground">Application received</h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Thanks, {form.name.split(" ")[0] || "there"}. We&rsquo;ll reply to {form.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} aria-busy={status === "sending"} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              {error ? (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-600/25 bg-red-50 p-4" role="alert">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              ) : null}

              <fieldset>
                <legend className={LABEL}>Program</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PROGRAMS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                        p.id === program
                          ? "border-[#00665A] bg-[#00665A] text-white"
                          : "border-border bg-background text-foreground hover:border-[#00665A]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="program"
                        value={p.id}
                        checked={p.id === program}
                        onChange={() => setProgram(p.id)}
                        className="sr-only"
                      />
                      <p.icon className="h-4 w-4" strokeWidth={2} />
                      {p.name.replace(" partner", "")}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="partner-name" className={LABEL}>Full name *</label>
                  <input id="partner-name" required autoComplete="name" value={form.name} onChange={update("name")} className={INPUT} />
                </div>
                <div>
                  <label htmlFor="partner-email" className={LABEL}>Work email *</label>
                  <input id="partner-email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={INPUT} />
                </div>
                <div>
                  <label htmlFor="partner-company" className={LABEL}>Company or agency *</label>
                  <input id="partner-company" required autoComplete="organization" value={form.company} onChange={update("company")} className={INPUT} />
                </div>
                <div>
                  <label htmlFor="partner-website" className={LABEL}>Website or profile</label>
                  <input id="partner-website" inputMode="url" value={form.website} onChange={update("website")} placeholder="youragency.com" className={INPUT} />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="partner-stores" className={LABEL}>Shopify stores you work with *</label>
                <select id="partner-stores" required value={form.stores} onChange={update("stores")} className={INPUT}>
                  <option value="" disabled>Choose one</option>
                  {STORE_COUNTS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="partner-notes" className={LABEL}>Anything we should know</label>
                <textarea id="partner-notes" rows={4} value={form.notes} onChange={update("notes")} placeholder="Who your clients or audience are, and how you'd like to work together." className={INPUT} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-button mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 text-sm sm:text-base disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Send application <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
