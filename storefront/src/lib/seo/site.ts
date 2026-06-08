import type { Metadata } from "next"

import { getBaseURL } from "@lib/util/env"

/** Aligned with XYZ London SEO strategy */
export const SITE_NAME = "XYZ London"

export const SITE_TITLE_DEFAULT =
  "XYZ London | Premium Luxury Streetwear & Refined Headwear"

export const SITE_DESCRIPTION =
  "Premium luxury garments and refined headwear designed through craftsmanship, timeless form, elevated proportions, and minimalist expression."

const base = () => new URL(getBaseURL())

/**
 * Shared root metadata: Open Graph, Twitter, crawlers, icons.
 * Page-level `title` / `description` still override as needed.
 */
export function rootMetadata(): Metadata {
  const metadataBase = base()
  return {
    metadataBase,
    title: {
      default: SITE_TITLE_DEFAULT,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: metadataBase.href }],
    creator: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      url: metadataBase,
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
  }
}
