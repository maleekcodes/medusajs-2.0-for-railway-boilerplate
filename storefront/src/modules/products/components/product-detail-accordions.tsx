"use client"

import { HttpTypes } from "@medusajs/types"

import Accordion from "@modules/products/components/product-tabs/accordion"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

type Props = {
  product: HttpTypes.StoreProduct
}

export default function ProductDetailAccordions({ product }: Props) {
  return (
    <div className="w-full">
      <Accordion type="multiple">
        <Accordion.Item
          title="Description"
          headingSize="medium"
          value="description"
        >
          <div
            className="pb-8 pt-2 text-sm font-light leading-relaxed text-neutral-600"
            data-testid="product-description"
          >
            {product.description ? (
              <p className="whitespace-pre-line">{product.description}</p>
            ) : (
              <p className="text-neutral-400">No description available.</p>
            )}
          </div>
        </Accordion.Item>

        <Accordion.Item title="Details" headingSize="medium" value="details">
          <div className="pb-8 pt-2 text-small-regular">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-12">
              <div className="flex flex-col gap-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Material
                  </span>
                  <p className="mt-1 text-deepBlack">
                    {product.material ? product.material : "—"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Country of origin
                  </span>
                  <p className="mt-1 text-deepBlack">
                    {product.origin_country ? product.origin_country : "—"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Type
                  </span>
                  <p className="mt-1 text-deepBlack">
                    {product.type ? product.type.value : "—"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Weight
                  </span>
                  <p className="mt-1 text-deepBlack">
                    {product.weight ? `${product.weight} g` : "—"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Dimensions
                  </span>
                  <p className="mt-1 text-deepBlack">
                    {product.length && product.width && product.height
                      ? `${product.length}L × ${product.width}W × ${product.height}H`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Accordion.Item>

        <Accordion.Item
          title="Shipping & Returns"
          headingSize="medium"
          value="shipping"
        >
          <div className="pb-8 pt-2 text-small-regular">
            <div className="grid grid-cols-1 gap-y-8">
              <div className="flex items-start gap-x-3">
                <FastDelivery />
                <div>
                  <span className="font-semibold text-deepBlack">
                    Fast delivery
                  </span>
                  <p className="mt-1 max-w-md text-neutral-600">
                    Your package will arrive in 3–5 business days at your pick
                    up location or in the comfort of your home.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <Refresh />
                <div>
                  <span className="font-semibold text-deepBlack">
                    Simple exchanges
                  </span>
                  <p className="mt-1 max-w-md text-neutral-600">
                    Is the fit not quite right? We&apos;ll exchange your product
                    for a new one.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <Back />
                <div>
                  <span className="font-semibold text-deepBlack">
                    Easy returns
                  </span>
                  <p className="mt-1 max-w-md text-neutral-600">
                    Return your product for a refund. We&apos;ll do our best to
                    keep returns hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
