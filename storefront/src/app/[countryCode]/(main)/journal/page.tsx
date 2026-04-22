import type { Metadata } from "next"

import { getJournalEntries } from "@lib/sanity/queries"
import JournalIndexTemplate from "@modules/journal/templates/journal-index-template"

export const metadata: Metadata = {
  title: "Journal | XYZ London",
  description:
    "The narrative of form. A visual archive of our process, inspiration, and dialogue.",
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
