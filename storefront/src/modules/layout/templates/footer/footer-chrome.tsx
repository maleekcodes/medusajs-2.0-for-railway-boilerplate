"use client"

import { usePathname } from "next/navigation"

import type { SiteFooterSanity } from "@/types/xyz"

import { isDigitalRoute } from "@lib/util/is-digital-route"
import { isOOORoute } from "@lib/util/is-ooo-route"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

/** Matches storefront defaults before Sanity was wired (used when CMS row missing). */
const DEFAULT_FOOTER = {
  brandSectionHeading: "Brand Philosophy",
  brandBodyLines: [
    "XYZ London exists to uncover identity through form.",
    "We believe in expression through movement, proportion, and restraint.",
    "Our garments are designed for longevity, not trends.",
    "Our digital expressions explore identity beyond physical constraints.",
  ],
  brandStoryLinkLabel: "Read Our Story",
  brandStoryLinkPath: "/about",
  productSectionHeading: "Product",
  productItems: [
    {
      label: "Highest Expression",
      internalPath: "/private-expressions",
    },
    {
      label: "Materials: Sustainable fabrics",
    },
    {
      label: "Care: Longevity focused",
    },
    {
      label: "Archive: 2024 - 2026",
    },
  ],
  legalSectionHeading: "Legal",
  legalLinks: [
    { label: "Terms of Service", path: "/content/terms-of-use" },
    { label: "Privacy Policy", path: "/content/privacy-policy" },
    { label: "Shipping Policy", path: "/content/shipping-policy" },
    {
      label: "Cookie Settings",
      path: "/content/privacy-policy#cookies",
    },
  ],
  connectSectionHeading: "Connect",
  connectLinks: [
    { label: "Contact", href: "/contact" },
    {
      label: "Instagram",
      href: "https://instagram.com",
    },
    { label: "Twitter / X", href: "https://x.com" },
    { label: "contact@wearxyz.co", href: "mailto:contact@wearxyz.co" },
  ],
  bottomTagline: "Physical / Digital",
  copyrightName: "XYZ London",
} satisfies SiteFooterSanity

function mergeFooter(site?: SiteFooterSanity | null): SiteFooterSanity {
  const d = DEFAULT_FOOTER
  const hasLines =
    site?.brandBodyLines?.some((l) => typeof l === "string" && l.trim().length > 0) ??
    false
  const lines = hasLines
    ? (site!.brandBodyLines ?? []).filter(
        (l): l is string => typeof l === "string" && l.trim().length > 0
      )
    : (d.brandBodyLines ?? [])

  const productItems =
    site?.productItems && site.productItems.length > 0
      ? site.productItems
      : (d.productItems ?? [])

  const legalLinks =
    site?.legalLinks && site.legalLinks.length > 0
      ? site.legalLinks
      : (d.legalLinks ?? [])

  const connectLinks =
    site?.connectLinks && site.connectLinks.length > 0
      ? site.connectLinks
      : (d.connectLinks ?? [])

  return {
    brandSectionHeading:
      site?.brandSectionHeading?.trim() ?? d.brandSectionHeading ?? undefined,
    brandBodyLines: lines,
    brandStoryLinkLabel:
      site?.brandStoryLinkLabel?.trim() ?? d.brandStoryLinkLabel ?? undefined,
    brandStoryLinkPath:
      site?.brandStoryLinkPath?.trim() ?? d.brandStoryLinkPath ?? undefined,
    productSectionHeading:
      site?.productSectionHeading?.trim() ??
      d.productSectionHeading ??
      undefined,
    productItems,
    legalSectionHeading:
      site?.legalSectionHeading?.trim() ?? d.legalSectionHeading ?? undefined,
    legalLinks,
    connectSectionHeading:
      site?.connectSectionHeading?.trim() ??
      d.connectSectionHeading ??
      undefined,
    connectLinks,
    bottomTagline: site?.bottomTagline?.trim() ?? d.bottomTagline ?? undefined,
    copyrightName: site?.copyrightName?.trim() ?? d.copyrightName ?? undefined,
  }
}

type Props = {
  siteFooter?: SiteFooterSanity | null
}

