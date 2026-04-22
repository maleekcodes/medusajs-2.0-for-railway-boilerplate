"use client"

import { XMark } from "@medusajs/icons"
import React from "react"

import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-6">
      <div className="flex flex-col-reverse gap-4 small:flex-row small:gap-2 small:justify-between small:items-center">
        <h1 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
          Order details
        </h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-sm text-neutral-500 hover:text-deepBlack transition-colors shrink-0"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to orders
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 h-full bg-white w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items items={order.items} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
