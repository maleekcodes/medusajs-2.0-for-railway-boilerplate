import { Suspense } from "react"

import { getVirtualTryOnApiKey } from "@lib/digital/virtual-tryon-config"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import ProductImageGallery from "@modules/products/components/product-image-gallery"
import ProductActionsWrapper from "@modules/products/templates/product-actions-wrapper"
import ProductInfo from "@modules/products/templates/product-info"

export function CategoryFeaturedProduct({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const tryOnEnabled = Boolean(getVirtualTryOnApiKey())

  return (
    <div
      className="border-b border-neutral-200 pb-16 md:pb-20"
      data-testid="category-featured-product"
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest font-mono rounded-full px-2.5 py-1 bg-deepBlack text-white">
          Latest
        </span>
        <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          Full detail
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7 xl:col-span-8">
          <ProductImageGallery
            images={product.images ?? []}
            thumbnail={product.thumbnail}
            productTitle={product.title ?? "Product"}
          />
        </div>

        <aside className="flex flex-col gap-8 lg:col-span-5 lg:sticky lg:top-24 lg:self-start xl:col-span-4">
          <ProductInfo product={product} compact />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
                tryOnEnabled={tryOnEnabled}
              />
            }
          >
            {product.id ? (
              <ProductActionsWrapper
                id={product.id}
                region={region}
                tryOnEnabled={tryOnEnabled}
              />
            ) : null}
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
