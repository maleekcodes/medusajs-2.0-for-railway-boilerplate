import type { Metadata } from "next"

import ContactTemplate from "@modules/contact/templates/contact-template"

export const metadata: Metadata = {
  title: "Contact | XYZ London",
  description:
    "Get in touch with XYZ London — orders, support, returns, and general enquiries.",
}

export default function ContactPage() {
  return <ContactTemplate />
}
