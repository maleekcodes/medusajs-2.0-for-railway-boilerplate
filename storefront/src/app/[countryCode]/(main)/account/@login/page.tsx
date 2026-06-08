import { Metadata } from "next"

import { buildUtilityPageMetadata } from "@lib/seo/utility"
import LoginTemplate from "@modules/account/templates/login-template"

export async function generateMetadata(): Promise<Metadata> {
  return buildUtilityPageMetadata(
    "Sign in | XYZ London",
    "Sign in to your XYZ London account."
  )
}

export default function Login() {
  return <LoginTemplate />
}
