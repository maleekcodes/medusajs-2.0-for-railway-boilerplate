"use client"

import { HttpTypes } from "@medusajs/types"

import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="bg-concrete p-6 md:p-8 lg:sticky lg:top-28">
      <h2 className="text-xl font-bold text-deepBlack mb-8">Order summary</h2>
      <div className="mb-8">
        <DiscountCode cart={cart} variant="xyz" />
      </div>
      <CartTotals totals={cart} variant="xyz" />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="mt-8 block w-full bg-deepBlack py-4 text-center text-sm font-mono uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
      >
        Proceed to checkout
      </LocalizedClientLink>
      <LocalizedClientLink
        href="/store"
        className="mt-4 block w-full py-4 text-center text-sm text-neutral-500 transition-colors hover:text-deepBlack"
      >
        Continue shopping
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
