import { Metadata } from "next"

import { buildUtilityPageMetadata } from "@lib/seo/utility"
import AccountPageHeader from "@modules/account/components/account-page-header"
import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"

export async function generateMetadata(): Promise<Metadata> {
  return buildUtilityPageMetadata(
    "Orders | XYZ London",
    "Overview of your previous orders."
  )
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <AccountPageHeader title="Orders">
        View past orders and open an order for full details.
      </AccountPageHeader>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
