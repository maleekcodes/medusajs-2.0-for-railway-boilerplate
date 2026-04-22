import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import { checkoutSectionTitle } from "@modules/checkout/components/checkout-ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const method = order.shipping_methods?.[0]
  const shippingTotal = method?.total ?? 0

  return (
    <div className="border-t border-neutral-200 pt-10 md:pt-12">
      <h2 className={`mb-6 md:mb-8 ${checkoutSectionTitle}`}>Delivery</h2>
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
        <div
          className="min-w-[10rem] flex-1 flex-col"
          data-testid="shipping-address-summary"
        >
          <p className="mb-2 text-sm font-bold text-deepBlack">
            Shipping address
          </p>
          <p className="text-sm text-neutral-500">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </p>
          <p className="text-sm text-neutral-500">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </p>
          <p className="text-sm text-neutral-500">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </p>
          <p className="text-sm text-neutral-500">
            {order.shipping_address?.country_code?.toUpperCase()}
          </p>
        </div>

        <div
          className="min-w-[10rem] flex-1 flex-col"
          data-testid="shipping-contact-summary"
        >
          <p className="mb-2 text-sm font-bold text-deepBlack">Contact</p>
          <p className="text-sm text-neutral-500">
            {order.shipping_address?.phone}
          </p>
          <p className="text-sm text-neutral-500">{order.email}</p>
        </div>

        <div
          className="min-w-[10rem] flex-1 flex-col"
          data-testid="shipping-method-summary"
        >
          <p className="mb-2 text-sm font-bold text-deepBlack">Method</p>
          <p className="text-sm text-neutral-500">
            {method?.name ? (
              <>
                {method.name}{" "}
                <span className="tabular-nums">
                  (
                  {convertToLocale({
                    amount: shippingTotal,
                    currency_code: order.currency_code,
                  })}
                  )
                </span>
              </>
            ) : (
              "—"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
