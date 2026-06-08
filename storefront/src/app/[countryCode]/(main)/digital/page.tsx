import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import { getDigitalFormPage } from "@lib/sanity/queries"
import DigitalFormTemplate from "@modules/digital/templates/digital-form-template"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [global, { page }] = await Promise.all([
    getGlobalSeoSettings(),
    getDigitalFormPage(),
  ])

  return buildPageMetadata(
    {
      title: page?.seoTitle || "Digital Form | XYZ London",
      description:
        page?.seoDescription ||
        "Digital expressions exploring identity beyond physical constraints.",
      path: "/digital",
    },
    global
  )
}

type Params = {
  params: Promise<{ countryCode: string }>
}

export default async function DigitalFormPage({ params }: Params) {
  const { countryCode } = await params
  return <DigitalFormTemplate countryCode={countryCode} />
}
