import type { Metadata } from "next"

import { getPrivateExpressionsPage } from "@lib/sanity/queries"
import PrivateExpressionsLanding from "@modules/private-expressions/components/private-expressions-landing"

const FALLBACK_TITLE = "OOO — Highest Expression | XYZ London"
const FALLBACK_DESC =
  "OOO is the highest expression of XYZ London. Beyond season and trend—reserved for those who recognise intention."

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPrivateExpressionsPage()
  return {
    title: page?.seoTitle?.trim() || FALLBACK_TITLE,
    description: page?.seoDescription?.trim() || FALLBACK_DESC,
  }
}

export default async function PrivateExpressionsPage() {
  const result = await getPrivateExpressionsPage()
  return (
    <PrivateExpressionsLanding
      content={result.page}
      sanityConfigured={result.sanityConfigured}
      fetchError={result.fetchError}
    />
  )
}
