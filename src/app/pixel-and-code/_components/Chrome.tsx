// Fixed page background (soft radial tint + grain). The old custom cursor,
// percentage preloader and Three.js pixel field were removed in the 2026-09
// ad-readiness rebuild: they gated first paint by ~2.3s and ~120KB for no
// conversion benefit. script.js guards on their absence.
export default function Chrome() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="noise"></div>
    </div>
  );
}
