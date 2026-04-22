import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"
import { Logo } from "@modules/common/components/xyz/Logo"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full bg-white text-deepBlack">
      <header className="border-b border-neutral-200 bg-white">
        <Container>
          <nav
            className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
            aria-label="Checkout"
          >
            <LocalizedClientLink
              href="/cart"
              className="flex flex-1 basis-0 items-center gap-2 text-sm font-mono uppercase tracking-widest text-neutral-500 transition-colors hover:text-deepBlack"
              data-testid="back-to-cart-link"
            >
              <ChevronDown className="rotate-90 shrink-0" size={16} />
              <span className="mt-px hidden sm:inline">Back to cart</span>
              <span className="mt-px sm:hidden">Back</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/"
              className="flex items-center justify-center text-deepBlack"
              data-testid="store-link"
            >
              <Logo className="h-6 w-auto" aria-hidden />
              <span className="sr-only">Home</span>
            </LocalizedClientLink>
            <div className="flex-1 basis-0" />
          </nav>
        </Container>
      </header>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
    </div>
  )
}
