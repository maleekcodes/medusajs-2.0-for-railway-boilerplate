import "server-only"

import { createHmac, timingSafeEqual } from "crypto"

import { normalizeDigitalPdpSlug } from "./normalize-digital-slug"

const TTL_SECONDS = 15 * 60

/**
 * Prefer a dedicated secret; otherwise reuse other server-only secrets that are
 * usually already set when digital try-on + MinIO + Stripe are configured.
 */
function getSecret(): string {
  const explicit = process.env.DIGITAL_PREVIEW_HMAC_SECRET?.trim()
  if (explicit) {
    return explicit
  }
  const fromStripe = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (fromStripe) {
    return fromStripe
  }
  const fromMinio = process.env.MINIO_SECRET_KEY?.trim()
  if (fromMinio) {
    return fromMinio
  }
  throw new Error(
    "No signing secret for try-on preview: set DIGITAL_PREVIEW_HMAC_SECRET (recommended), or ensure STRIPE_WEBHOOK_SECRET or MINIO_SECRET_KEY is set."
  )
}

function signPayload(slug: string, predictionId: string, exp: number): string {
  const payload = `${slug}|${predictionId}|${exp}`
  return createHmac("sha256", getSecret()).update(payload).digest("hex")
}

/**
 * Signed same-origin path for `<img src>` (leading slash). Slug is normalized
 * so it matches MinIO key derivation and verification.
 */
export function issueSignedPreviewPath(
  slug: string,
  predictionId: string
): string {
  const normalized = normalizeDigitalPdpSlug(slug)
  if (!normalized || !predictionId.trim()) {
    throw new Error("Invalid preview params")
  }
  const id = predictionId.trim()
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS
  const sig = signPayload(normalized, id, exp)
  const params = new URLSearchParams({
    slug: normalized,
    id,
    exp: String(exp),
    sig,
  })
  return `/api/try-on/preview?${params.toString()}`
}

export function verifyPreviewSignature(
  slug: string,
  predictionId: string,
  exp: number,
  sig: string
): boolean {
  const normalized = normalizeDigitalPdpSlug(slug)
  if (!normalized || !predictionId?.trim() || !sig) {
    return false
  }
  const id = predictionId.trim()
  if (!Number.isFinite(exp)) {
    return false
  }
  const now = Math.floor(Date.now() / 1000)
  if (exp < now) {
    return false
  }
  const expected = signPayload(normalized, id, exp)
  if (expected.length !== sig.length) {
    return false
  }
  try {
    return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(sig, "utf8"))
  } catch {
    return false
  }
}
