import { Suspense } from "react"

import { Container } from "@modules/common/components/xyz/Container"
import { PhysicalFutureForms } from "@modules/store/components/physical-future-forms"
import { PhysicalFormStoreHero } from "@modules/store/components/physical-form-store-hero"
import { PhysicalStoreSortBar } from "@modules/store/components/physical-store-sort-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

import PhysicalFormPaginatedProducts from "./physical-form-paginated-products"

const PhysicalFormStoreTemplate = ({
  sortBy,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const sort = sortBy || "created_at"

  return (
    <div
      className="pt-16 pb-24 bg-white text-deepBlack min-h-screen"
      data-testid="category-container"
    >
      <Container>
        <PhysicalFormStoreHero />

        <div className="sticky top-16 z-40 -mx-6 mb-12 bg-white px-6 py-4 md:-mx-12 md:px-12">
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

        <PhysicalFutureForms />
      </Container>
    </div>
  )
}

export default PhysicalFormStoreTemplate
