import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { normalizeDigitalPdpSlug } from "@lib/digital/normalize-digital-slug"
import DigitalProductTemplate from "@modules/digital-product/templates/digital-product-template"
import { resolveDigitalProductPage } from "@modules/digital-product/lib/resolve-digital-product-page"

type Params = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const canonical = normalizeDigitalPdpSlug(slug) || slug
  const resolved = await resolveDigitalProductPage(canonical)
  const name = resolved?.context.product?.name
  return {
    title: name ? `${name} | Digital` : "Digital product",
    description: resolved?.context.product?.description ?? undefined,
  }
}

export default async function DigitalProductPage({ params }: Params) {
  const { countryCode, slug: rawSlug } = await params
  const canonical = normalizeDigitalPdpSlug(rawSlug)
  if (!canonical) {
    notFound()
  }
  if (rawSlug !== canonical) {
    redirect(
      `/${countryCode}/digital/${encodeURIComponent(canonical)}`
    )
  }
  const resolved = await resolveDigitalProductPage(canonical)
  if (!resolved?.context.product) {
    notFound()
  }

  const productSlug = resolved.context.product.slug
  if (productSlug && productSlug !== canonical) {
    redirect(
      `/${countryCode}/digital/${encodeURIComponent(productSlug)}`
    )
  }

  return (
    <DigitalProductTemplate
      countryCode={countryCode}
      product={resolved.context.product}
      collectionLabel={resolved.context.collectionLabel}
      pageTitle={resolved.context.title}
      fetchError={resolved.fetchError}
    />
  )
}
