/**
 * Photos the scenario section uses, by file name in public/images/site (any of webp/jpg/png).
 * Kept outside the client component so the server page can read the same list.
 * A missing file renders as the store's tinted placeholder, so the section works before every photo exists.
 */
export const SCENARIO_PHOTO_NAMES = [
  // Fashion: Linden & Wren
  "store-fashion",
  "fashion-linen-dress",
  "fashion-silk-dress",
  // Skincare: Dewlight
  "store-skincare",
  // Electronics: Halden Audio
  "store-audio",
  "audio-headphones",
  "audio-case",
  // Home: Hearth & Clay (existing photos)
  "product-lifestyle",
  "product-main",
  // Jewellery: Solenne
  "store-jewellery",
  "jewellery-hoops",
  "jewellery-pendant",
  // Activewear: Stride Studio
  "store-activewear",
] as const;

export type ScenarioPhotoName = (typeof SCENARIO_PHOTO_NAMES)[number];
export type ScenarioPhotos = Record<ScenarioPhotoName, string | null>;