function ConnectRow({
  label,
  href,
  linkClass,
}: {
  label: string
  href: string
  linkClass: string
}) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  if (isExternal) {
    const isBlank = href.startsWith("http")
    return (
      <a
        href={href}
        className={linkClass}
        {...(isBlank
          ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
          : {})}
      >
        {label}
      </a>
    )
  }
  return (
    <LocalizedClientLink href={href} className={linkClass}>
      {label}
    </LocalizedClientLink>
  )
}

export default function FooterChrome({ siteFooter }: Props) {
  const pathname = usePathname()
  const digital = isDigitalRoute(pathname)
  const ooo = isOOORoute(pathname)

  const f = mergeFooter(siteFooter ?? null)

  const shell = ooo
    ? "bg-ooo-rise pt-24 pb-12 border-t border-white/[0.08] transition-colors duration-300"
    : digital
      ? "bg-deepBlack pt-24 pb-12 border-t border-neutral-800 transition-colors duration-300"
      : "bg-white pt-24 pb-12 border-t border-neutral-100 transition-colors duration-300"

  const heading = ooo ? "text-oooText" : digital ? "text-white" : "text-deepBlack"
  const body = ooo ? "text-oooText/85" : digital ? "text-neutral-400" : "text-neutral-500"
  const storyLink = ooo
    ? "text-sm font-medium text-oooText border-b border-oooBorder pb-0.5 hover:opacity-80 transition-opacity inline-block"
    : digital
      ? "text-sm font-medium text-white border-b border-white pb-0.5 hover:opacity-60 transition-opacity inline-block"
      : "text-sm font-medium text-deepBlack border-b border-deepBlack pb-0.5 hover:opacity-60 transition-opacity inline-block"
  const bottomBorder = ooo ? "border-oooBorder" : digital ? "border-neutral-800" : "border-neutral-100"
  const copyrightClass = ooo ? "text-oooText/65" : digital ? "text-neutral-500" : "text-neutral-400"
  const taglineClass = ooo ? "text-oooText/55" : digital ? "text-neutral-500" : "text-neutral-300"

  const linkClass = ooo
    ? "text-oooText/90 hover:opacity-80 transition-opacity"
    : "hover:opacity-70 transition-opacity"

  return (
    <footer className={shell}>
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12 mb-24">
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              {f.brandSectionHeading}
            </h4>
            <p className={`text-sm leading-relaxed ${body}`}>
              {f.brandBodyLines?.map((line, i) => (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
            {f.brandStoryLinkPath && f.brandStoryLinkLabel ? (
              <LocalizedClientLink href={f.brandStoryLinkPath} className={storyLink}>
                {f.brandStoryLinkLabel}
              </LocalizedClientLink>
            ) : null}
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              {f.productSectionHeading}
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              {f.productItems?.map((item, idx) => (
                <li key={item._key ?? `p-${idx}`}>
                  {item.internalPath?.trim() ? (
                    <LocalizedClientLink
                      href={item.internalPath.trim()}
                      className={`${linkClass} ${body}`}
                    >
                      {item.label}
                    </LocalizedClientLink>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              {f.legalSectionHeading}
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              {f.legalLinks?.map((item, idx) => (
                <li key={item._key ?? `l-${idx}`}>
                  {item.path?.trim() ? (
                    <LocalizedClientLink href={item.path.trim()} className={linkClass}>
                      {item.label}
                    </LocalizedClientLink>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
              {f.connectSectionHeading}
            </h4>
            <ul className={`space-y-2 text-sm ${body}`}>
              {f.connectLinks?.map((item, idx) =>
                item.href?.trim() && item.label?.trim() ? (
                  <li key={item._key ?? `c-${idx}`}>
                    <ConnectRow
                      label={item.label.trim()}
                      href={item.href.trim()}
                      linkClass={linkClass}
                    />
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-between border-t pt-8 md:flex-row ${bottomBorder}`}
        >
          <span
            className={`text-[10px] uppercase tracking-widest md:text-xs ${copyrightClass}`}
          >
            © {new Date().getFullYear()} {f.copyrightName}. All rights reserved.
          </span>
          <span
            className={`mt-2 text-[10px] uppercase tracking-widest md:mt-0 md:text-xs ${taglineClass}`}
          >
            {f.bottomTagline}
          </span>
        </div>
      </Container>
    </footer>
  )
}
