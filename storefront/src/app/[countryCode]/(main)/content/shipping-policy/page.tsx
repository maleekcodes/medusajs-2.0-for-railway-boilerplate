import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import ShippingPolicyTemplate from "@modules/legal/templates/shipping-policy-template"

export async function generateMetadata(): Promise<Metadata> {
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("shippingPolicy"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? "Shipping Policy | XYZ London",
      description:
        seo?.seoDescription ??
        "Shipping, processing, duties, tracking, and OOO timelines for XYZ London orders.",
      path: "/content/shipping-policy",
    },
    global
  )
}

export default function ShippingPolicyPage() {
  return <ShippingPolicyTemplate />
}
