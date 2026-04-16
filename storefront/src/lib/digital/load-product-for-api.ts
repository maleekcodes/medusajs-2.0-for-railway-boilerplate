import "server-only"

import { sdk } from "@lib/config"
import { getRegion } from "@lib/data/regions"
import { resolveDigitalProductPage } from "@modules/digital-product/lib/resolve-digital-product-page"
import type { DigitalProductDetailSanity } from "@/types/xyz"

import { getPrimaryProductImageUrl } from "./product-image"
import {
  buildPhysicalTryonSlugKey,
  parsePhysicalTryonSlugKey,
  sanitizeProductHandle,
} from "./physical-tryon-slug"

export async function loadDigitalProductForApi(
  slug: string
): Promise<DigitalProductDetailSanity | null> {
  const resolved = await resolveDigitalProductPage(slug)
  const p = resolved?.context.product
  return p?.slug ? p : null
}

export async function assertProductImageForTryon(
  slug: string
): Promise<{ product: DigitalProductDetailSanity; productImageUrl: string }> {
  const product = await loadDigitalProductForApi(slug)
  if (!product) {
    throw new Error("Product not found")
  }
  const productImageUrl = getPrimaryProductImageUrl(product)
  if (!productImageUrl) {
    throw new Error("Product has no image for try-on")
  }
  return { product, productImageUrl }
}

function medusaPrimaryImageUrl(product: {
  thumbnail?: string | null
  images?: { url?: string | null }[] | null
}): string | null {
  const fromImages = product.images?.find((i) => i?.url?.trim())?.url?.trim()
  if (fromImages) {
    return fromImages
  }
  const t = product.thumbnail?.trim()
  return t || null
}

/**
 * Medusa physical product image for virtual try-on (server-only).
 */
export async function assertMedusaProductImageForTryon(
  handle: string,
  countryCode: string
): Promise<{ productImageUrl: string; slugKey: string }> {
  const h = sanitizeProductHandle(handle)
  if (!h) {
    throw new Error("Product not found")
  }
  const region = await getRegion(countryCode.trim().toLowerCase())
  if (!region?.id) {
    throw new Error("Region not found")
  }

  const { products } = await sdk.store.product.list(
    {
      handle: h,
      region_id: region.id,
      fields:
        "*images,+thumbnail,*variants.calculated_price,+variants.inventory_quantity,*categories,*collection",
    },
    { cache: "no-store" }
  )
  const product = products?.[0]
  if (!product) {
    throw new Error("Product not found")
  }
  const productImageUrl = medusaPrimaryImageUrl(product)
  if (!productImageUrl) {
    throw new Error("Product has no image for try-on")
  }
  const medusaHandle = product.handle?.trim() || h
  const slugKey = buildPhysicalTryonSlugKey(countryCode, medusaHandle)
  return { productImageUrl, slugKey }
}

/**
 * Validates try-on slug for both digital (Sanity) and physical (`pt-{cc}-{handle}`) flows.
 */
export async function assertTryOnProductResolvable(
  slug: string
): Promise<void> {
  const physical = parsePhysicalTryonSlugKey(slug)
  if (physical) {
    await assertMedusaProductImageForTryon(physical.handle, physical.countryCode)
    return
  }
  await assertProductImageForTryon(slug)
}
