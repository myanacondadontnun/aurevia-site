# Aurevia site design system

The rules every page of aurevia.io follows. When a section needs something this file doesn't cover, add it here
first, then build it. Tokens live in `src/app/globals.css` under `:root` as `--au-*`; section CSS modules map their
local names to these and never define their own colours, radii, shadows or type sizes.

## Principles

1. **Repeat, don't invent.** A brand is the same few moves used again and again. A new section reuses an existing
   surface, card, heading and motion; it does not get its own trick.
2. **Real over simulated.** Prefer real Aurevia screenshots and real merchant logos to drawn UI and generated
   photos. Simulated product moments are allowed where a still can't show the behaviour, and the demo stores
   are fictional and never named after real businesses.
3. **Quiet confidence.** One accent, generous space, few effects. If an effect is the first thing you notice,
   it is too loud.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--au-paper` | `#f7f6f2` | Default page background |
| `--au-paper-2` | `#eef3f0` | Second light surface, gradients' far end |
| `--au-white` | `#ffffff` | Cards, panels, the nav pill |
| `--au-night` | `#10201c` | Dark sections |
| `--au-ink` | `#17201e` | Headings and body text on light |
| `--au-ink-2` | `#17201e` at 68% | Secondary text |
| `--au-ink-3` | `#17201e` at 46% | Captions, labels |
| `--au-rule` | `#17201e` at 12% | Hairlines |
| `--au-green` | `#007f68` | The one accent: primary buttons, accents, active states |
| `--au-green-ink` | `#00665a` | Green text and links on light (passes AA) |
| `--au-green-bright` | `#00a888` | Green on night backgrounds only |
| `--au-green-wash` | `#007f68` at 8% | Tints, highlights, selected rows |

- One accent per surface: green. Amber appears only for star ratings.
- No other greens. Mint `#00cc99` is retired on the site; it fails contrast on white.
- Light and night alternate. Never two night sections next to each other; at most three per page.

## Type

- **Fraunces 400** for display only: H1, H2, H3 and pull-quotes. Never bold, never italic.
- **DM Sans** for everything else.
- Sizes (tokens): `--au-h1` `clamp(2.5rem, 1.3rem + 4vw, 4.75rem)`, `--au-h2` `clamp(2rem, 1.3rem + 2.6vw, 3.25rem)`,
  `--au-h3` `clamp(1.375rem, 1.15rem + 0.8vw, 1.75rem)`, body 1rem to 1.125rem, captions 0.8125rem.
- Headings: line-height 1.05, letter-spacing -0.02em. Body: line-height 1.55.
- Eyebrows and labels: DM Sans 600, 0.75rem, 0.08em tracking, uppercase, `--au-green-ink`.

## Space

- Container: `max-w-6xl` (1152px) with 16px / 24px side padding.
- Section rhythm: `--au-section-y` = 72px on phones, 112px from 1024px. Every section uses it.
- Section head to content: 40px phones, 56px desktop.

## Shape and elevation

- Radius scale: `--au-r-sm` 10px (chips, small tiles), `--au-r-md` 16px (cards inside panels),
  `--au-r-lg` 24px (cards, panels), `--au-r-xl` 32px (stages, boards, big media), `--au-r-pill` 999px (buttons, pills).
- Two shadows only: `--au-shadow-1` for cards on a surface, `--au-shadow-2` for floating things (stages, popovers,
  the nav). No coloured glows except the primary button.

## Components

- **Primary button:** green pill, white text, 52px tall in heroes and 46px elsewhere, arrow nudges 3px on hover.
- **Secondary button:** outlined pill, ink text, white at 60% behind it.
- **Cards:** white, `--au-r-lg`, `--au-shadow-1`, 28px to 36px padding.
- **Cue card:** white, `--au-r-md`, green icon tile, small green eyebrow, one line of detail. Used wherever a demo
  shows what the agent just did.
- **Pills and chips:** white, `--au-r-pill`, 0.8125rem DM Sans 600.

## Surfaces and glass

- Glass (backdrop blur) only in two places: the nav pill and the hero conversation. Everywhere else is solid.

## Motion

- One ease, `--au-ease` `cubic-bezier(0.22, 1, 0.36, 1)`. Durations: 200ms for hovers, 420ms for things
  entering, 900ms for the hero fade.
- Content fades in once. Loops are allowed only inside product demos (the hero chat, the scenarios and the setup
  board) and for the signature ring.
- Everything respects `prefers-reduced-motion`: demos show their finished state, loops stop.

## Signature: the Aurevia ring

The outer weave of the Aurevia mark (no centre "A"), as `public/images/site/mark-ring-watermark.webp`, used as a
mask over a green gradient. It is the one decorative element the site owns.

- Large and cropped by an edge, never whole and centred.
- Green at 6% to 24% only, never in the mark's own purple-to-cyan.
- At most one per viewport. Never behind body text.
- Turns slowly only in the hero; still everywhere else.

## Imagery

- Real Aurevia screenshots first, real merchant logos in the logo strip and the reviews (washed to one ink tone).
- Demo stores are fictional (Linden & Wren, Dewlight, Halden Audio, Hearth & Clay, Solenne, Stride Studio).
- No generated people, no fake credentials or passwords visible on screens, no stock "laptop on desk" clichés.

## Copy

- Plain and specific: what it does, for whom, in the merchant's words.
- One two-beat slogan per page at most (the hero). Section titles say what the section shows.
- No invented numbers. Every figure comes from real data (reviews, installs) or is cut.

## Known deviations (to fix next)

- Generated store and product photos in the scenarios, channels band and final CTA; the final CTA laptop shows
  "Password: 123".
- The dashboard in Ask Aurevia and the widget windows are drawn replicas, not screenshots.
- Frosted glass outside the hero and nav: the channels band cards, the scenario store chip and cue cards.
- Eleven sections on the home page; the target is six or seven.
- Other pages (pricing, help, solutions, products) still use the older Tailwind styles and mint accents.
