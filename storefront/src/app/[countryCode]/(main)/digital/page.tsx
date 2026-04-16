import type { Metadata } from "next"

import { getDigitalFormPage } from "@lib/sanity/queries"
import DigitalFormTemplate from "@modules/digital/templates/digital-form-template"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getDigitalFormPage()
  return {
    title: page?.seoTitle || "Digital Form | XYZ London",
    description:
      page?.seoDescription ||
      "Digital expressions exploring identity beyond physical constraints.",
  }
}

type Params = {
  params: Promise<{ countryCode: string }>
}

export default async function DigitalFormPage({ params }: Params) {
  const { countryCode } = await params
  return <DigitalFormTemplate countryCode={countryCode} />
}
