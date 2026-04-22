import "server-only"

/**
 * Remote try-on API (server-only). Override with VIRTUAL_TRYON_PROVIDER_BASE_URL
 * if you proxy or switch providers without code changes.
 */
export function getVirtualTryOnProviderBaseUrl(): string {
  const raw = process.env.VIRTUAL_TRYON_PROVIDER_BASE_URL?.trim()
  if (raw) {
    return raw.replace(/\/+$/, "")
  }
  return "https://api.fashn.ai/v1"
}

/**
 * Prefer VIRTUAL_TRYON_API_KEY. An older env name is still accepted for existing deploys.
 */
export function getVirtualTryOnApiKey(): string | undefined {
  return (
    process.env.VIRTUAL_TRYON_API_KEY?.trim() ||
    process.env.FASHN_API_KEY?.trim()
  )
}
