import fs from "node:fs";
import path from "node:path";

/**
 * Server-only. Returns the URL of public/images/site/<name>.<ext> if the file exists, else null,
 * so sections can ship before their photos and pick them up on the next build.
 */
export function sitePhoto(name: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    const rel = `/images/site/${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
