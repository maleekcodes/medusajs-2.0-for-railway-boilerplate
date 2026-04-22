import { HttpTypes } from "@medusajs/types"

import { getProductPrice } from "@lib/util/get-product-price"
import type { PhysicalProductCardProps } from "@modules/store/components/physical-product-card"

function truncateText(text: string | null | undefined, max = 96): string {
  if (!text) return ""
  const t = text.replace(/\s+/g, " ").trim()
  return t.length > max ? `${t.slice(0, max)}…` : t
}

function extractSwatchLabels(product: HttpTypes.StoreProduct): string[] {
  const labels = new Set<string>()
  for (const variant of product.variants ?? []) {
    for (const opt of variant.options ?? []) {
      const title = opt.option?.title?.toLowerCase() ?? ""
      if (
        title.includes("color") ||
        title.includes("colour") ||
        title.includes("finish")
      ) {
        const v = opt.value
        if (v) labels.add(v)
      }
    }
    if (labels.size >= 4) break
  }
  return [...labels].slice(0, 4)
}

function subtitleForProduct(product: HttpTypes.StoreProduct): string {
  const fromDesc = truncateText(product.description ?? undefined)
  if (fromDesc) return fromDesc
  const cat = product.categories?.[0]?.name
  if (cat) return cat
  return product.type?.value ?? "Physical"
}

export function buildPhysicalProductCardProps(
  priced: HttpTypes.StoreProduct
): PhysicalProductCardProps | null {
  if (!priced.handle) {
    return null
  }

  const { cheapestPrice } = getProductPrice({ product: priced })
  const imageUrl =
    priced.thumbnail ??
    (priced.images?.[0] as { url?: string } | undefined)?.url ??
    null

  const lineLabel =
    priced.collection?.title?.slice(0, 28) || "XYZ London"

  return {
    handle: priced.handle,
    title: priced.title ?? "",
    subtitle: subtitleForProduct(priced),
    lineLabel,
    imageUrl,
    priceFormatted: cheapestPrice?.calculated_price ?? null,
    originalPriceFormatted:
      cheapestPrice?.price_type === "sale"
        ? cheapestPrice.original_price
        : undefined,
    priceIsSale: cheapestPrice?.price_type === "sale",
    swatchLabels: extractSwatchLabels(priced),
  }
}
