import "server-only"

import { getProductByHandle } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import type { DigitalFormProductDisplay } from "@/types/xyz"

export async function enrichDigitalProductsWithMedusa(
  products: DigitalFormProductDisplay[],
  regionId: string | undefined
): Promise<DigitalFormProductDisplay[]> {
  if (!regionId) {
    return products
  }

  return Promise.all(
    products.map(async (p) => {
      const handle = p.medusaHandle?.trim()
      if (!handle) {
        return p
      }
      try {
        const med = await getProductByHandle(handle, regionId)
        if (!med?.id) {
          return p
        }
        const { cheapestPrice } = getProductPrice({ product: med })
        return {
          ...p,
          medusaFromPrice: cheapestPrice?.calculated_price ?? null,
        }
      } catch {
        return p
      }
    })
  )
}
