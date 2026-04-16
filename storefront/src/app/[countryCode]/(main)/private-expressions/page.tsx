import { Metadata } from "next"

import PrivateExpressionsLanding from "@modules/private-expressions/components/private-expressions-landing"

export const metadata: Metadata = {
  title: "OOO — Private Expressions | XYZ London",
  description:
    "Request access to Private Expressions — limited releases and member-only expression.",
}

export default function PrivateExpressionsPage() {
  return <PrivateExpressionsLanding />
}
