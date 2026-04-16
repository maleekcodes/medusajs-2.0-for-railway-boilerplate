import { Metadata } from "next"

import { getCustomer } from "@lib/data/customer"
import PrivateExpressionsAuthGate from "@modules/private-expressions/components/auth-gate"
import PrivateExpressionsComingSoon from "@modules/private-expressions/components/private-expressions-coming-soon"

export const metadata: Metadata = {
  title: "Private Expressions | XYZ London",
  description:
    "Secure entry to Private Expressions — sign in for member access.",
}

export default async function PrivateExpressionsPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await getCustomer()

  if (customer) {
    return <PrivateExpressionsComingSoon />
  }

  return <PrivateExpressionsAuthGate countryCode={countryCode} />
}
