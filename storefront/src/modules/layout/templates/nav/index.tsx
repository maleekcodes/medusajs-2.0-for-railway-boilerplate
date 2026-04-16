import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

import NavChrome from "./nav-chrome"

export default async function Nav() {
  const regions = (await listRegions()) as HttpTypes.StoreRegion[] | null

  const cartDesktop = (
    <Suspense
      fallback={
        <LocalizedClientLink
          className="text-neutral-500 hover:text-deepBlack hover:opacity-70 transition-opacity flex gap-2"
          href="/cart"
          data-testid="nav-cart-link"
        >
          Cart (0)
        </LocalizedClientLink>
      }
    >
      <CartButton />
    </Suspense>
  )

  const cartMobile = (
    <Suspense
      fallback={
        <LocalizedClientLink
          className="hover:opacity-70 transition-opacity"
          href="/cart"
          data-testid="nav-cart-link"
        >
          Cart
        </LocalizedClientLink>
      }
    >
      <CartButton />
    </Suspense>
  )

  return (
    <NavChrome
      regions={regions ?? []}
      cartDesktop={cartDesktop}
      cartMobile={cartMobile}
    />
  )
}
