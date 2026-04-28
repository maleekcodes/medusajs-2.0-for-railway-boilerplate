import { Metadata } from "next"

import PrivateExpressionsLanding from "@modules/private-expressions/components/private-expressions-landing"

export const metadata: Metadata = {
  title: "OOO — Highest Expression | XYZ London",
  description:
    "OOO is the highest expression of XYZ London. Beyond season and trend—reserved for those who recognise intention.",
}

export default function PrivateExpressionsPage() {
  return <PrivateExpressionsLanding />
}
