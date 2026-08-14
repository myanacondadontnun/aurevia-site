"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertCircle, ArrowRight, Mail, Globe, Check, Clock, FileText, X } from "lucide-react";
import { trackContactFormSubmit, trackEvent } from "@/lib/analytics";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxIybRXN-Lrpor-UtWp-LtVV25ld3FpoTvfQQmqMgPTo4ucIyFlc7M1UfPIVC1N92Mj/exec";

const steps = [
  { icon: Check, text: "Submission received", delay: 0 },
  { icon: FileText, text: "Queued for expert review", delay: 600 },
  { icon: Clock, text: "Report delivered within 24 hours", delay: 1200 },
];

function SuccessModal({ email, onClose }: { email: string; onClose: () => void }) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShowContent(true));

    const timers = steps.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), steps[i].delay + 300)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Submission confirmed"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl border border-black/[0.08] bg-[#0a0a0a] shadow-[0_20px_80px_rgba(0,204,153,0.08)] overflow-hidden transition-all duration-500 ${showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* Green glow bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#00CC99] to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-foreground/30 hover:text-foreground/70 hover:bg-white transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-8 pt-10 pb-8">
          {/* Animated checkmark */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className={`absolute inset-0 rounded-full bg-[#00CC99]/10 transition-transform duration-700 ease-out ${showContent ? "scale-100" : "scale-0"}`} />
            <div className={`absolute inset-2 rounded-full bg-[#00CC99]/20 transition-transform duration-700 delay-100 ease-out ${showContent ? "scale-100" : "scale-0"}`} />
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 delay-300 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
              <Check className="w-8 h-8 text-[#00CC99]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-fraunces font-normal text-foreground text-center mb-2">
            You&apos;re all set
          </h3>
          <p className="text-sm text-foreground/40 text-center mb-8">
            We&apos;ll send the full audit to{" "}
            <span className="text-foreground/70">{email}</span>
          </p>

          {/* Progress steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.text} className="flex items-start gap-4">
                {/* Vertical connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      visibleSteps > i
                        ? "bg-[#00CC99]/15 text-[#00CC99]"
                        : "bg-white text-foreground/15"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-px h-6 transition-all duration-500 ${
                        visibleSteps > i ? "bg-[#00CC99]/20" : "bg-white"
                      }`}
                    />
                  )}
                </div>
                <div className={`pt-1.5 transition-all duration-500 ${visibleSteps > i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}>
                  <p className={`text-sm font-normal ${visibleSteps > i ? "text-foreground" : "text-foreground/30"}`}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white my-8" />

          {/* What to expect */}
          <div className={`text-center transition-all duration-500 delay-[1800ms] ${visibleSteps >= steps.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <p className="text-xs text-foreground/30 leading-relaxed">
              Your report will cover homepage, product pages, UX, trust signals,
              SEO, mobile, and a prioritized action plan — typically 15+ pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewHeroForm() {
  const [formData, setFormData] = useState({
    email: "",
    storeUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = useCallback(() => {
    setShowModal(false);
    setFormData({ email: "", storeUrl: "" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const message = `Store URL: ${formData.storeUrl.trim()}`;

    try {
      const body = new URLSearchParams();
      body.append("name", "(from hero form)");
      body.append("email", formData.email.trim());
      body.append("company", formData.storeUrl.trim());
      body.append("subject", "Free Shopify store audit — Review My Shopify");
      body.append("message", message);

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: body,
        mode: "no-cors",
      });

      trackContactFormSubmit(true);
      trackEvent("shopify_audit_lead", {
        form_name: "review_my_shopify_hero",
      });
      setSubmittedEmail(formData.email.trim());
      setShowModal(true);
    } catch (error) {
      trackContactFormSubmit(false);
      trackEvent("contact_form_error", {
        form_name: "review_my_shopify_hero",
        error_message:
          error instanceof Error ? error.message : "Unknown error",
      });
      setSubmitError(
        error instanceof Error
          ? `${error.message} Try again or email sales@aurevia.io.`
          : "Something went wrong. Please try again or email sales@aurevia.io."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <SuccessModal email={submittedEmail} onClose={handleClose} />
      )}

      <div id="free-audit" className="scroll-mt-28">
        {submitError && (
          <div
            className="flex items-start gap-3 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl max-w-2xl"
            role="alert"
          >
            <AlertCircle
              className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-red-300 text-sm">{submitError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          aria-label="Request free Shopify store audit"
        >
          {/* Unified search bar — bright ring + orbiting light blob on outline only */}
          <div className="review-form-border-wrap max-w-2xl group/form">
            <div className="review-form-border-inner flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 p-1.5 sm:p-2 transition-[border-color] duration-300 group-focus-within/form:border-[#00CC99]/64">
              {/* Email input */}
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-foreground/30 group-focus-within:text-[#00CC99] transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full pl-11 pr-3 py-3 sm:py-3.5 bg-transparent text-sm text-foreground placeholder-black/30 focus:outline-none rounded-xl"
                />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-white flex-shrink-0" />

              {/* Store URL input */}
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-4 h-4 text-foreground/30 group-focus-within:text-[#00CC99] transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="storeUrl"
                  value={formData.storeUrl}
                  onChange={handleChange}
                  required
                  placeholder="yourstore.myshopify.com"
                  aria-label="Shopify store URL"
                  className="w-full pl-11 pr-3 py-3 sm:py-3.5 bg-transparent text-sm text-foreground placeholder-black/30 focus:outline-none rounded-xl"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.email.trim() || !formData.storeUrl.trim()}
                className="cta-button flex-shrink-0 inline-flex items-center justify-center gap-2 text-foreground font-medium px-6 py-3 sm:py-3.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="w-4 h-4 border-2 border-black/20 border-t-white rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span className="sm:hidden">Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Get Free Audit</span>
                    <ArrowRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <p className="text-[11px] text-foreground/25 mt-3 ml-1">
          No spam, ever. Our team replies with your full report within 24 hours.
        </p>
      </div>
    </>
  );
}
