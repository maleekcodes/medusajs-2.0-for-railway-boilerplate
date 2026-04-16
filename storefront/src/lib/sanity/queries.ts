import "server-only"

import type {
  DigitalFormPageSanity,
  DigitalProductDetailSanity,
  JournalEntry,
} from "@/types/xyz"

import {
  normalizeDigitalPdpSlug,
  resolveDigitalSlugFromCatalog,
} from "@lib/digital/normalize-digital-slug"

import { getSanityClient } from "./client"

const journalEntriesQuery = `{
  "editorials": *[_type == "journalPost" && category in ["Theory", "Process", "Dialogue"]] | order(publishedAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    "date": publishedAt,
    "shape": featuredShape,
    excerpt
  },
  "lookbooks": *[_type == "journalPost" && category in ["Lookbook", "Campaign"]] | order(publishedAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    "date": publishedAt,
    "shape": featuredShape,
    excerpt
  }
}`

const digitalFormPageQuery = `*[_type == "digitalFormPage"][0] {
  collectionLabel,
  title,
  description,
  seoTitle,
  seoDescription,
  digitalProducts[] {
    _key,
    "slug": slug.current,
    name,
    line,
    category,
    description,
    shape,
    statusLabel,
    price,
    currency,
    isFeatured,
    isComingSoon,
    platforms,
    medusaHandle,
    externalLinks,
    "previewImage": images[0].asset->url,
    "galleryImages": images[].asset->url
  }
}`

const digitalProductFields = `
    _key,
    "slug": coalesce(slug.current, _key),
    name,
    line,
    category,
    description,
    shape,
    statusLabel,
    price,
    currency,
    isFeatured,
    isComingSoon,
    platforms,
    medusaHandle,
    externalLinks,
    "previewImage": images[0].asset->url,
    "galleryImages": images[].asset->url
`

const digitalProductBySlugQuery = `*[_type == "digitalFormPage"][0] {
  collectionLabel,
  title,
  description,
  "product": digitalProducts[
    slug.current == $slug
    || _key == $slug
    || (defined(slug.current) && slug.current == "digital/" + $slug)
    || (defined(slug.current) && slug.current == "digital-" + $slug)
  ][0] {
    ${digitalProductFields}
  }
}`

const digitalProductByKeyQuery = `*[_type == "digitalFormPage"][0] {
  collectionLabel,
  title,
  description,
  "product": digitalProducts[_key == $key][0] {
    ${digitalProductFields}
  }
}`

const digitalFormProductSlugListQuery = `*[_type == "digitalFormPage"][0]{
  "items": digitalProducts[]{
    "_key": _key,
    "c": coalesce(slug.current, _key)
  }
}`

const journalPostQuery = `*[_type == "journalPost" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  title,
  category,
  "date": publishedAt,
  "shape": featuredShape,
  excerpt,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    }
  },
  "featuredImage": featuredImage.asset->url,
  "featuredImageAspect": featuredImage.asset->metadata.dimensions.aspectRatio,
  isFeatured
}`

export type JournalIndexResult = {
  editorials: JournalEntry[]
  lookbooks: JournalEntry[]
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getJournalEntries(): Promise<JournalIndexResult> {
  const client = getSanityClient()
  if (!client) {
    return {
      editorials: [],
      lookbooks: [],
      sanityConfigured: false,
      fetchError: false,
    }
  }

  try {
    const data = await client.fetch<{
      editorials: JournalEntry[]
      lookbooks: JournalEntry[]
    }>(journalEntriesQuery)
    return {
      editorials: data?.editorials ?? [],
      lookbooks: data?.lookbooks ?? [],
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity journal entries fetch error:", e)
    return {
      editorials: [],
      lookbooks: [],
      sanityConfigured: true,
      fetchError: true,
    }
  }
}

export type DigitalFormPageResult = {
  page: DigitalFormPageSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getDigitalFormPage(): Promise<DigitalFormPageResult> {
  const client = getSanityClient()
  if (!client) {
    return { page: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const page = await client.fetch<DigitalFormPageSanity | null>(
      digitalFormPageQuery
    )
    return {
      page: page ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity digital form page fetch error:", e)
    return { page: null, sanityConfigured: true, fetchError: true }
  }
}

export type DigitalProductPageResult = {
  collectionLabel?: string | null
  title?: string | null
  description?: string | null
  product: DigitalProductDetailSanity | null
}

export async function getDigitalProductBySlug(
  slug: string
): Promise<{
  data: DigitalProductPageResult | null
  sanityConfigured: boolean
  fetchError: boolean
}> {
  const client = getSanityClient()
  if (!client) {
    return { data: null, sanityConfigured: false, fetchError: false }
  }

  const normalizedSlug = normalizeDigitalPdpSlug(slug)
  if (!normalizedSlug) {
    return { data: null, sanityConfigured: true, fetchError: false }
  }

  try {
    let data = await client.fetch<DigitalProductPageResult | null>(
      digitalProductBySlugQuery,
      { slug: normalizedSlug }
    )

    let slugRows: {
      items?: { _key?: string; c?: string | null }[] | null
    } | null = null

    if (!data?.product) {
      slugRows = await client.fetch<{
        items?: { _key?: string; c?: string | null }[] | null
      } | null>(digitalFormProductSlugListQuery)

      const items = slugRows?.items ?? []
      const hit = items.find((row) => {
        if (!row.c || typeof row.c !== "string") {
          return false
        }
        return normalizeDigitalPdpSlug(row.c) === normalizedSlug
      })
      if (hit?._key) {
        data = await client.fetch<DigitalProductPageResult | null>(
          digitalProductByKeyQuery,
          { key: hit._key }
        )
      }

      if (!data?.product) {
        const catalog = items
          .map((row) => row.c)
          .filter((c): c is string => typeof c === "string" && c.length > 0)
        const resolved = resolveDigitalSlugFromCatalog(
          normalizedSlug,
          catalog
        )
        if (resolved && resolved !== normalizedSlug) {
          data = await client.fetch<DigitalProductPageResult | null>(
            digitalProductBySlugQuery,
            { slug: resolved }
          )
        }
      }
    }

    if (!data?.product) {
      return { data: null, sanityConfigured: true, fetchError: false }
    }
    const canon =
      normalizeDigitalPdpSlug(
        (data.product.slug || data.product._key || "") as string
      ) || normalizedSlug
    return {
      data: {
        ...data,
        product: { ...data.product, slug: canon },
      },
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity digital product fetch error:", e)
    return { data: null, sanityConfigured: true, fetchError: true }
  }
}

export async function getJournalPost(
  slug: string
): Promise<JournalEntry | null> {
  const client = getSanityClient()
  if (!client) {
    return null
  }

  try {
    const post = await client.fetch<JournalEntry | null>(journalPostQuery, {
      slug,
    })
    return post
  } catch (e) {
    console.error("Sanity journal post fetch error:", e)
    return null
  }
}
