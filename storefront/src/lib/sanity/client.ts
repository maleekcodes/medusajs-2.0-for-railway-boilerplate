import "server-only"

import { createClient, type SanityClient } from "@sanity/client"

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_DATASET ??
  "production"
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  process.env.SANITY_API_VERSION ??
  "2024-01-01"

const rawSanityToken = process.env.SANITY_TOKEN?.trim()

/** Sanity API tokens start with sk — bad placeholders cause SIO-401-ANF. */
export function normalizeSanityApiToken(
  raw: string | undefined
): string | undefined {
  if (!raw?.length) return undefined
  if (!raw.startsWith("sk")) {
    console.warn(
      "[sanity] SANITY_TOKEN does not look like a Sanity API token (must start with sk…). Ignoring; using CDN for reads."
    )
    return undefined
  }
  return raw
}

function isUnauthorizedGroq(e: unknown): boolean {
  if (!e || typeof e !== "object") return false
  const er = e as {
    statusCode?: number
    status?: number
    message?: string
  }
  return (
    er.statusCode === 401 ||
    er.status === 401 ||
    (typeof er.message === "string" && er.message.includes("Unauthorized"))
  )
}

/** After first 401 from API (revoked/expired token), permanently use CDN for this Node process. */
let usePublicGroqFallback = false
let fallbackClient: SanityClient | null = null

function baseConfig(project: string, token?: string) {
  const t = normalizeSanityApiToken(token)
  return {
    projectId: project,
    dataset,
    apiVersion,
    useCdn: usePublicGroqFallback ? true : !t,
    token: usePublicGroqFallback ? undefined : t || undefined,
  }
}

/**
 * Prefer **no SANITY_TOKEN** for the storefront — public CDN is enough for published documents.
 * If a token returns 401, we permanently fall back to CDN for subsequent requests in-process.
 */
function createClientWithGroqUnauthorizedFallback(project: string): SanityClient {
  const tokenAtBootstrap = normalizeSanityApiToken(rawSanityToken)

  const primary = createClient(baseConfig(project, rawSanityToken))
  const origFetch = primary.fetch.bind(primary)

  primary.fetch = (async (...args: Parameters<SanityClient["fetch"]>) => {
    if (usePublicGroqFallback) {
      fallbackClient ??= createClient(baseConfig(project, undefined))
      return await fallbackClient.fetch(...args)
    }
    try {
      return await origFetch(...args)
    } catch (e: unknown) {
      const hadTokenAttempt = !!tokenAtBootstrap
      if (hadTokenAttempt && isUnauthorizedGroq(e)) {
        usePublicGroqFallback = true
        fallbackClient ??= createClient(baseConfig(project, undefined))
        console.warn(
          "[sanity] SANITY_TOKEN was rejected with 401 (expired/revoked/wrong project). Using public CDN for published content. Remove SANITY_TOKEN or create a fresh token at https://www.sanity.io/manage → API → Tokens."
        )
        return await fallbackClient.fetch(...(args as Parameters<SanityClient["fetch"]>))
      }
      throw e
    }
  }) as SanityClient["fetch"]

  return primary
}

let singleton: SanityClient | null | undefined

/** Server-side Groq. Published content: omit SANITY_TOKEN and use CDN unless you truly need drafts. */
export function getSanityClient(): SanityClient | null {
  const id = projectId?.trim()
  if (!id) {
    return null
  }
  if (singleton === undefined) {
    singleton = createClientWithGroqUnauthorizedFallback(id)
  }
  return singleton
}
