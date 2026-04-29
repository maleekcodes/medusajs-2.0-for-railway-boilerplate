import { getSiteFooter } from "@lib/sanity/queries"
import FooterChrome from "./footer-chrome"

export default async function Footer() {
  const { footer } = await getSiteFooter()
  return <FooterChrome siteFooter={footer} />
}
