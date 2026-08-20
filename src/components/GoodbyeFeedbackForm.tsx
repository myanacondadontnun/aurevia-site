"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { trackContactFormSubmit, trackEvent } from "@/lib/analytics";

const reasons = [
  "Too expensive",
  "Missing a feature I needed",
  "Didn't see the results I expected",
  "Switching to another tool",
  "Just testing / not ready yet",
  "Something else",
];

export default function GoodbyeFeedbackForm() {
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const body = new URLSearchParams();
      body.append("name", "Uninstalled merchant");
      body.append("email", email || "not provided");
      body.append("company", "—");
      body.append("subject", "Uninstall feedback");
      body.append("message", `Reason: ${reason}${comment ? `\nComment: ${comment}` : ""}`);

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
      trackEvent("uninstall_feedback_submitted", { reason });
      setIsSubmitted(true);
    } catch (err) {
      trackContactFormSubmit(false);
      trackEvent("uninstall_feedback_error", {
        error_message: err instanceof Error ? err.message : "Unknown error",
      });
      setError("Couldn't send that just now — but thank you for trying. No hard feelings either way.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/40 p-8 text-center backdrop-blur-sm">
        <CheckCircle className="mx-auto mb-4 h-10 w-10 text-[#00CC99]" aria-hidden="true" />
        <h3 className="mb-2 text-lg font-medium text-foreground">Thanks for the honesty</h3>
        <p className="text-sm text-muted-foreground">
          We read every one of these. If you&apos;d like a reply, we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-sm"
      aria-busy={isSubmitting}
    >
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4" role="alert">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">
          Mind telling us why you left? *
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {reasons.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                reason === r
                  ? "border-[#00CC99]/50 bg-[#00CC99]/10 text-foreground"
                  : "border-border/50 text-muted-foreground hover:border-border"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
                className="accent-[#00CC99]"
              />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="comment" className="mb-2 block text-sm font-medium text-foreground">
          Anything specific we should know? (optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="The more honest, the more useful"
          className="w-full resize-none rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          Email (optional, if you&apos;d like a reply)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourstore.com"
          className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#00CC99]/50 focus:outline-none focus:ring-1 focus:ring-[#00CC99]/30"
        />
      </div>

      <button
        type="submit"
        disabled={!reason || isSubmitting}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#00CC99]/40 hover:text-[#00795c] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send feedback
          </>
        )}
      </button>
    </form>
  );
}
