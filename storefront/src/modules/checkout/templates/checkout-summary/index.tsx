import { HttpTypes } from "@medusajs/types"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

type CheckoutSummaryProps = {
  cart: HttpTypes.StoreCart & { promotions?: HttpTypes.StorePromotion[] }
}

const CheckoutSummary = ({ cart }: CheckoutSummaryProps) => {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="bg-concrete p-6 md:p-8">
        <h2 className="mb-8 text-xl font-bold text-deepBlack">Order summary</h2>
        <div className="mb-8">
          <DiscountCode cart={cart} variant="xyz" />
        </div>
        <CartTotals totals={cart} variant="xyz" />
        <div className="mt-10 border-t border-neutral-200 pt-10 md:mt-12 md:pt-12">
          <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 md:mb-8">
            In your cart
          </h3>
          <ItemsPreviewTemplate items={cart?.items} variant="xyz" />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
