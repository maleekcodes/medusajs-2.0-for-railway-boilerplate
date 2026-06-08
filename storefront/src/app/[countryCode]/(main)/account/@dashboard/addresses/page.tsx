import { Metadata } from "next"
import { notFound } from "next/navigation"

import { buildUtilityPageMetadata } from "@lib/seo/utility"
import AccountPageHeader from "@modules/account/components/account-page-header"
import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export async function generateMetadata(): Promise<Metadata> {
  return buildUtilityPageMetadata(
    "Addresses | XYZ London",
    "View and manage your saved addresses."
  )
}

export default async function Addresses({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <AccountPageHeader title="Shipping addresses">
        Add and manage addresses — saved addresses appear at checkout.
      </AccountPageHeader>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
