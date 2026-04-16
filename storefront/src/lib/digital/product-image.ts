import type { DigitalProductDetailSanity } from "@/types/xyz"

export function getPrimaryProductImageUrl(
  product: DigitalProductDetailSanity
): string | null {
  const gallery = (product.galleryImages ?? []).filter(
    (u): u is string => typeof u === "string" && u.length > 0
  )
  if (gallery[0]) {
    return gallery[0]
  }
  if (product.previewImage) {
    return product.previewImage
  }
  return null
}
