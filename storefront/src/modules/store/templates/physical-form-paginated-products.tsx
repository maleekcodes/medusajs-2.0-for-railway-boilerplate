import { listCategories } from "@lib/data/categories"
import {
  getPhysicalStoreCatalogProducts,
  getProductsById,
} from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { PhysicalProductCard } from "@modules/store/components/physical-product-card"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { buildPhysicalProductCardProps } from "@modules/store/lib/build-physical-product-card-props"
import { groupProductsByTopLevelCategory } from "@modules/store/lib/group-products-by-category"

export default async function PhysicalFormPaginatedProducts({
  sortBy,
  countryCode,
}: {
  sortBy?: SortOptions
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const [sorted, allCategories] = await Promise.all([
    getPhysicalStoreCatalogProducts({
      sortBy: sortBy ?? "created_at",
      countryCode,
    }),
    listCategories(),
  ])

  const ids = sorted.map((p) => p.id).filter(Boolean) as string[]
  const pricedProducts =
    ids.length > 0
      ? await getProductsById({ ids, regionId: region.id })
      : []
  const pricedById = new Map(pricedProducts.map((p) => [p.id, p]))

  const enriched = sorted
    .map((p) => (p.id ? pricedById.get(p.id) : null) ?? p)
    .filter(Boolean) as typeof pricedProducts

  const sections = groupProductsByTopLevelCategory(enriched, allCategories)

  if (sections.length === 0) {
    return (
      <p className="font-mono text-sm text-neutral-500" data-testid="products-list">
        No products in this catalog yet.
      </p>
    )
  }

  return (
    <div className="space-y-16 md:space-y-20" data-testid="products-list">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`cat-${section.id}`}>
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-neutral-200 pb-4">
            <h3
              id={`cat-${section.id}`}
              className="text-xl font-bold tracking-tight text-deepBlack md:text-2xl"
            >
              {section.name}
            </h3>
            <span className="font-mono text-xs text-neutral-400">
              {section.products.length}
            </span>
          </div>
          <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {section.products.map((p) => {
              const cardProps = buildPhysicalProductCardProps(p)
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
        </section>
      ))}
    </div>
  )
}
