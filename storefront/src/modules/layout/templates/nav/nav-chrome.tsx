"use client"

import { type ReactNode } from "react"
import { usePathname } from "next/navigation"

import { HttpTypes } from "@medusajs/types"
import { isDigitalRoute } from "@lib/util/is-digital-route"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "@modules/layout/components/side-menu"
import { Logo } from "@modules/common/components/xyz/Logo"

type NavChromeProps = {
  regions: HttpTypes.StoreRegion[]
  cartDesktop: ReactNode
  cartMobile: ReactNode
}

export default function NavChrome({
  regions,
  cartDesktop,
  cartMobile,
}: NavChromeProps) {
  const pathname = usePathname()
  const digital = isDigitalRoute(pathname)

  const link =
    digital
      ? "text-neutral-400 hover:text-white hover:opacity-90 transition-opacity"
      : "text-neutral-500 hover:text-deepBlack hover:opacity-70 transition-opacity"

  const header = digital
    ? "bg-deepBlack text-white border-neutral-800 border-b"
    : "bg-white text-deepBlack border-neutral-100 border-b"

  const logoClass = digital ? "flex items-center text-white" : "flex items-center text-deepBlack"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${header}`}
    >
      <div className="grid grid-cols-3 items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <LocalizedClientLink href="/store" className={link}>
            Physical Form
          </LocalizedClientLink>
          <LocalizedClientLink href="/digital" className={link}>
            Digital Form
          </LocalizedClientLink>
        </nav>

        <div className="md:hidden h-full flex items-center">
          <SideMenu regions={regions} variant={digital ? "digital" : "light"} />
        </div>

        <div className="flex justify-center">
          <LocalizedClientLink
            href="/"
            className={logoClass}
            data-testid="nav-store-link"
          >
            <Logo className="h-6 w-auto fill-current" />
          </LocalizedClientLink>
        </div>

        <nav className="hidden md:flex justify-end items-center gap-8 text-sm font-medium tracking-wide">
          <LocalizedClientLink href="/about" className={link}>
            About
          </LocalizedClientLink>
          <LocalizedClientLink href="/journal" className={link}>
            Journal
          </LocalizedClientLink>
          <LocalizedClientLink href="/ar-fit" className={link}>
            AR Fit
          </LocalizedClientLink>
          {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
            <LocalizedClientLink
              href="/search"
              className={link}
              scroll={false}
              data-testid="nav-search-link"
            >
              Search
            </LocalizedClientLink>
          )}
          <LocalizedClientLink
            href="/account"
            className={link}
            data-testid="nav-account-link"
          >
            Account
          </LocalizedClientLink>
          {cartDesktop}
        </nav>

        <div className="md:hidden flex justify-end">{cartMobile}</div>
      </div>
    </header>
  )
}
