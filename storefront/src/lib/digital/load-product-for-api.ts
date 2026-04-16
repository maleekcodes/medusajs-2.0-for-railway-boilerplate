import "server-only"

import { resolveDigitalProductPage } from "@modules/digital-product/lib/resolve-digital-product-page"
import type { DigitalProductDetailSanity } from "@/types/xyz"

import { getPrimaryProductImageUrl } from "./product-image"

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
