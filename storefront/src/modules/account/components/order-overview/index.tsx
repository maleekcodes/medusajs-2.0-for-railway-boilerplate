"use client"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-10 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-neutral-100 pb-8 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-3 text-center max-w-md mx-auto py-6"
      data-testid="no-orders-container"
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
        No orders yet
      </h2>
      <p className="text-sm text-neutral-500 leading-relaxed">
        When you place an order, it will show up here.
      </p>
      <div className="mt-4">
        <LocalizedClientLink
          href="/"
          className="contrast-btn inline-block text-sm font-medium"
          data-testid="continue-shopping-button"
        >
          Continue shopping
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
