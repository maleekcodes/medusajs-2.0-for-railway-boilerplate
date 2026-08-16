import { HttpTypes } from "@medusajs/types"

import { productCreatedAtMs } from "@modules/store/lib/group-products-by-category"

export function splitFeaturedAndOlder(
  products: HttpTypes.StoreProduct[],
  featuredHandle?: string | null
): {
  featured: HttpTypes.StoreProduct | null
  older: HttpTypes.StoreProduct[]
} {
  if (!products.length) {
    return { featured: null, older: [] }
  }

  const newestFirst = [...products].sort(
    (a, b) => productCreatedAtMs(b) - productCreatedAtMs(a)
  )

  const requested = featuredHandle
    ? newestFirst.find((product) => product.handle === featuredHandle)
    : undefined

  const featured = requested ?? newestFirst[0] ?? null
  if (!featured) {
    return { featured: null, older: [] }
  }

  return {
    featured,
    older: newestFirst.filter((product) => product.id !== featured.id),
  }
}
