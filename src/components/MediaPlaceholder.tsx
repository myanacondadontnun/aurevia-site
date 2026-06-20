import { Clapperboard, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaPlaceholderAspect = "video" | "wide" | "square";

const aspectMap: Record<MediaPlaceholderAspect, string> = {
  video: "aspect-video",
  wide: "aspect-[21/9] max-h-[min(28rem,50vh)]",
  square: "aspect-square max-w-md mx-auto",
};

function MediaIcon({ kind }: { kind: "video" | "image" }) {
  if (kind === "video") {
    return <Clapperboard className="h-10 w-10 text-primary/80" strokeWidth={1.5} aria-hidden />;
  }
  return <ImageIcon className="h-10 w-10 text-primary/80" strokeWidth={1.5} aria-hidden />;
}

interface MediaPlaceholderProps {
  /** Accessible name for the region (e.g. "Product demo video placeholder") */
  ariaLabel: string;
  /** Main label shown in the box */
  caption: string;
  /** Hint for the team: what to drop in later */
  suggestedAsset: string;
  /** Layout proportions */
  aspect?: MediaPlaceholderAspect;
  /** Visual treatment */
  kind?: "video" | "image";
  className?: string;
  /** When you already have a static image to show */
  imageSrc?: string;
  imageAlt?: string;
}

export default function MediaPlaceholder({
  ariaLabel,
  caption,
  suggestedAsset,
  aspect = "video",
  kind = "video",
  className,
  imageSrc,
  imageAlt,
}: MediaPlaceholderProps) {
  if (imageSrc) {
    return (
      <figure className={cn("w-full", className)}>
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl border border-border/40 bg-card/30 shadow-lg",
            aspectMap[aspect]
          )}
        >
          <img
            src={imageSrc}
            alt={imageAlt || caption}
            className="h-full w-full object-cover"
          />
        </div>
        {suggestedAsset ? (
          <figcaption className="mt-3 text-center text-xs text-muted-foreground">{suggestedAsset}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div className={cn("w-full", className)} role="region" aria-label={ariaLabel}>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/[0.07] to-card/50 p-8 text-center shadow-inner",
          aspectMap[aspect]
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
          <MediaIcon kind={kind} />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{caption}</p>
          <p className="mt-2 max-w-md text-xs text-muted-foreground leading-relaxed">{suggestedAsset}</p>
        </div>
      </div>
    </div>
  );
}
