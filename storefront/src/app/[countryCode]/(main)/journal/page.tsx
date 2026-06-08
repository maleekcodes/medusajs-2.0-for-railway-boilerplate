import type { Metadata } from "next"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings, getStaticPageSeoFields } from "@lib/seo/sanity"
import { getJournalEntries } from "@lib/sanity/queries"
import JournalIndexTemplate from "@modules/journal/templates/journal-index-template"

export async function generateMetadata(): Promise<Metadata> {
  const [global, seo] = await Promise.all([
    getGlobalSeoSettings(),
    getStaticPageSeoFields("journal"),
  ])

  return buildPageMetadata(
    {
      title: seo?.seoTitle ?? "Journal | XYZ London",
      description:
        seo?.seoDescription ??
        "The narrative of form. A visual archive of our process, inspiration, and dialogue.",
      path: "/journal",
    },
    global
  )
}

export const revalidate = 60

export default async function JournalPage() {
  const { editorials, lookbooks, fetchError, sanityConfigured } =
    await getJournalEntries()

  return (
    <JournalIndexTemplate
      editorials={editorials}
      lookbooks={lookbooks}
      fetchError={fetchError}
      sanityConfigured={sanityConfigured}
    />
  )
}
