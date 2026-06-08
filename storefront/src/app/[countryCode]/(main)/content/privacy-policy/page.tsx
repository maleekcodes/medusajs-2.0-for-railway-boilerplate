import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import PrivacyPolicyTemplate from "@modules/legal/templates/privacy-policy-template"

export async function generateMetadata(): Promise<Metadata> {
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("privacyPolicy"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? "Privacy Policy | XYZ London",
      description:
        seo?.seoDescription ??
        "How XYZ London collects, uses, and protects your personal data when you use our website and services, including OOO.",
      path: "/content/privacy-policy",
    },
    global
  )
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyTemplate />
}
