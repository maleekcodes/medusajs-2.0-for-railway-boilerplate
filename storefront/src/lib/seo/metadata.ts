import type { Metadata } from "next"

import { getBaseURL } from "@lib/util/env"

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE_DEFAULT } from "./site"

export type PageSeoInput = {
  title?: string | null
  description?: string | null
  /** Path after country code, e.g. `/store` or `/products/cap` */
  path?: string
  image?: string | null
  twitterImage?: string | null
  noIndex?: boolean
}

export type GlobalSeoSettings = {
  seoTitle?: string | null
  seoDescription?: string | null
  ogImage?: string | null
  twitterImage?: string | null
}

const absoluteUrl = (path?: string) => {
  const base = getBaseURL().replace(/\/$/, "")
  if (!path) {
    return base
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Build Next.js Metadata with Open Graph and Twitter cards aligned to the XYZ SEO strategy.
 */
export function buildPageMetadata(
  input: PageSeoInput,
  global?: GlobalSeoSettings | null
): Metadata {
  const title = input.title?.trim() || global?.seoTitle?.trim() || SITE_TITLE_DEFAULT
  const description =
    input.description?.trim() ||
    global?.seoDescription?.trim() ||
    SITE_DESCRIPTION
  const url = absoluteUrl(input.path)
  const ogImage = input.image?.trim() || global?.ogImage?.trim() || undefined
  const twitterImage =
    input.twitterImage?.trim() || global?.twitterImage?.trim() || ogImage

  const metadata: Metadata = {
    title,
    description,
    alternates: input.path ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      url,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  }

  if (input.noIndex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}
