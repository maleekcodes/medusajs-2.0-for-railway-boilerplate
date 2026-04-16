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

/** Server-only: never expose via NEXT_PUBLIC_. When set, API is used instead of CDN. */
const token = process.env.SANITY_TOKEN?.trim()

export function getSanityClient(): SanityClient | null {
  const id = projectId?.trim()
  if (!id) {
    return null
  }
  return createClient({
    projectId: id,
    dataset,
    apiVersion,
    useCdn: !token,
    token: token || undefined,
  })
}
