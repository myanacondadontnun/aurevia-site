// Hand-drawn line vectors for the feature cards — one shared 24-grid, 1.4 stroke,
// round caps, no fills. Deliberately not an icon library: fifteen glyphs isn't
// worth a dependency, and drawing them keeps the weight consistent with the
// brand's own pixel/mono language.
//
// Every icon inherits currentColor from .feature-card__icon, so hover states are
// handled in CSS, not here.

const paths: Record<string, React.ReactNode> = {
  // Identity
  mark: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 4.5v15M4.5 12h15" />
    </>
  ),
  palette: (
    <>
      <rect x="3" y="7" width="5" height="10" rx="1" />
      <rect x="9.5" y="7" width="5" height="10" rx="1" />
      <rect x="16" y="7" width="5" height="10" rx="1" />
    </>
  ),
  type: (
    <>
      <path d="M4 18.5 10 5.5l6 13" />
      <path d="M6.2 14h7.6" />
      <path d="M18 18.5V9.5" />
    </>
  ),
  naming: (
    <>
      <path d="M4 17V7h4a3 3 0 0 1 0 6H4" />
      <path d="M13 17V7l7 10V7" />
    </>
  ),
  // Product
  packaging: (
    <>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4" />
      <path d="M12 11v10" />
    </>
  ),
  product: (
    <>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  // Storefront
  storefront: (
    <>
      <path d="M4 9.5 5.5 5h13L20 9.5" />
      <path d="M4 9.5h16V19H4V9.5Z" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  cart: (
    <>
      <path d="M3 5h2.2l2 10h10l2-7H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  // Launch / plumbing
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8Z" />
      <path d="M12 17v4" />
    </>
  ),
  migrate: (
    <>
      <path d="M3 8h13M12 4l4 4-4 4" />
      <path d="M21 16H8M12 12l-4 4 4 4" />
    </>
  ),
  handover: (
    <>
      <path d="M4 12h9" />
      <path d="M13 8l4 4-4 4" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
    </>
  ),
  // Problem-side glyphs
  sameness: (
    <>
      <rect x="3.5" y="6" width="6" height="12" rx="1" />
      <rect x="11" y="6" width="6" height="12" rx="1" />
      <path d="M19.5 6v12" />
    </>
  ),
  fragments: (
    <>
      <path d="M10 4 4 10l4 4" />
      <path d="M14 20l6-6-4-4" />
      <path d="M13 7l-3 10" />
    </>
  ),
  handoffs: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 8.6 10.4 15.8M15.8 8.6 13.6 15.8M8.5 7h7" />
    </>
  ),
};

export default function PxcIcon({ name }: { name: keyof typeof paths | string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className="feature-card__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}
