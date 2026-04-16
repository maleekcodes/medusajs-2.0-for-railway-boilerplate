import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getJournalPost } from "@lib/sanity/queries"
import JournalPostTemplate from "@modules/journal/templates/journal-post-template"

export const revalidate = 60

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getJournalPost(slug)
  if (!post) {
    return { title: "Journal | XYZ London" }
  }
  return {
    title: `${post.title} | XYZ London Journal`,
    description: post.excerpt ?? undefined,
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getJournalPost(slug)
  if (!post) {
    notFound()
  }

  return <JournalPostTemplate post={post} />
}
