/**
 * Single path segment for `/[country]/digital/[slug]`.
 * Strips accidental `digital/` prefixes (misconfigured Sanity slugs) and
 * flattens slashes so we never emit `%2F` in the path (which breaks matching).
 */
export function normalizeDigitalPdpSlug(
  raw: string | undefined | null
): string {
  if (raw == null || typeof raw !== "string") {
    return ""
  }
  let s = raw.trim()
  if (!s) {
    return ""
  }
  try {
    s = decodeURIComponent(s)
  } catch {
    // keep s
  }
  s = s.replace(/^\/+|\/+$/g, "")
  while (s.toLowerCase().startsWith("digital/")) {
    s = s.slice("digital/".length)
  }
  if (s.includes("/")) {
    s = s.split("/").filter(Boolean).join("-")
  }
  // Slug fields may turn "/digital/foo" into one segment "digital-foo"
  if (/^digital-/i.test(s)) {
    s = s.replace(/^digital-/i, "")
  }
  return s.trim()
}

/**
 * When the URL uses a short parent slug (e.g. `shell-jacket`) but CMS uses
 * suffixed slugs (`shell-jacket-a`, `shell-jacket-b`), pick a single match:
 * all catalog slugs that start with `requested + "-"`, lexicographically first.
 * Only runs when `requested` contains a hyphen (avoids matching `shell` → everything under `shell-`).
 */
export function resolveDigitalSlugFromCatalog(
  requested: string,
  catalogCanonicalSlugs: string[]
): string | null {
  const r = normalizeDigitalPdpSlug(requested)
  if (!r) {
    return null
  }
  const catalog = [
    ...new Set(
      catalogCanonicalSlugs
        .map((s) => normalizeDigitalPdpSlug(s))
        .filter(Boolean)
    ),
  ].sort()
  if (catalog.includes(r)) {
    return r
  }
  if (!r.includes("-")) {
    return null
  }
  const prefixed = catalog.filter((p) => p.startsWith(`${r}-`))
  if (prefixed.length === 0) {
    return null
  }
  return prefixed[0]
}
