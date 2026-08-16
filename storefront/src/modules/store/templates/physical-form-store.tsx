import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { getPhysicalStoreCatalogProducts } from "@lib/data/products"
import { Container } from "@modules/common/components/xyz/Container"
import { PhysicalFutureForms } from "@modules/store/components/physical-future-forms"
import { PhysicalFormStoreHero } from "@modules/store/components/physical-form-store-hero"
import { PhysicalStoreSortBar } from "@modules/store/components/physical-store-sort-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import {
  groupProductsByAssignedCategory,
  listComingSoonCategories,
} from "@modules/store/lib/group-products-by-category"

import PhysicalFormPaginatedProducts from "./physical-form-paginated-products"

const PhysicalFormStoreTemplate = async ({
  sortBy,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const sort = sortBy || "created_at"

  const [sorted, allCategories] = await Promise.all([
    getPhysicalStoreCatalogProducts({
      sortBy: sort,
      countryCode,
    }),
    listCategories(),
  ])

  const sections = groupProductsByAssignedCategory(sorted, allCategories)
  const comingSoon = listComingSoonCategories(allCategories, sections)

  return (
    <div
      className="pt-16 pb-24 bg-white text-deepBlack min-h-screen"
      data-testid="category-container"
    >
      <Container>
        <PhysicalFormStoreHero />

        <div className="sticky top-24 z-40 -mx-6 mb-12 bg-white px-6 py-4 md:-mx-12 md:px-12">
          <PhysicalStoreSortBar sortBy={sort} data-testid="sort-by-container" />
        </div>

        <section className="mb-32">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PhysicalFormPaginatedProducts
              sortBy={sort}
              countryCode={countryCode}
            />
          </Suspense>
        </section>

        <PhysicalFutureForms items={comingSoon} />
      </Container>
    </div>
  )
}

export default PhysicalFormStoreTemplate
