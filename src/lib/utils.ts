import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shopify App Store base URL for Aurevia
export const SHOPIFY_APP_URL = "https://apps.shopify.com/aurevia-io";

// Normalize user input for a Shopify store URL or subdomain
export function normalizeShopDomain(input: string): string {
  if (!input) return "";
  let trimmed = input.trim();
  // Remove protocol
  trimmed = trimmed.replace(/^https?:\/\//i, "");
  // If they pasted a path or query, take only host
  trimmed = trimmed.split("/")[0];
  // If they provided only the shop name, append domain
  if (!trimmed.includes(".myshopify.com")) {
    trimmed = `${trimmed}.myshopify.com`;
  }
  return trimmed.toLowerCase();
}

// Build the Shopify App Store install URL with optional shop parameter
export function buildShopifyInstallUrl(shop?: string): string {
  if (!shop) return SHOPIFY_APP_URL;
  const domain = normalizeShopDomain(shop);
  const url = new URL(SHOPIFY_APP_URL);
  url.searchParams.set("shop", domain);
  return url.toString();
}

// Open the Shopify App Store page in a new tab, optionally with shop prefilled
export function openShopifyInstall(shop?: string) {
  const href = buildShopifyInstallUrl(shop);
  window.open(href, "_blank", "noopener,noreferrer");
}
