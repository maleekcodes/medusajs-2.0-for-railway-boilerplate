import "server-only"

import type {
  DigitalFormPageSanity,
  DigitalProductDetailSanity,
  JournalEntry,
  HomePageSanity,
  AboutPageSanity,
  ArFitPageSanity,
  PrivateExpressionsPageSanity,
  SiteFooterSanity,
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

// ============ Home Page ============

const homePageQuery = `*[_type == "homePage"][0] {
  heroHeadline,
  heroSubheadline,
  heroCta,
  heroFigureLabels {
    physical,
    digital
  },
  introLabel,
  introHeadline,
  introHeadlineAccent,
  introParagraph,
  introText,
  philosophyTitle,
  philosophyComingLabel,
  philosophyParagraph1,
  philosophyParagraph2,
  philosophyCtaLabel,
  manifestoLines,
  arFitLabel,
  arFitTitle,
  arFitParagraph,
  arFitCtaLabel
}`

export type HomePageResult = {
  page: HomePageSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getHomePage(): Promise<HomePageResult> {
  const client = getSanityClient()
  if (!client) {
    return { page: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const page = await client.fetch<HomePageSanity | null>(homePageQuery)
    return {
      page: page ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity home page fetch error:", e)
    return { page: null, sanityConfigured: true, fetchError: true }
  }
}

// ============ About Page ============

const aboutPageQuery = `*[_type == "aboutPage"][0] {
  label,
  title,
  leadQuote,
  bodyParagraphs[] {
    _key,
    text,
    column,
    isHighlighted
  },
  sustainabilityNote,
  closingLine1,
  closingLine2,
  tagline,
  seoTitle,
  seoDescription
}`

export type AboutPageResult = {
  page: AboutPageSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getAboutPage(): Promise<AboutPageResult> {
  const client = getSanityClient()
  if (!client) {
    return { page: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const page = await client.fetch<AboutPageSanity | null>(aboutPageQuery)
    return {
      page: page ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity about page fetch error:", e)
    return { page: null, sanityConfigured: true, fetchError: true }
  }
}

// ============ AR Fit (Virtual Try-On) Page ============

const arFitPageQuery = `*[_type == "arFitPage"][0] {
  label,
  title,
  subtitle,
  subtitleLine2,
  ctaLabel,
  philosophyHeadline,
  philosophyHeadlineLine2,
  philosophyParagraph1,
  philosophyParagraph2,
  stepsHeading,
  steps[] {
    _key,
    id,
    title,
    description,
    shape
  },
  privacyBadge,
  privacyText,
  versionLabel,
  seoTitle,
  seoDescription
}`

export type ArFitPageResult = {
  page: ArFitPageSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getArFitPage(): Promise<ArFitPageResult> {
  const client = getSanityClient()
  if (!client) {
    return { page: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const page = await client.fetch<ArFitPageSanity | null>(arFitPageQuery)
    return {
      page: page ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity AR fit page fetch error:", e)
    return { page: null, sanityConfigured: true, fetchError: true }
  }
}

// ============ Private expressions (OOO) ============

const privateExpressionsPageQuery = `*[_type == "privateExpressionsPage"][0] {
  seoTitle,
  seoDescription,
  eyebrowLabel,
  headline,
  focalLine,
  narrativeParagraph1,
  narrativeParagraph2,
  closingLine,
  formIntro,
  hubspotFormUrl,
  contactEmail,
  backToHomeLabel,
  homeTeaserTitle,
  homeTeaserLine1,
  homeTeaserLine2,
  homeTeaserButtonLabel
}`

export type PrivateExpressionsPageResult = {
  page: PrivateExpressionsPageSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getPrivateExpressionsPage(): Promise<PrivateExpressionsPageResult> {
  const client = getSanityClient()
  if (!client) {
    return { page: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const page = await client.fetch<PrivateExpressionsPageSanity | null>(
      privateExpressionsPageQuery
    )
    return {
      page: page ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity private expressions page fetch error:", e)
    return { page: null, sanityConfigured: true, fetchError: true }
  }
}

// ============ Site footer ============

const siteFooterQuery = `*[_type == "siteFooter"][0] {
  brandSectionHeading,
  brandBodyLines,
  brandStoryLinkLabel,
  brandStoryLinkPath,
  productSectionHeading,
  productItems[]{ _key, label, internalPath },
  legalSectionHeading,
  legalLinks[]{ _key, label, path },
  connectSectionHeading,
  connectLinks[]{ _key, label, href },
  bottomTagline,
  copyrightName
}`

export type SiteFooterResult = {
  footer: SiteFooterSanity | null
  sanityConfigured: boolean
  fetchError: boolean
}

export async function getSiteFooter(): Promise<SiteFooterResult> {
  const client = getSanityClient()
  if (!client) {
    return { footer: null, sanityConfigured: false, fetchError: false }
  }

  try {
    const footer = await client.fetch<SiteFooterSanity | null>(siteFooterQuery)
    return {
      footer: footer ?? null,
      sanityConfigured: true,
      fetchError: false,
    }
  } catch (e) {
    console.error("Sanity site footer fetch error:", e)
    return { footer: null, sanityConfigured: true, fetchError: true }
  }
}
