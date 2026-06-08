import "server-only"

import { cache } from "react"

import type { PageSeoFields, StaticPageSeoSanity } from "@/types/xyz"

import {
  getSiteSettings,
  getStaticPageSeo,
} from "@lib/sanity/queries"

import type { GlobalSeoSettings } from "./metadata"

export type StaticPageSeoKey = keyof StaticPageSeoSanity

export const getGlobalSeoSettings = cache(async (): Promise<GlobalSeoSettings | null> => {
  const { settings } = await getSiteSettings()
  if (!settings) {
    return null
  }

  return {
    seoTitle: settings.seoTitle ?? settings.title,
    seoDescription: settings.seoDescription ?? settings.description,
    ogImage: settings.ogImage,
    twitterImage: settings.twitterImage,
  }
})

export const getStaticPageSeoFields = cache(
  async (key: StaticPageSeoKey): Promise<PageSeoFields | null> => {
    const { pages } = await getStaticPageSeo()
    return pages?.[key] ?? null
  }
)
