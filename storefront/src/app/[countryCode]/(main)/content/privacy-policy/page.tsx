import type { Metadata } from "next"

import PrivacyPolicyTemplate from "@modules/legal/templates/privacy-policy-template"

export const metadata: Metadata = {
  title: "Privacy Policy | XYZ London",
  description:
    "How XYZ London collects, uses, and protects your personal data when you use our website and services, including OOO.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyTemplate />
}
