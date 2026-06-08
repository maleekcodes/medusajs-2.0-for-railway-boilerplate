import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import AboutTemplate from "@modules/about/templates/about-template"
import { getAboutPage } from "@lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const [global, { page }] = await Promise.all([
    getGlobalSeoSettings(),
    getAboutPage(),
  ])

  return buildPageMetadata(
    {
      title: page?.seoTitle ?? "About | XYZ London",
      description:
        page?.seoDescription ??
        "Learn about XYZ London — a premium luxury fashion house focused on refined craftsmanship, elevated garments, and digital innovation.",
      path: "/about",
    },
    global
  )
}

export default async function AboutPage() {
  const { page } = await getAboutPage()

  return <AboutTemplate content={page ?? undefined} />
}
