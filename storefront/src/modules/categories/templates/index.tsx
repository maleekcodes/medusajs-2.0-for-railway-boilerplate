import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getProductsById, getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { CategoryFeaturedProduct } from "@modules/categories/components/category-featured-product"
import { splitFeaturedAndOlder } from "@modules/categories/lib/split-featured-product"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { PhysicalProductCard } from "@modules/store/components/physical-product-card"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { buildPhysicalProductCardProps } from "@modules/store/lib/build-physical-product-card-props"
import { sortProducts } from "@lib/util/sort-products"

export default async function CategoryTemplate({
  categories,
  sortBy,
  countryCode,
  featuredHandle,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  featuredHandle?: string
}) {
  const sort = sortBy || "created_at"
  const category = categories[categories.length - 1]
  const parents = categories.slice(0, -1)

  if (!category || !countryCode) notFound()

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await getProductsList({
    pageParam: 1,
    queryParams: {
      limit: 100,
      fields:
        "*variants.calculated_price,*categories,*collection,*images,+thumbnail",
      category_id: [category.id],
    } as Parameters<typeof getProductsList>[0]["queryParams"],
    countryCode,
  })

  const { featured, older } = splitFeaturedAndOlder(products, featuredHandle)

  const featuredPriced = featured?.id
    ? (await getProductsById({ ids: [featured.id], regionId: region.id }))[0]
    : null
  const featuredProduct = featuredPriced ?? featured

  const olderSorted = sortProducts(older, sort)
  const olderIds = olderSorted.map((p) => p.id).filter(Boolean) as string[]
  const olderPriced =
    olderIds.length > 0
      ? await getProductsById({ ids: olderIds, regionId: region.id })
      : []
  const olderById = new Map(olderPriced.map((p) => [p.id, p]))
  const olderEnriched = olderSorted.map(
    (p) => (p.id ? olderById.get(p.id) : null) ?? p
  )

  return (
    <div
      className="bg-white text-deepBlack pt-16 pb-24 min-h-screen"
      data-testid="category-container"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-baseline gap-3">
          {parents.map((parent) => (
            <span key={parent.id} className="font-mono text-xs text-neutral-400">
              <LocalizedClientLink
                className="hover:text-deepBlack transition-colors"
                href={`/categories/${parent.handle}`}
                data-testid="sort-by-link"
              >
                {parent.name}
              </LocalizedClientLink>
              <span className="mx-2">/</span>
            </span>
          ))}
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tighter text-balance"
            data-testid="category-page-title"
          >
            {category.name}
          </h1>
        </div>

        {category.description && (
          <p className="mb-12 max-w-2xl text-neutral-600 text-pretty">
            {category.description}
          </p>
        )}

        {category.category_children && category.category_children.length > 0 && (
          <ul className="mb-12 flex flex-wrap gap-4">
            {category.category_children.map((child) => (
              <li key={child.id}>
                <InteractiveLink href={`/categories/${child.handle}`}>
                  {child.name}
                </InteractiveLink>
              </li>
            ))}
          </ul>
        )}

        {featuredProduct ? (
          <CategoryFeaturedProduct product={featuredProduct} region={region} />
        ) : (
          <p className="font-mono text-sm text-neutral-500">
            No products in this category yet.
          </p>
        )}

        {olderEnriched.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-neutral-200 pb-4">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                More in {category.name}
              </h2>
              <span className="font-mono text-xs text-neutral-400">
                {olderEnriched.length}
              </span>
            </div>
            <Suspense fallback={<SkeletonProductGrid />}>
              <ul
                className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                data-testid="products-list"
              >
                {olderEnriched.map((product) => {
                  const cardProps = buildPhysicalProductCardProps(product)
                  if (!cardProps) return null
                  return (
                    <li key={product.id}>
                      <PhysicalProductCard {...cardProps} />
                    </li>
                  )
                })}
              </ul>
            </Suspense>
          </section>
        )}
      </Container>
    </div>
  )
}
