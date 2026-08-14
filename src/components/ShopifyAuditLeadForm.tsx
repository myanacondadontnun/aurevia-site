"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { trackContactFormSubmit, trackEvent } from "@/lib/analytics";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec";

const inputClass =
  "w-full px-4 py-3 bg-white border border-black/20 rounded-lg text-base sm:text-sm text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm transition-all duration-200";

export default function ShopifyAuditLeadForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    storeUrl: "",
    struggle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const struggleLine = formData.struggle
      ? `Biggest struggle: ${formData.struggle}`
      : "Biggest struggle: (not specified)";
    const message = `${struggleLine}\nStore URL: ${formData.storeUrl.trim()}`;

    try {
      const body = new URLSearchParams();
      body.append("name", formData.firstName.trim());
      body.append("email", formData.email.trim());
      body.append("company", formData.storeUrl.trim());
      body.append("subject", "Free Shopify store audit — Review My Shopify");
      body.append("message", message);

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (response.ok) {
        const result = await response.text();
        if (result === "Success" || response.status === 200) {
          trackContactFormSubmit(true);
          trackEvent("shopify_audit_lead", {
            form_name: "review_my_shopify_audit",
            struggle: formData.struggle || "not_specified",
          });
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              firstName: "",
              email: "",
              storeUrl: "",
              struggle: "",
            });
          }, 4000);
        } else {
          throw new Error(`Unexpected response: ${result}`);
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      trackContactFormSubmit(false);
      trackEvent("contact_form_error", {
        form_name: "review_my_shopify_audit",
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
    <section
      id="free-audit"
      className="scroll-mt-28"
      aria-labelledby="free-audit-heading"
    >
      <Card className="border-black/10 bg-card/40 backdrop-blur-sm max-w-xl mx-auto">
        <CardHeader>
          <CardTitle
            id="free-audit-heading"
            className="text-2xl md:text-3xl font-normal text-foreground"
          >
            Claim your free professional audit
          </CardTitle>
          <p className="text-muted-foreground text-sm md:text-base font-normal">
            One store URL is enough to get started. We reply by email with your
            teardown and next steps.
          </p>
        </CardHeader>
        <CardContent>
          <div aria-live="polite" aria-atomic="true">
            {isSubmitted ? (
              <div className="text-center py-10" role="status">
                <CheckCircle
                  className="w-14 h-14 text-emerald-400 mx-auto mb-4"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-normal text-foreground mb-2">
                  You&apos;re on the list
                </h3>
                <p className="text-muted-foreground text-sm">
                  Check your inbox soon—we&apos;ll send your 5-point audit from
                  the Aurevia team.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-busy={isSubmitting}
                aria-label="Request free Shopify store audit"
              >
                {submitError && (
                  <div
                    className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                    role="alert"
                    id="audit-form-error"
                  >
                    <AlertCircle
                      className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-red-300 text-sm">{submitError}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="audit-first-name"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    First name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="audit-first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className={inputClass}
                    placeholder="Alex"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-email"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="audit-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@yourstore.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-store-url"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Shopify store URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="audit-store-url"
                    name="storeUrl"
                    value={formData.storeUrl}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="https://yourbrand.myshopify.com or yoursite.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-struggle"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Biggest struggle right now{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </label>
                  <select
                    id="audit-struggle"
                    name="struggle"
                    value={formData.struggle}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Select one…</option>
                    <option value="Traffic">Traffic</option>
                    <option value="Add to cart">Add to cart</option>
                    <option value="Checkout abandonment">
                      Checkout abandonment
                    </option>
                    <option value="Other / not sure">Other / not sure</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-describedby={submitError ? "audit-form-error" : undefined}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground py-3 px-6 rounded-lg font-normal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-black/20 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Get my free audit
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
