import { HttpTypes } from "@medusajs/types"

import { getProductsList, getProductsById } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/common/components/xyz/Container"
import { PhysicalProductCard } from "@modules/store/components/physical-product-card"
import { buildPhysicalProductCardProps } from "@modules/store/lib/build-physical-product-card-props"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductParams & HttpTypes.FindParams = {
    limit: 12,
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) =>
    response.products.filter((p) => p.id !== product.id)
  )

  if (!products.length) {
    return null
  }

  const ids = products.map((p) => p.id).filter(Boolean) as string[]
  const pricedProducts =
    ids.length > 0
      ? await getProductsById({ ids, regionId: region.id })
      : []
  const pricedById = new Map(pricedProducts.map((p) => [p.id, p]))

  return (
    <Container>
      <div className="mb-12 flex flex-col gap-4 border-b border-deepBlack pb-6 text-left md:mb-16">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          Related
        </span>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-light tracking-tight text-deepBlack md:text-4xl">
            You might also like
          </h2>
          <p className="max-w-md text-sm font-light text-neutral-500">
            Same form language — physical pieces from the same collection.
          </p>
        </div>
      </div>

      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const priced = (p.id ? pricedById.get(p.id) : null) ?? p
          const cardProps = buildPhysicalProductCardProps(priced)
          if (!cardProps) {
            return null
          }
          return (
            <li key={p.id}>
              <PhysicalProductCard {...cardProps} />
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
