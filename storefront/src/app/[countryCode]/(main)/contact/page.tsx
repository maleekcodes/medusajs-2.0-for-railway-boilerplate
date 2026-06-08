import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import ContactTemplate from "@modules/contact/templates/contact-template"

export async function generateMetadata(): Promise<Metadata> {
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("contact"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? "Contact | XYZ London",
      description:
        seo?.seoDescription ??
        "Get in touch with XYZ London — orders, support, returns, and general enquiries.",
      path: "/contact",
    },
    global
  )
}

export default function ContactPage() {
  return <ContactTemplate />
}
