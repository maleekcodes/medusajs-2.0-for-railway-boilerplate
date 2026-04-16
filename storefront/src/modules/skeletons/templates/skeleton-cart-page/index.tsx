import repeat from "@lib/util/repeat"

import SkeletonCartLineCard from "@modules/skeletons/components/skeleton-cart-line-card"
import SkeletonCodeForm from "@modules/skeletons/components/skeleton-code-form"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"
import { Container } from "@modules/common/components/xyz/Container"

const SkeletonCartPage = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24 text-deepBlack">
      <Container>
        <div className="mb-10 md:mb-12">
          <div className="h-14 w-48 max-w-full animate-pulse rounded bg-neutral-100 md:h-20 md:w-64" />
          <div className="mt-2 h-4 w-24 animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-0 lg:col-span-2">
            {repeat(3).map((i) => (
              <SkeletonCartLineCard key={i} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <SkeletonOrderSummary />
              <SkeletonCodeForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SkeletonCartPage
