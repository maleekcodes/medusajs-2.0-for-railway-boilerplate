import type { Metadata } from "next"

import ShippingPolicyTemplate from "@modules/legal/templates/shipping-policy-template"

export const metadata: Metadata = {
  title: "Shipping Policy | XYZ London",
  description:
    "Shipping, processing, duties, tracking, and OOO timelines for XYZ London orders.",
}

export default function ShippingPolicyPage() {
  return <ShippingPolicyTemplate />
}
