import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import TermsOfServiceTemplate from "@modules/legal/templates/terms-of-service-template"

export async function generateMetadata(): Promise<Metadata> {
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("termsOfUse"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? "Terms of Service | XYZ London",
      description:
        seo?.seoDescription ??
        "Terms governing use of the XYZ London website and services, including OOO.",
      path: "/content/terms-of-use",
    },
    global
  )
}

export default function TermsOfUsePage() {
  return <TermsOfServiceTemplate />
}
