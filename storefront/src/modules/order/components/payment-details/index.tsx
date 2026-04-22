import { CreditCard } from "@medusajs/icons"
import { isStripe, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import { checkoutSectionTitle } from "@modules/checkout/components/checkout-ui"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]
  const providerId = payment?.provider_id
  const info =
    payment && providerId
      ? (paymentInfoMap[providerId] ?? {
          title: providerId,
          icon: <CreditCard />,
        })
      : null

  return (
    <div className="border-t border-neutral-200 pt-10 md:pt-12">
      <h2 className={`mb-6 md:mb-8 ${checkoutSectionTitle}`}>Payment</h2>
      {payment && info ? (
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-x-12">
          <div className="min-w-[10rem] flex-1 flex-col">
            <p className="mb-2 text-sm font-bold text-deepBlack">
              Payment method
            </p>
            <p
              className="text-sm text-neutral-500"
              data-testid="payment-method"
            >
              {info.title}
            </p>
          </div>
          <div className="min-w-[10rem] flex-[2] flex-col">
            <p className="mb-2 text-sm font-bold text-deepBlack">
              Payment details
            </p>
            <div
              className="flex flex-wrap items-center gap-3 text-sm text-neutral-500"
              data-testid="payment-amount"
            >
              <div className="flex h-7 w-fit items-center border border-neutral-200 bg-concrete p-2 text-deepBlack">
                {info.icon}
              </div>
              <span>
                {isStripe(providerId) && payment.data?.card_last4
                  ? `•••• ${payment.data.card_last4}`
                  : `${convertToLocale({
                      amount: payment.amount,
                      currency_code: order.currency_code,
                    })} · ${new Date(
                      payment.created_at ?? ""
                    ).toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-neutral-500">Payment details unavailable.</p>
      )}
    </div>
  )
}

export default PaymentDetails
