import type { Metadata } from "next"

import AboutTemplate from "@modules/about/templates/about-template"
import { getAboutPage } from "@lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getAboutPage()

  return {
    title: page?.seoTitle ?? "About | XYZ London",
    description:
      page?.seoDescription ??
      "Learn about XYZ London - a fashion house exploring identity through physical and digital expression.",
  }
}

export default async function AboutPage() {
  const { page } = await getAboutPage()

  return <AboutTemplate content={page ?? undefined} />
}
