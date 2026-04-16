/**
 * Try-on providers run on remote servers and cannot fetch
 * http://localhost or private-network product image URLs. For those hosts,
 * fetch the image on this server and send a data URL to the provider.
 */
export async function imageUrlForTryOnProvider(url: string): Promise<string> {
  if (url.startsWith("data:")) {
    return url
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return url
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return url
  }

  const host = parsed.hostname.toLowerCase()
  const isPrivate =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)

  if (!isPrivate) {
    return url
  }

  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) {
    throw new Error(
      `Could not load product image for try-on (HTTP ${res.status}). Check that the Medusa image URL is reachable from the storefront server.`
    )
  }

  const buf = Buffer.from(await res.arrayBuffer())
  const ct =
    res.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg"
  const b64 = buf.toString("base64")
  return `data:${ct};base64,${b64}`
}
