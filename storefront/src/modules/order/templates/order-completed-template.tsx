import { cookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookieStore = await cookies()
  const isOnboarding =
    cookieStore.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-screen bg-white pb-24 pt-28 text-deepBlack">
      <Container data-testid="order-complete-container">
        {isOnboarding ? <OnboardingCta orderId={order.id} /> : null}

        <div className="max-w-3xl">
          <div className="mb-10 md:mb-14">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">
              Thank you
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 md:text-base">
              Your order was placed successfully.
            </p>
          </div>

          <OrderDetails order={order} />

          <div className="mt-10 border-t border-neutral-200 pt-10 md:mt-12 md:pt-12">
            <h2 className="mb-6 text-xl font-bold text-deepBlack md:mb-8">
              Summary
            </h2>
            <Items items={order.items} />
            <div className="mt-8 bg-concrete p-6 md:p-8">
              <CartTotals totals={order} variant="xyz" />
            </div>
          </div>

          <div className="mt-10 space-y-10 md:mt-12">
            <ShippingDetails order={order} />
            <PaymentDetails order={order} />
          </div>

          <Help />

          <LocalizedClientLink
            href="/store"
            className="mt-12 inline-block w-full border border-deepBlack bg-white py-4 text-center text-sm font-mono uppercase tracking-widest text-deepBlack transition-colors hover:bg-neutral-100 md:mt-14 md:max-w-xs"
          >
            Continue shopping
          </LocalizedClientLink>
        </div>
      </Container>
    </div>
  )
}
