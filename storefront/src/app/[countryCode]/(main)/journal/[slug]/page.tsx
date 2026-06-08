import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { buildPageMetadata } from "@lib/seo/metadata"
import { getGlobalSeoSettings } from "@lib/seo/sanity"
import { getJournalPost } from "@lib/sanity/queries"
import JournalPostTemplate from "@modules/journal/templates/journal-post-template"

export const revalidate = 60

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [global, post] = await Promise.all([
    getGlobalSeoSettings(),
    getJournalPost(slug),
  ])

  if (!post) {
    return buildPageMetadata({ title: "Journal | XYZ London" }, global)
  }

  return buildPageMetadata(
    {
      title: post.seoTitle?.trim() || `${post.title} | XYZ London Journal`,
      description: post.seoDescription?.trim() || post.excerpt || undefined,
      path: `/journal/${slug}`,
      image: post.featuredImage,
    },
    global
  )
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getJournalPost(slug)
  if (!post) {
    notFound()
  }

  return <JournalPostTemplate post={post} />
}
