import { ShoppingBag } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center md:py-32"
      data-testid="empty-cart-message"
    >
      <ShoppingBag
        className="mb-8 h-16 w-16 text-neutral-300"
        strokeWidth={1}
        aria-hidden
      />
      <h1 className="mb-4 text-4xl font-bold tracking-tighter text-deepBlack">
        Your cart is empty
      </h1>
      <p className="mb-8 max-w-md text-neutral-500">
        Explore our collections and find your next piece.
      </p>
      <LocalizedClientLink
        href="/store"
        className="inline-block bg-deepBlack px-8 py-3 text-sm font-mono uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
      >
        Shop products
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
