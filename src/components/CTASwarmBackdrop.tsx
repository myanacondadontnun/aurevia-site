"use client";

import CTASwarmParticles from "./CTASwarmParticles";

type CTASwarmBackdropProps = {
  roundedClassName?: string;
  boidCount?: number;
};

/**
 * Particle swarm inside a control — use inside `relative overflow-hidden`
 * hosts so it sits behind the label.
 */
export default function CTASwarmBackdrop({
  roundedClassName = "rounded-lg",
  boidCount = 14,
}: CTASwarmBackdropProps) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${roundedClassName}`}
      aria-hidden
    >
      <CTASwarmParticles
        boidCount={boidCount}
        roundedClassName="rounded-none"
      />
    </span>
  );
}
