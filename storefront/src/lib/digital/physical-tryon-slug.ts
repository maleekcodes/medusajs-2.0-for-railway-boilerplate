/**
 * Physical PDP try-on uses a synthetic slug `pt-{cc}-{handle}` (pt = physical try-on)
 * so it cannot collide with Sanity digital slugs and parses unambiguously.
 */
const PHYSICAL_PREFIX = "pt-"

export function sanitizeCountryCode(raw: string): string {
  const s = raw.trim().toLowerCase().replace(/[^a-z]/g, "")
  return s.length >= 2 ? s.slice(0, 2) : "us"
}

export function sanitizeProductHandle(raw: string): string {
  return raw.trim().replace(/[^a-z0-9-_]/gi, "")
}

export function buildPhysicalTryonSlugKey(
  countryCode: string,
  handle: string
): string {
  const cc = sanitizeCountryCode(countryCode)
  const h = sanitizeProductHandle(handle)
  if (!h) {
    throw new Error("Invalid product handle for try-on")
  }
  return `${PHYSICAL_PREFIX}${cc}-${h}`
}

export function parsePhysicalTryonSlugKey(
  slug: string
): { countryCode: string; handle: string } | null {
  const s = slug.trim()
  if (!s.toLowerCase().startsWith(PHYSICAL_PREFIX)) {
    return null
  }
  const rest = s.slice(PHYSICAL_PREFIX.length)
  const m = /^([a-z]{2})-(.+)$/i.exec(rest)
  if (!m) {
    return null
  }
  const countryCode = m[1].toLowerCase()
  const handle = m[2]
  if (!handle) {
    return null
  }
  return { countryCode, handle }
}
