"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CalendarCheck, AlertCircle, Loader2 } from "lucide-react";
import { trackContactFormSubmit, trackEvent } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/ritwik-mandal-aurevia/30min";

const orderVolumes = ["Under 100", "100 – 1,000", "1,000 – 10,000", "10,000+"];

const goals = [
  "Cart recovery",
  "Support automation",
  "Product recommendations & AOV",
  "Multilingual support",
  "Enterprise / custom rollout",
  "Not sure yet",
];

interface FormState {
  name: string;
  email: string;
  company: string;
  storeUrl: string;
  volume: string;
  goal: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  storeUrl: "",
  volume: "",
  goal: "",
  notes: "",
};

export default function ContactSalesForm() {
  const [step, setStep] = useState<"form" | "booking">("form");
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const message = [
      `Shopify store URL: ${form.storeUrl || "—"}`,
      `Monthly order volume: ${form.volume || "—"}`,
      `Main goal: ${form.goal || "—"}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const body = new URLSearchParams();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("company", form.company);
      body.append("subject", "Sales inquiry");
      body.append("message", message);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      trackContactFormSubmit(true);
      trackEvent("sales_inquiry_submitted", {
        form_name: "contact_sales",
        goal: form.goal || "not_provided",
        volume: form.volume || "not_provided",
      });

      setStep("booking");
    } catch (err) {
      trackContactFormSubmit(false);
      trackEvent("sales_inquiry_error", {
        form_name: "contact_sales",
        error_message: err instanceof Error ? err.message : "Unknown error",
      });
      setError(
        `Couldn't send that — ${err instanceof Error ? err.message : "please try again"}. You can also email sales@aurevia.io directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendlyUrl = `${CALENDLY_URL}?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(
    form.email
  )}&a1=${encodeURIComponent(form.company)}`;

  const canSubmit =
    form.name.trim() && form.email.trim() && form.company.trim() && form.volume && form.goal;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-10 flex items-center justify-center gap-3 text-xs font-medium">
        <span
          className={`flex items-center gap-2 ${step === "form" ? "text-[#00CC99]" : "text-muted-foreground"}`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
              step === "form" ? "border-[#00CC99] text-[#00CC99]" : "border-border/60"
            }`}
          >
            1
          </span>
          Tell us about your store
        </span>
        <span className="h-px w-8 bg-border/60" aria-hidden="true" />
        <span
          className={`flex items-center gap-2 ${step === "booking" ? "text-[#00CC99]" : "text-muted-foreground"}`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
              step === "booking" ? "border-[#00CC99] text-[#00CC99]" : "border-border/60"
            }`}
          >
            2
          </span>
          Book a call
        </span>
      </div>

      {step === "form" ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-sm"
          aria-busy={isSubmitting}
        >
          {error && (
            <div
              className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Full name *
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Jamie Chen"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Work email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="jamie@yourstore.com"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                Store / company name *
              </label>
              <input
                id="company"
                required
                value={form.company}
                onChange={update("company")}
                placeholder="Your store name"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
              />
            </div>
            <div>
              <label htmlFor="storeUrl" className="mb-2 block text-sm font-medium text-foreground">
                Shopify store URL
              </label>
              <input
                id="storeUrl"
                value={form.storeUrl}
                onChange={update("storeUrl")}
                placeholder="yourstore.myshopify.com"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="volume" className="mb-2 block text-sm font-medium text-foreground">
              Monthly order volume *
            </label>
            <select
              id="volume"
              required
              value={form.volume}
              onChange={update("volume")}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
            >
              <option value="" disabled>
                Select a range
              </option>
              {orderVolumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="goal" className="mb-2 block text-sm font-medium text-foreground">
              What are you hoping to solve? *
            </label>
            <select
              id="goal"
              required
              value={form.goal}
              onChange={update("goal")}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
            >
              <option value="" disabled>
                Select a focus area
              </option>
              {goals.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-foreground">
              Anything else we should know?
            </label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={update("notes")}
              placeholder="Current tools, timeline, specific requirements…"
              className="w-full resize-none rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="cta-button mt-7 flex w-full items-center justify-center gap-2 rounded-xl border-0 px-6 py-3.5 text-base font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Continue to booking
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Prefer email? Reach us directly at{" "}
            <a href="mailto:sales@aurevia.io" className="text-[#00CC99] hover:underline">
              sales@aurevia.io
            </a>
          </p>
        </form>
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>
            <span className="inline-flex items-center gap-1.5 text-sm text-[#00CC99]">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Thanks, {form.name.split(" ")[0] || "there"} — pick a time below
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/20">
            <iframe
              src={calendlyUrl}
              title="Book a call with Aurevia"
              className="h-[760px] w-full"
              frameBorder={0}
            />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Rather not schedule right now? We&apos;ve got your details and will follow up by email. Or{" "}
            <Link href="/home" className="text-[#00CC99] hover:underline">
              head back to the homepage
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
