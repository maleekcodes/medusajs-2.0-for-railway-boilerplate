import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 small:flex-row small:justify-between small:items-start">
        <span
          className="text-xl-regular text-deepBlack"
          data-testid="welcome-message"
          data-value={customer?.first_name}
        >
          Hello {customer?.first_name}
        </span>
        <span className="text-small-regular text-neutral-500">
          Signed in as:{" "}
          <span
            className="font-medium text-deepBlack"
            data-testid="customer-email"
            data-value={customer?.email}
          >
            {customer?.email}
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-10 pt-8 border-t border-neutral-100">
        <div className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
              Profile
            </h3>
            <div className="flex items-end gap-x-2">
              <span
                className="text-3xl-semi leading-none text-deepBlack"
                data-testid="customer-profile-completion"
                data-value={getProfileCompletion(customer)}
              >
                {getProfileCompletion(customer)}%
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Completed
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
              Addresses
            </h3>
            <div className="flex items-end gap-x-2">
              <span
                className="text-3xl-semi leading-none text-deepBlack"
                data-testid="addresses-count"
                data-value={customer?.addresses?.length || 0}
              >
                {customer?.addresses?.length || 0}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Saved
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-deepBlack">
            Recent orders
          </h3>
          <ul className="flex flex-col gap-3" data-testid="orders-wrapper">
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                return (
                  <li
                    key={order.id}
                    data-testid="order-wrapper"
                    data-value={order.id}
                  >
                    <LocalizedClientLink
                      href={`/account/orders/details/${order.id}`}
                      className="block"
                    >
                      <div className="border border-neutral-100 bg-concrete/80 flex justify-between items-center gap-4 p-4 hover:border-deepBlack/20 transition-colors">
                        <div className="grid grid-cols-1 xsmall:grid-cols-3 gap-x-4 gap-y-1 text-small-regular flex-1 min-w-0">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                              Date
                            </span>
                            <span
                              className="text-deepBlack"
                              data-testid="order-created-date"
                            >
                              {new Date(order.created_at).toDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                              Order
                            </span>
                            <span
                              className="font-medium text-deepBlack"
                              data-testid="order-id"
                              data-value={order.display_id}
                            >
                              #{order.display_id}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                              Total
                            </span>
                            <span data-testid="order-amount" className="text-deepBlack">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="flex items-center justify-center shrink-0 text-deepBlack"
                          data-testid="open-order-button"
                        >
                          <span className="sr-only">
                            Go to order #{order.display_id}
                          </span>
                          <ChevronDown className="-rotate-90" />
                        </button>
                      </div>
                    </LocalizedClientLink>
                  </li>
                )
              })
            ) : (
              <span className="text-sm text-neutral-500" data-testid="no-orders-message">
                No recent orders
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
