import { Lock } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Container } from "@modules/common/components/xyz/Container"

export default function PrivateExpressionsComingSoon() {
  return (
    <section className="bg-deepBlack text-white min-h-[55vh]">
      <Container className="py-24 small:py-32 flex flex-col items-center text-center">
        <Lock
          className="w-12 h-12 mb-8 mx-auto stroke-1 text-neutral-500"
          aria-hidden
        />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
          Private Expressions
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
          Coming soon
        </h1>
        <p className="text-neutral-400 font-light max-w-md mb-10 leading-relaxed">
          You have access. We are preparing this space — check back for limited
          releases and member-only expression.
        </p>
        <LocalizedClientLink
          href="/"
          className="text-xs uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-0.5 hover:opacity-60 transition-opacity"
        >
          Back to home
        </LocalizedClientLink>
      </Container>
    </section>
  )
}
