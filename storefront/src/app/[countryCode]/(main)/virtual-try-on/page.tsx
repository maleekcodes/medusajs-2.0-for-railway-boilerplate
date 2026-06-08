import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import VirtualTryOnTemplate from "@modules/virtual-try-on/templates/virtual-try-on-template"
import { getArFitPage } from "@lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const [global, { page }] = await Promise.all([
    getGlobalSeoSettings(),
    getArFitPage(),
  ])

  return buildPageMetadata(
    {
      title: page?.seoTitle ?? "Try-on | XYZ London",
      description:
        page?.seoDescription ??
        "How XYZ try-on works: upload a photo on supported physical or digital pieces, get a composite preview, and shop with more context than flat photos alone.",
      path: "/virtual-try-on",
    },
    global
  )
}

export default async function VirtualTryOnPage() {
  const { page } = await getArFitPage()

  return <VirtualTryOnTemplate content={page ?? undefined} />
}
