import type { Metadata } from "next"

import TermsOfServiceTemplate from "@modules/legal/templates/terms-of-service-template"

export const metadata: Metadata = {
  title: "Terms of Service | XYZ London",
  description:
    "Terms governing use of the XYZ London website and services, including OOO.",
}

export default function TermsOfUsePage() {
  return <TermsOfServiceTemplate />
}
