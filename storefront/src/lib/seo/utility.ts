import "server-only"

import type { Metadata } from "next"

import { buildPageMetadata } from "./metadata"
import { getGlobalSeoSettings } from "./sanity"

/** Metadata for account, checkout-adjacent, and other non-indexed utility routes. */
export async function buildUtilityPageMetadata(
  title: string,
  description: string,
  path?: string
): Promise<Metadata> {
  const global = await getGlobalSeoSettings()
  return buildPageMetadata(
    {
      title,
      description,
      path,
      noIndex: true,
    },
    global
  )
}
